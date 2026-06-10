#!/bin/bash
# yovo EKS 배포 스크립트 (mecha 패턴) — 자세한 내용은 k8s/README.md
set -euo pipefail

ECR=414140062450.dkr.ecr.ap-northeast-1.amazonaws.com/yovo
REGION=ap-northeast-1
NS=yovo-dev
API_URL=https://yovo-api-dev.al-pha.ai
TARGET=${1:-all} # backend | web | all

cd "$(dirname "$0")"

echo "=== ECR 로그인 ==="
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin ${ECR%%/*}

if [[ "$TARGET" == "backend" || "$TARGET" == "all" ]]; then
  echo "=== backend 빌드/푸시 ==="
  docker build --platform linux/arm64 -t $ECR:backend ./backend
  docker push $ECR:backend
fi

if [[ "$TARGET" == "web" || "$TARGET" == "all" ]]; then
  echo "=== web 빌드/푸시 ==="
  docker build --platform linux/arm64 \
    --build-arg VITE_API_BASE_URL=$API_URL \
    -t $ECR:web ./frontend
  docker push $ECR:web
fi

echo "=== 매니페스트 적용 + 재시작 ==="
kubectl apply -f k8s/deployment.yaml
[[ "$TARGET" == "backend" || "$TARGET" == "all" ]] && kubectl rollout restart deployment/yovo-backend -n $NS
[[ "$TARGET" == "web" || "$TARGET" == "all" ]] && kubectl rollout restart deployment/yovo-web -n $NS

echo "=== 롤아웃 대기 ==="
[[ "$TARGET" == "backend" || "$TARGET" == "all" ]] && kubectl rollout status deployment/yovo-backend -n $NS --timeout=300s
[[ "$TARGET" == "web" || "$TARGET" == "all" ]] && kubectl rollout status deployment/yovo-web -n $NS --timeout=180s

kubectl get pods -n $NS
echo "✅ 배포 완료"
echo "   API:  $API_URL/up"
echo "   WEB:  https://yovo-web-dev.al-pha.ai"
