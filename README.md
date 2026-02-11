# NOVA Platform (Fan Community Platform) - Frontend 리팩토링 프로젝트

## 프로젝트 개요

- 커뮤니티 팬 문화 플랫폼
- 프론트엔드 구조 개선, API 재설계, 상태 관리 개선, TypeScript 도입

## 기술 스택

- **Frontend:** React + TypeScript
- **상태 관리:** Zustand
- **API Mock:** MSW (Mock Service Worker)
- **스타일링:** CSS Module / Tailwind
- **라우팅:**React Router

---

## 문제 정의

기존 서비스의 문제점

- API 구조 일관성 부족
- 좋아요 로직 불명확
- 상세 페이지와 피드 페이지 간 상태 불일치
- 필터 상태 로직 분산
- 타입 안정성 부재

---

## 개선 방법

### 1️⃣ API 구조 리팩토링

#### Before

```
/feed_explore/all_feed
/feed_explore/try_remove_feed?fid=${fid}
/feed_explore/feed_detail/feed_data?fid=${fid}
```

#### After

```
GET /feeds
GET /feeds/:fid
DELETE /feeds/:fid
```

- 리소스 기반 RESTful 설계
- 확장 가능 구조 확보
- MSW를 활용하여 백엔드 없이 독립 개발 가능

### 2️⃣ 상태 관리 개선

- 좋아요, 필터 상태 동기화
- FeedPage - FeedDetail 상태 동기화 문제 해결
- 무한 스크롤 데이터 로직 정리

### 3️⃣ Featuer 기반 폴더 구조

```
components/
pages/
services/
hooks/
```

```
features/
├── feed/
│     ├── api/
│     ├── components/
│     ├── hooks/
│     └── types/
mocks/
```

- 유지보수성 개선
- 도메인 단위 응집도 향상

### 4️⃣ 페이지 복원

| 페이지         | 구현 내용                                               |
| -------------- | ------------------------------------------------------- |
| **HomePage**   | 타입 별 피드 썸네일, 배너                               |
| **FeedPage**   | 타입 별 피드 목록, 좋아요 상태 동기화, 필터, 무한스크롤 |
| **FeedDetail** | 좋아요 상태 반영, 상세 피드 표시, 댓글 UI               |

### 5️⃣ 개발 환경 개선

- Mock API 기반 독립적 프론트엔드 개발
- TypeScript로 타입 안정성 확보

---

## 리팩토링 결과

- API 설계 일관성 확보
- 상태 동기화 문제 해결
- 유지보수성 향상
- 타입 안정성 확보
- 독립적인 프론트엔드 개발 환경
