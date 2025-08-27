# Front Service - React 게시판 애플리케이션

프론트엔드 전용 서비스로, React 기반의 게시판 애플리케이션입니다.

## 🚀 **빠른 시작**

### **Docker로 실행 (권장)**

```bash
# 이미지 빌드
docker build -t front-service .

# 컨테이너 실행
docker run -d -p 3000:3000 --name front-container front-service

# 또는 docker-compose 사용
docker-compose up -d
```

### **로컬 개발 환경**

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

## 🏗️ **프로젝트 구조**

```
Front/
├── src/                    # React 소스 코드
│   ├── components/         # React 컴포넌트
│   ├── services/           # API 서비스
│   ├── App.js             # 메인 App 컴포넌트
│   └── index.js           # 진입점
├── public/                 # 정적 파일
├── Dockerfile             # Docker 설정
├── docker-compose.yml     # Docker Compose 설정
├── package.json           # 프로젝트 의존성
└── README.md              # 프로젝트 설명서
```

## 🛠️ **기술 스택**

- **React 18**: 클래스 컴포넌트 기반
- **JSX**: JavaScript XML 문법
- **CSS-in-JS**: 컴포넌트별 스타일링
- **Docker**: 컨테이너화된 배포

## 🔧 **환경 설정**

### **환경 변수**

`.env` 파일을 생성하고 다음 내용을 추가:

```env
# 백엔드 API 설정 (필요시)
REACT_APP_API_BASE_URL=http://localhost:5000

# AWS Cognito 설정 (필요시)
REACT_APP_COGNITO_USER_POOL_ID=your_user_pool_id
REACT_APP_COGNITO_CLIENT_ID=your_client_id
REACT_APP_COGNITO_REGION=ap-northeast-2
```

## 🐳 **Docker 환경**

### **단일 컨테이너 실행**

```bash
docker build -t front-service .
docker run -d -p 3000:3000 --name front-container front-service
```

### **Docker Compose 실행**

```bash
docker-compose up -d
```

### **컨테이너 관리**

```bash
# 상태 확인
docker ps

# 로그 확인
docker logs front-container

# 컨테이너 중지
docker stop front-container

# 컨테이너 제거
docker rm front-container
```

## 📱 **주요 기능**

- **게시글 목록**: 테이블 형태로 게시글 표시
- **게시글 상세**: 게시글 내용 및 메타데이터 표시
- **게시글 작성**: 제목, 카테고리, 내용 입력
- **사용자 인증**: 로그인/회원가입 기능
- **마이페이지**: 사용자별 게시글 관리

## 🔗 **API 연동**

백엔드 서비스와 연동하려면 환경 변수에 API URL을 설정하세요:

```env
REACT_APP_API_BASE_URL=http://your-backend-url:5000
```

## 🚨 **문제 해결**

### **포트 충돌 시**

```bash
# 다른 포트로 실행
docker run -d -p 3001:3000 --name front-container front-service
```

### **빌드 오류 시**

```bash
# Docker 이미지 재빌드
docker build --no-cache -t front-service .
```

## 📄 **라이선스**

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

**⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요! ⭐**
