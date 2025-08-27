#!/bin/bash

# AWS S3 배포 스크립트
echo "🚀 React 앱을 AWS S3에 배포합니다..."

# 환경 변수 설정 (실제 값으로 변경하세요)
BUCKET_NAME="your-bucket-name"
DISTRIBUTION_ID="your-cloudfront-distribution-id"
REGION="ap-northeast-2"

# 1. 프로덕션 빌드
echo "📦 프로덕션 빌드 중..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 빌드 실패! 배포를 중단합니다."
    exit 1
fi

# 2. S3에 업로드
echo "☁️ S3에 업로드 중..."
aws s3 sync build/ s3://$BUCKET_NAME --delete --region $REGION

if [ $? -ne 0 ]; then
    echo "❌ S3 업로드 실패!"
    exit 1
fi

# 3. CloudFront 캐시 무효화 (배포된 경우)
if [ "$DISTRIBUTION_ID" != "your-cloudfront-distribution-id" ]; then
    echo "🔄 CloudFront 캐시 무효화 중..."
    aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*" --region $REGION
else
    echo "⚠️ CloudFront Distribution ID가 설정되지 않았습니다. 캐시 무효화를 건너뜁니다."
fi

echo "✅ 배포 완료!"
echo "🌐 웹사이트: https://$BUCKET_NAME.s3.$REGION.amazonaws.com"
echo "💡 CloudFront를 사용하는 경우: https://your-domain.com"
