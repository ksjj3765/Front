# 🚀 **Post Service - 게시글 관리 백엔드 API**

MSA(Microservice Architecture) 환경에서 게시글 관리만을 담당하는 독립적인 백엔드 서비스입니다. Flask 기반으로 구축되어 있으며, AWS Cognito와 연동하여 안전한 사용자 인증을 제공합니다.

## ✨ **주요 기능**

### 📝 **게시글 관리**
- **CRUD 작업**: 게시글 생성, 조회, 수정, 삭제
- **카테고리 시스템**: 동물/반려동물, 여행, 건강/헬스, 연예인
- **태그 시스템**: 게시글 태그 관리
- **검색 및 필터링**: 제목, 내용, 카테고리별 검색
- **페이지네이션**: 대량 데이터 효율적 처리

### 🔐 **사용자 인증**
- **AWS Cognito 연동**: 안전한 사용자 인증 및 관리
- **JWT 토큰**: 보안성 높은 인증 방식
- **사용자 등록/로그인**: 독립적인 사용자 관리 시스템

### ❤️ **상호작용 기능**
- **좋아요 시스템**: 게시글 좋아요/취소
- **조회수 관리**: IP 기반 중복 조회 방지 (2분 간격)
- **댓글 시스템**: 게시글별 댓글 관리

### 🐳 **Docker 지원**
- **컨테이너화**: Docker 기반 배포 및 실행
- **Docker Compose**: 프론트엔드와 연동된 멀티 컨테이너 환경

## 🏗️ **아키텍처**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Frontend       │    │  Post Service   │    │   PostgreSQL    │
│  (React)        │◄──►│  (Flask)        │◄──►│   Database      │
│  Port: 3000     │    │  Port: 5000     │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   AWS Cognito   │
                       │   (인증 서비스)  │
                       └─────────────────┘
```

## 🛠️ **기술 스택**

### **Backend Framework**
- **Flask 3.1.1**: 가벼우면서도 강력한 Python 웹 프레임워크
- **SQLAlchemy**: ORM을 통한 데이터베이스 관리
- **PostgreSQL**: 안정적인 관계형 데이터베이스

### **인증 및 보안**
- **AWS Cognito**: 사용자 인증 및 관리
- **JWT (JSON Web Token)**: 보안 토큰 관리
- **Boto3**: AWS 서비스 연동

### **개발 도구**
- **Docker**: 컨테이너화된 배포
- **Docker Compose**: 멀티 서비스 환경 관리
- **Git**: 버전 관리

## 📦 **설치 및 실행**

### **1. 프로젝트 클론**
```bash
git clone <repository-url>
cd post-service
```

### **2. 의존성 설치**
```bash
pip install -r requirements.txt
```

### **3. 환경 변수 설정**
`.env` 파일을 생성하고 다음 내용을 추가:

```env
# AWS Cognito 설정
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_DEFAULT_REGION=ap-northeast-2

# 데이터베이스 설정
DATABASE_URL=postgresql://username:password@localhost:5432/postdb

# 서비스 설정
USER_SERVICE_URL=http://localhost:8081
NOTIFICATION_SERVICE_URL=http://localhost:8082
ENVIRONMENT=development

# Flask 설정
SECRET_KEY=your-secret-key
FLASK_ENV=development
```

### **4. Docker로 실행 (권장)**
```bash
# 전체 서비스 실행 (프론트엔드 포함)
cd ..  # 루트 디렉토리로 이동
docker-compose up -d

# Post Service만 실행
docker-compose up post-service -d
```

### **5. 로컬 실행**
```bash
# 데이터베이스 마이그레이션
flask db init
flask db migrate
flask db upgrade

# 서버 실행
python app.py
```

서버가 `http://localhost:5000`에서 실행됩니다.

## 📚 **API 문서**

### **게시글 API**

