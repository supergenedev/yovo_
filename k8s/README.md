# yovo EKS 배포 (mecha와 동일 패턴)

## 인프라 정보

- **ECR**: `414140062450.dkr.ecr.ap-northeast-1.amazonaws.com/yovo` (태그: `backend`, `web`)
- **EKS 클러스터**: `supergene-dev-eks` (ap-northeast-1, 노드 arm64)
- **네임스페이스**: `yovo-dev`
- **도메인**: `https://yovo-web-dev.al-pha.ai` (웹), `https://yovo-api-dev.al-pha.ai` (API)
- **DB**: 공유 dev RDS `supergene-dev-pg-instance-1` (aurora-postgresql)의 `yovo_dev` 데이터베이스
  - Rails 엔트리포인트가 기동 시 `db:prepare`로 자동 생성·마이그레이션
- **Secrets Manager**: `yovo/dev` (ap-northeast-1) → K8s secret `yovo-env`
- **업로드 미디어**: PVC `yovo-storage-pvc` (ebs-gp3 5Gi) → `/rails/storage`
- **K8s 매니페스트**: `k8s/deployment.yaml`

## 배포 워크플로우

전체 배포는 `./deploy-eks.sh` 하나로 끝난다. 개별 단계:

### 백엔드만 수정했을 때

```bash
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin 414140062450.dkr.ecr.ap-northeast-1.amazonaws.com
docker build --platform linux/arm64 -t 414140062450.dkr.ecr.ap-northeast-1.amazonaws.com/yovo:backend ./backend
docker push 414140062450.dkr.ecr.ap-northeast-1.amazonaws.com/yovo:backend
kubectl rollout restart deployment/yovo-backend -n yovo-dev
kubectl rollout status deployment/yovo-backend -n yovo-dev
curl -s https://yovo-api-dev.al-pha.ai/up
```

### 웹만 수정했을 때

```bash
# VITE_API_BASE_URL은 빌드 타임에 번들로 들어간다
docker build --platform linux/arm64 \
  --build-arg VITE_API_BASE_URL=https://yovo-api-dev.al-pha.ai \
  -t 414140062450.dkr.ecr.ap-northeast-1.amazonaws.com/yovo:web ./frontend
docker push 414140062450.dkr.ecr.ap-northeast-1.amazonaws.com/yovo:web
kubectl rollout restart deployment/yovo-web -n yovo-dev
curl -s -o /dev/null -w "%{http_code}" https://yovo-web-dev.al-pha.ai
```

### 환경변수 수정 시

```bash
# 1. Secrets Manager 업데이트
aws secretsmanager update-secret --secret-id yovo/dev --region ap-northeast-1 \
  --secret-string '{"RAILS_MASTER_KEY":"...","SECRET_KEY_BASE":"...","DATABASE_URL":"...","APP_HOST":"yovo-web-dev.al-pha.ai","CORS_ORIGINS":"https://yovo-web-dev.al-pha.ai","FORCE_SSL":"true","RAILS_LOG_LEVEL":"info"}'

# 2. K8s Secret 재생성
aws secretsmanager get-secret-value --secret-id yovo/dev --region ap-northeast-1 --query SecretString --output text \
  | python3 -c "import sys,json; [print(f'{k}={v}') for k,v in json.load(sys.stdin).items()]" > /tmp/yovo.env
kubectl delete secret yovo-env -n yovo-dev
kubectl create secret generic yovo-env -n yovo-dev --from-env-file=/tmp/yovo.env
rm /tmp/yovo.env

# 3. Pod 재시작
kubectl rollout restart deployment/yovo-backend deployment/yovo-web -n yovo-dev
```

### K8s 매니페스트 수정 시

```bash
kubectl apply -f k8s/deployment.yaml
```

### 시드 데이터 (최초 1회)

```bash
kubectl exec -n yovo-dev deploy/yovo-backend -- bin/rails db:seed
```

## 구조 메모

- 웹은 빌드 타임 `VITE_API_BASE_URL`로 API 도메인을 직접 호출한다 (mecha 패턴).
  백엔드 `CORS_ORIGINS`가 웹 도메인을 허용해야 한다.
- 단, 미디어(ActiveStorage) URL은 상대 경로(`/rails/...`)라서 웹 도메인으로 요청되고,
  웹 nginx가 `/api`·`/rails`·`/up`을 `backend` 서비스로 프록시한다.
  **K8s Service 이름이 `backend`인 이유** — nginx.conf의 `proxy_pass http://backend:80`이
  docker-compose 서비스명과 K8s 서비스 DNS에 동일하게 매칭되도록.
- backend Deployment는 RWO PVC 때문에 `strategy: Recreate` (롤링 업데이트 시 볼륨 교착 방지).
- TLS는 ALB에서 종료(ACM *.al-pha.ai 인증서), Rails는 `FORCE_SSL=true`로 assume_ssl.

## DNS

Route53 `al-pha.ai` 존에 CNAME 2개 필요 (계정에 route53 권한 있는 사람이 추가):

```
yovo-api-dev.al-pha.ai → <ingress ALB 주소>
yovo-web-dev.al-pha.ai → <ingress ALB 주소>
```

ALB 주소 확인: `kubectl get ingress -n yovo-dev`

## 트러블슈팅

```bash
kubectl get pods -n yovo-dev
kubectl logs -n yovo-dev deployment/yovo-backend --tail 50
kubectl logs -n yovo-dev deployment/yovo-web --tail 50
kubectl describe pod -n yovo-dev <pod-name>
kubectl rollout undo deployment/yovo-backend -n yovo-dev   # 롤백
```
