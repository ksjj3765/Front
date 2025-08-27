-- Post Service Database 초기화 스크립트
-- MySQL 8.0 호환

-- 데이터베이스 생성 (이미 docker-compose에서 생성됨)
-- CREATE DATABASE IF NOT EXISTS postdb;

-- 사용자 권한 설정
GRANT ALL PRIVILEGES ON postdb.* TO 'postuser'@'%';
FLUSH PRIVILEGES;

-- 기본 테이블들은 Flask-SQLAlchemy가 자동으로 생성
-- 여기에 필요한 초기 데이터나 추가 테이블이 있다면 추가


