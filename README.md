# 🚀 **JSX + Post - 커뮤니티 게시판 프로젝트**

React와 JSX를 사용하여 개발된 현대적인 커뮤니티 게시판 애플리케이션입니다. AWS Cognito를 통한 안전한 사용자 인증과 Docker 기반의 백엔드 서비스를 연동하여 완성도 높은 웹 애플리케이션을 제공합니다.

## ✨ **주요 기능**

### 🔐 **사용자 인증**
- **AWS Cognito 연동**: 안전한 로그인/로그아웃
- **자동 토큰 관리**: JWT 토큰 자동 저장 및 복원
- **로그인 상태 유지**: 페이지 새로고침 시에도 로그인 상태 유지

### 📝 **게시글 관리**
- **게시글 작성/수정/삭제**: 마크다운 지원
- **카테고리별 분류**: 동물/반려동물, 여행, 건강/헬스, 연예인
- **실시간 검색**: 제목 및 내용 기반 검색
- **정렬 기능**: 최신순, 인기순 정렬

### 🎨 **사용자 인터페이스**
- **반응형 테이블 레이아웃**: 깔끔하고 직관적인 게시글 목록
- **모던한 디자인**: 카드 기반에서 테이블 기반으로 개선
- **일관된 네비게이션**: 모든 페이지에서 동일한 헤더와 사이드바

### 👤 **마이페이지**
- **사용자 프로필**: Cognito에서 가져온 사용자 정보 표시
- **내가 작성한 글**: 사용자별 게시글 관리
- **게시글 편집/삭제**: 본인이 작성한 글만 수정 가능

## 🏗️ **프로젝트 구조**

```
Front-jsx/
├── src/
│   ├── components/           # React 컴포넌트
│   │   ├── CommonLayout.js   # 공통 레이아웃 (헤더, 사이드바)
│   │   ├── MainBoardPage.js  # 메인 게시판 페이지
│   │   ├── PostDetail.js     # 게시글 상세 페이지
│   │   ├── WritePostPage.js  # 게시글 작성 페이지
│   │   ├── MyPage.js         # 마이페이지
│   │   ├── LoginPage.js      # 로그인 페이지
│   │   └── SignupPage.js     # 회원가입 페이지
│   ├── services/             # API 서비스
│   │   └── AuthService.js    # 인증 관련 서비스
│   ├── App.js                # 메인 App 컴포넌트
│   ├── index.js              # React 앱 진입점
│   └── index.css             # 전역 스타일
├── public/                   # 정적 파일
├── Dockerfile                # Docker 컨테이너 설정
├── package.json              # 프로젝트 의존성
└── README.md                 # 프로젝트 설명서
```

## 🚀 **기술 스택**

### **프론트엔드**
- **React 18**: 클래스 컴포넌트 기반
- **JSX**: JavaScript XML 문법
- **CSS-in-JS**: 컴포넌트별 스타일링
- **Lucide React**: 아이콘 라이브러리

### **백엔드 연동**
- **Docker Compose**: 멀티 컨테이너 애플리케이션
- **RESTful API**: HTTP 기반 통신
- **JWT 토큰**: 인증 및 권한 관리

### **인프라**
- **AWS Cognito**: 사용자 인증 및 관리
- **Docker**: 컨테이너화된 배포
- **GitHub**: 버전 관리 및 배포

## 🛠️ **로컬 개발 환경 설정**

### **1. 프로젝트 클론**
```bash
git clone https://github.com/ksjj3765/Front.git
cd Front
```

### **2. 의존성 설치**
```bash
npm install
```

### **3. 환경 변수 설정**
`.env` 파일을 생성하고 다음 내용을 추가:

```env
# AWS Cognito 설정
REACT_APP_COGNITO_USER_POOL_ID=your_user_pool_id
REACT_APP_COGNITO_CLIENT_ID=your_client_id
REACT_APP_COGNITO_REGION=ap-northeast-2

# 백엔드 API 설정
REACT_APP_API_BASE_URL=http://localhost:5000
```

### **4. Docker 백엔드 실행**
```bash
docker-compose up -d
```

### **5. 개발 서버 실행**
```bash
npm start
```

## 🐳 **Docker 환경**

