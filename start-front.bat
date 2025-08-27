@echo off
chcp 65001 >nul
echo 🚀 Front Service 시작 중...

echo 📦 Docker 이미지 빌드 중...
docker build -t front-service .

echo 🧹 기존 컨테이너 정리 중...
docker stop front-container 2>nul
docker rm front-container 2>nul

echo 🐳 Front Service 컨테이너 실행 중...
docker run -d -p 3000:3000 --name front-container --restart unless-stopped front-service

echo ✅ Front Service 실행 완료!
echo 🌐 접속 URL: http://localhost:3000
echo.
echo 📊 컨테이너 상태 확인:
docker ps | findstr front-container
echo.
echo 📝 로그 확인: docker logs front-container
echo 🛑 중지: docker stop front-container
echo 🗑️  제거: docker rm front-container
pause