| Method | Endpoint | Description | 인증 필요 |
|--------|----------|-------------|-----------|
| GET | `/api/v1/posts` | 게시글 목록 조회 | ❌ |
| GET | `/api/v1/posts/{id}` | 게시글 상세 조회 | ❌ |
| POST | `/api/v1/posts` | 게시글 생성 | ✅ |
| PUT/PATCH | `/api/v1/posts/{id}` | 게시글 수정 | ✅ |
| DELETE | `/api/v1/posts/{id}` | 게시글 삭제 | ✅ |

### **카테고리 API**

| Method | Endpoint | Description | 인증 필요 |
|--------|----------|-------------|-----------|
| GET | `/api/v1/categories` | 카테고리 목록 조회 | ❌ |
| POST | `/api/v1/categories` | 카테고리 생성 | ✅ |

### **태그 API**

| Method | Endpoint | Description | 인증 필요 |
|--------|----------|-------------|-----------|
| GET | `/api/v1/tags` | 태그 목록 조회 | ❌ |
| POST | `/api/v1/tags` | 태그 생성 | ✅ |

### **사용자 API**

| Method | Endpoint | Description | 인증 필요 |
|--------|----------|-------------|-----------|
| POST | `/api/v1/users/register` | 사용자 등록 | ❌ |
| POST | `/api/v1/users/login` | 사용자 로그인 | ❌ |
| GET | `/api/v1/users/{id}` | 사용자 정보 조회 | ❌ |
| PUT | `/api/v1/users/{id}` | 사용자 정보 수정 | ✅ |

### **좋아요 API**

| Method | Endpoint | Description | 인증 필요 |
|--------|----------|-------------|-----------|
| POST | `/api/v1/posts/{id}/like` | 게시글 좋아요/취소 | ✅ |
| GET | `/api/v1/posts/{id}/like/status` | 좋아요 상태 확인 | ❌ |

## 🔧 **API 사용 예시**

### **게시글 생성**
```bash
curl -X POST http://localhost:5000/api/v1/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt_token>" \
  -d '{
    "title": "새로운 게시글",
    "content": "게시글 내용입니다.",
    "category": "여행",
    "tags": ["여행", "휴가"]
  }'
```

### **게시글 목록 조회**
```bash
curl http://localhost:5000/api/v1/posts?category=여행&page=1&per_page=10
```

### **게시글 상세 조회**
```bash
curl http://localhost:5000/api/v1/posts/1
```

### **게시글 좋아요**
```bash
curl -X POST http://localhost:5000/api/v1/posts/1/like \
  -H "Authorization: Bearer <jwt_token>"
```

## 📁 **프로젝트 구조**

```
post-service/
├── app.py                 # 메인 Flask 애플리케이션
├── config.py             # 설정 파일
├── requirements.txt      # Python 의존성
├── Dockerfile           # Docker 컨테이너 설정
├── docker-compose.yml   # Docker Compose 설정
├── post/                # Post 서비스 모듈
│   ├── __init__.py
│   ├── models.py        # 데이터베이스 모델 (Post, User, Category, Tag, Like)
│   ├── routes.py        # API 라우트 정의
│   ├── services.py      # 비즈니스 로직
│   └── validators.py    # 데이터 검증
├── migrations/          # 데이터베이스 마이그레이션
├── static/              # 정적 파일
├── templates/           # HTML 템플릿
├── uploads/             # 업로드된 파일
├── init.sql/            # 초기 데이터베이스 스크립트
└── README.md            # 프로젝트 문서
```

## 🐳 **Docker 환경**

### **서비스 구성**
- **Post Service**: Flask API 서버 (포트: 5000)
- **PostgreSQL**: 데이터베이스 (포트: 5432)
- **Frontend**: React 개발 서버 (포트: 3000)

### **Docker 명령어**
```bash
# 모든 서비스 시작
docker-compose up -d

# 특정 서비스만 재시작
docker-compose restart post-service

# 서비스 상태 확인
docker-compose ps

# 로그 확인
docker-compose logs post-service

# 서비스 중지
docker-compose down
```

### **환경별 설정**
- **Development**: 로컬 개발 환경
- **Production**: 프로덕션 배포 환경
- **Docker**: 컨테이너화된 환경

