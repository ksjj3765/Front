#!/bin/bash

# Front Service 실행 스크립트
echo "🚀 Front Service 시작 중..."

# Docker 이미지 빌드
echo "📦 Docker 이미지 빌드 중..."
docker build -t front-service .

# 기존 컨테이너가 있다면 제거
echo "🧹 기존 컨테이너 정리 중..."
docker stop front-container 2>/dev/null || true
docker rm front-container 2>/dev/null || true

# 새 컨테이너 실행
echo "🐳 Front Service 컨테이너 실행 중..."
docker run -d -p 3000:3000 \
  --name front-container \
  --restart unless-stopped \
  front-service

# 실행 상태 확인
echo "✅ Front Service 실행 완료!"
echo "🌐 접속 URL: http://localhost:3000"
echo ""
echo "📊 컨테이너 상태 확인:"
docker ps | grep front-container
echo ""
echo "📝 로그 확인: docker logs front-container"
echo "🛑 중지: docker stop front-container"
echo "🗑️  제거: docker rm front-container"
