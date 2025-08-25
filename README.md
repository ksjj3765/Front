# React 커뮤니티 앱 (AWS 배포 최적화)

React와 클래스 컴포넌트를 사용하여 개발된 커뮤니티 앱입니다. AWS Cognito를 통한 안전한 사용자 인증과 AWS 클라우드 배포에 최적화되어 있습니다.

## 🏗️ **프로젝트 구조**

```
├── src/
│   ├── aws-config.js           # AWS Cognito 설정
│   ├── services/
│   │   └── AuthService.js      # 인증 서비스
│   └── components/             # React 컴포넌트
│       ├── ProfilePopup.js     # 프로필 팝업
│       ├── MainBoardPage.js    # 메인 보드 페이지
│       └── LoginPage.js        # 로그인 페이지
├── public/                     # 정적 파일
│   └── index.html             # HTML 템플릿
├── App.js                     # 메인 App 컴포넌트
├── index.js                   # React 앱 진입점
├── package.json               # 프로젝트 설정
├── amplify.yml                # AWS Amplify 빌드 설정
├── deploy-s3.sh               # Linux/Mac S3 배포 스크립트
├── deploy-s3.bat              # Windows S3 배포 스크립트
└── README.md                  # 프로젝트 설명서
```

## 🚀 **AWS 배포 아키텍처**

```
사용자 → Route 53 → CloudFront → S3 (프론트엔드)
                ↓
            API Gateway → EKS (백엔드 마이크로서비스)
                ↓
            Aurora + RDS Proxy (데이터베이스)
```

## ✨ **주요 특징**

- **AWS Cognito 인증**: 안전한 사용자 인증 및 토큰 관리
- **클래스 기반 컴포넌트**: 모든 컴포넌트가 클래스로 구현
- **자동 토큰 관리**: 로그인/로그아웃 시 자동 토큰 처리
- **토큰 새로고침**: 만료된 토큰 자동 갱신
- **AWS 배포 최적화**: S3, CloudFront, Amplify 지원

## 🛠️ **로컬 개발**

1. **의존성 설치:**
```bash
npm install
```

2. **환경 변수 설정:**
`.env` 파일을 생성하고 다음 내용을 추가:
```env
REACT_APP_COGNITO_USER_POOL_ID=your_user_pool_id
REACT_APP_COGNITO_CLIENT_ID=your_client_id
REACT_APP_COGNITO_REGION=ap-northeast-2
```

3. **개발 서버 실행:**
```bash
npm start
```

## ☁️ **AWS 배포 방법**

### 방법 1: AWS Amplify (가장 간단) ⭐

1. **GitHub에 코드 푸시**
2. **AWS Amplify 콘솔에서 새 앱 생성**
3. **GitHub 저장소 연결**
4. **자동 배포 완료**

```bash
npm run deploy:amplify
```

### 방법 2: S3 + CloudFront (고성능)

1. **S3 버킷 생성 및 정적 웹사이트 호스팅 설정**
2. **CloudFront 배포 생성**
3. **프로덕션 빌드 및 배포:**

#### Linux/Mac:
```bash
chmod +x deploy-s3.sh
./deploy-s3.sh
```

#### Windows:
```cmd
deploy-s3.bat
```

#### 수동 배포:
```bash
npm run build
aws s3 sync build/ s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### 방법 3: AWS CLI 직접 사용

```bash
# 빌드
npm run build

# S3 업로드
aws s3 sync build/ s3://your-bucket-name --delete

# CloudFront 캐시 무효화
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## 🔧 **AWS 서비스 설정**

### 1. S3 버킷 설정
- 버킷 생성 시 "정적 웹사이트 호스팅" 활성화
- 버킷 정책 설정 (공개 읽기 권한)
- CORS 설정 (필요시)

### 2. CloudFront 설정
- Origin: S3 버킷 선택
- Viewer Protocol Policy: Redirect HTTP to HTTPS
- Default Root Object: index.html
- Error Pages: 403, 404 → /index.html (SPA 지원)

### 3. Cognito User Pool 설정
- User Pool 생성
- App Client 생성
- 도메인 설정
- 사용자 속성 및 정책 설정

## 📋 **배포 체크리스트**

### 사전 준비
- [ ] AWS CLI 설치 및 설정
- [ ] IAM 사용자 권한 확인 (S3, CloudFront, Cognito)
- [ ] Cognito User Pool 및 App Client 생성
- [ ] S3 버킷 생성 및 정적 웹사이트 호스팅 설정

### 배포 과정
- [ ] 환경 변수 설정 (.env 파일)
- [ ] 로컬에서 빌드 테스트
- [ ] S3에 파일 업로드
- [ ] CloudFront 배포 설정
- [ ] 도메인 연결 (선택사항)

### 배포 후 확인
- [ ] 웹사이트 접속 테스트
- [ ] Cognito 로그인/로그아웃 테스트
- [ ] HTTPS 연결 확인
- [ ] 성능 테스트 (PageSpeed Insights)

## 🚨 **문제 해결**

### 빌드 오류
```bash
# 캐시 클리어
rm -rf node_modules package-lock.json
npm install
```

### S3 업로드 오류
```bash
# AWS CLI 설정 확인
aws configure list
aws sts get-caller-identity
```

### CloudFront 캐시 문제
```bash
# 강제 캐시 무효화
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

## 💰 **비용 최적화**

- **S3**: 월 사용량 기반 과금
- **CloudFront**: 데이터 전송량 기반 과금
- **Cognito**: 사용자당 월 과금
- **Route 53**: 호스팅 영역당 월 과금

## 🔒 **보안 고려사항**

- HTTPS 강제 적용
- CORS 정책 설정
- Cognito 사용자 풀 보안 정책
- S3 버킷 정책 최소 권한 원칙

## 📚 **참고 자료**

- [AWS S3 정적 웹사이트 호스팅](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [AWS CloudFront 배포](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.html)
- [AWS Cognito 사용자 풀](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html)
- [React 앱 배포 가이드](https://create-react-app.dev/docs/deployment/)

## 🤝 **기여하기**

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 **라이선스**

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.