## 🔒 **보안 기능**

### **인증 및 권한**
- **AWS Cognito**: 사용자 인증 및 관리
- **JWT 토큰**: API 접근 권한 관리
- **사용자 검증**: 게시글 작성/수정/삭제 시 사용자 권한 확인

### **데이터 보안**
- **SQL 인젝션 방지**: SQLAlchemy ORM 사용
- **입력 데이터 검증**: 사용자 입력 데이터 sanitization
- **파일 업로드 보안**: 확장자 및 크기 제한

### **IP 기반 보안**
- **조회수 중복 방지**: 동일 IP의 2분 내 중복 접근 차단
- **Rate Limiting**: API 호출 빈도 제한 (구현 예정)

## 🧪 **테스트**

### **API 테스트**
```bash
# curl을 사용한 API 테스트
curl http://localhost:5000/api/v1/posts

# 게시글 생성 테스트
curl -X POST http://localhost:5000/api/v1/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "테스트", "content": "테스트 내용"}'
```

### **데이터베이스 테스트**
```bash
# PostgreSQL 연결 테스트
docker exec -it post-service-db psql -U postgres -d postdb

# 테이블 확인
\dt

# 데이터 확인
SELECT * FROM post LIMIT 5;
```

## 🚨 **문제 해결**

### **서비스가 시작되지 않는 경우**
```bash
# Docker 로그 확인
docker-compose logs post-service

# 포트 충돌 확인
netstat -an | grep 5000

# 컨테이너 재시작
docker-compose restart post-service
```

### **데이터베이스 연결 오류**
```bash
# PostgreSQL 상태 확인
docker-compose ps post-service-db

# 데이터베이스 로그 확인
docker-compose logs post-service-db

# 데이터베이스 재시작
docker-compose restart post-service-db
```

### **AWS Cognito 연결 오류**
```bash
# 환경 변수 확인
echo $AWS_ACCESS_KEY_ID
echo $AWS_SECRET_ACCESS_KEY

# AWS CLI 설정 확인
aws configure list
```

## 📊 **성능 최적화**

### **이미 구현된 최적화**
- **IP 기반 조회수 중복 방지**: 메모리 캐시를 통한 효율적인 중복 방지
- **데이터베이스 인덱싱**: 자주 조회되는 컬럼에 대한 인덱스 설정
- **커넥션 풀링**: 데이터베이스 연결 효율성 향상

### **추가 최적화 방안**
- **Redis 캐싱**: 자주 조회되는 데이터 캐싱
- **API 응답 압축**: gzip 압축을 통한 전송량 감소
- **데이터베이스 쿼리 최적화**: N+1 쿼리 문제 해결

## 🚀 **배포 방법**

### **Docker 배포 (권장)**
```bash
# 프로덕션 빌드
docker build -t post-service:latest .

# 컨테이너 실행
docker run -d -p 5000:5000 --name post-service post-service:latest
```

### **로컬 배포**
```bash
# 가상환경 생성
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt

# 서버 실행
python app.py
```

### **클라우드 배포**
- **AWS ECS**: Docker 컨테이너 기반 배포
- **AWS Lambda**: 서버리스 아키텍처 (제한적)
- **Google Cloud Run**: 컨테이너 기반 서비스

## 🤝 **기여하기**

1. 이 저장소를 Fork
2. 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 생성

## 📄 **라이선스**

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 **문의 및 지원**

- **이슈 리포트**: GitHub Issues 사용
- **기능 요청**: Feature Request 라벨로 이슈 생성
- **버그 리포트**: Bug Report 라벨로 이슈 생성

## 🔗 **관련 프로젝트**

- **Frontend**: [React 기반 프론트엔드](https://github.com/ksjj3765/Front)
- **Database**: PostgreSQL 데이터베이스
- **Authentication**: AWS Cognito

---

**⭐ Post Service가 도움이 되었다면 Star를 눌러주세요! ⭐**