### **서비스 구성**
- **Frontend**: React 개발 서버 (포트: 3000)
- **Post Service**: 게시글 관리 API (포트: 5000)
- **Database**: PostgreSQL 데이터베이스

### **Docker 명령어**
```bash
# 모든 서비스 시작
docker-compose up -d

# 특정 서비스만 재시작
docker-compose restart frontend
docker-compose restart post-service

# 서비스 상태 확인
docker-compose ps

# 로그 확인
docker-compose logs frontend
docker-compose logs post-service
```

## 📱 **주요 페이지 설명**

### **메인 게시판 (`/`)**
- 게시글 목록을 테이블 형태로 표시
- 카테고리별 필터링 및 검색 기능
- 최신순/인기순 정렬 지원

### **게시글 상세 (`/post/:id`)**
- 게시글 내용 및 메타데이터 표시
- 조회수, 좋아요, 댓글 수 표시
- 카테고리 클릭 시 메인 페이지로 이동

### **게시글 작성 (`/write`)**
- 제목, 카테고리, 내용 입력
- 실시간 글자 수 카운터
- 뒤로가기 버튼으로 이전 페이지 이동

### **마이페이지 (`/mypage`)**
- 사용자 프로필 정보 표시
- 본인이 작성한 게시글 목록
- 게시글 편집/삭제 기능

## 🔧 **개발 가이드**

### **새로운 컴포넌트 추가**
1. `src/components/` 폴더에 새 컴포넌트 파일 생성
2. `CommonLayout`을 사용하여 일관된 레이아웃 적용
3. 필요한 props 전달 및 이벤트 핸들러 구현

### **API 연동**
1. `src/services/` 폴더에 서비스 파일 생성
2. `fetch` API를 사용하여 백엔드와 통신
3. JWT 토큰을 Authorization 헤더에 포함

### **스타일링**
1. 컴포넌트 내부에 `<style jsx>` 블록 사용
2. CSS Grid와 Flexbox를 활용한 반응형 레이아웃
3. 일관된 색상 및 간격 시스템 적용

## 🚨 **문제 해결**

### **로그인 상태가 유지되지 않는 경우**
```bash
# 브라우저 개발자 도구 → Application → Local Storage 확인
# currentUser와 cognitoTokens 키가 있는지 확인
```

### **게시글이 로드되지 않는 경우**
```bash
# 백엔드 서비스 상태 확인
docker-compose ps
docker-compose logs post-service

# API 엔드포인트 테스트
curl http://localhost:5000/api/v1/posts
```

### **빌드 오류가 발생하는 경우**
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install

# Docker 컨테이너 재시작
docker-compose restart frontend
```

## 📊 **성능 최적화**

### **이미 구현된 최적화**
- **IP 기반 조회수 중복 방지**: 2분 내 동일 IP 접근 시 조회수 증가 방지
- **컴포넌트 지연 로딩**: 필요한 시점에만 컴포넌트 렌더링
- **효율적인 상태 관리**: 불필요한 리렌더링 방지

### **추가 최적화 방안**
- **이미지 압축**: WebP 포맷 사용
- **코드 스플리팅**: React.lazy와 Suspense 활용
- **캐싱 전략**: Service Worker를 통한 오프라인 지원

## 🔒 **보안 고려사항**

- **JWT 토큰 관리**: localStorage에 안전하게 저장
- **XSS 방지**: 사용자 입력 데이터 검증
- **CSRF 보호**: 토큰 기반 인증
- **HTTPS 강제**: 프로덕션 환경에서 SSL/TLS 적용

## 🚀 **배포 방법**

### **GitHub Pages (무료)**
```bash
npm run build
git add build
git commit -m "Build for production"
git push origin main
```

### **AWS S3 + CloudFront**
```bash
npm run build
aws s3 sync build/ s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

### **Vercel (권장)**
```bash
npm install -g vercel
vercel --prod
```

## 🤝 **기여하기**

1. 이 저장소를 Fork
2. 기능 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시 (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

## 📄 **라이선스**

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 **문의 및 지원**

- **이슈 리포트**: GitHub Issues 사용
- **기능 요청**: Feature Request 라벨로 이슈 생성
- **버그 리포트**: Bug Report 라벨로 이슈 생성

---

**⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요! ⭐**
