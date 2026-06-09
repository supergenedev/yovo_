#!/bin/bash
set -e

echo "=== [1/4] Docker 설치 ==="
sudo apt-get update -y
sudo apt-get install -y docker.io docker-compose-plugin curl git
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER

echo "=== [2/4] 환경 변수 설정 ==="
if [ ! -f .env ]; then
  cp .env.example .env
  echo ""
  echo "⚠️  .env 파일을 편집하고 다시 실행하세요:"
  echo "    nano .env"
  exit 1
fi

echo "=== [3/4] 이미지 빌드 ==="
docker compose build --no-cache

echo "=== [4/4] 서비스 시작 ==="
docker compose up -d

echo ""
echo "✅ 배포 완료!"
echo "   로그 확인: docker compose logs -f"
echo "   상태 확인: docker compose ps"
