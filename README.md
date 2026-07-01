# 2026 전국 축제 여행 페이지

이 프로젝트는 2026년 기준 한국 전국 유명 축제를 한눈에 보여주는 메인 페이지 예제입니다.

## 내용
- `index.html`: 축제 카드 리스트를 보여주는 메인 페이지
- `styles.css`: 화면 스타일 정의

## 실행 방법
1. 폴더를 웹 브라우저로 열거나 간단한 정적 서버를 사용합니다.
   - 예: Live Server 확장 또는 `npx serve .`
2. `index.html`을 브라우저에서 확인합니다.

## 페이지 구성
- `index.html`: 월별 보기, 지역별 보기, 리스트 보기로 이동하는 메인 페이지
- `monthly.html`: 월별 축제 보기
- `region.html`: 지역별 축제 보기
- `list.html`: 전체 축제 리스트 보기

## 다음 확장
- 지역별 검색 필터 추가
- 월별/계절별 정렬 기능 추가
- 축제 상세 페이지 연결

## 데이터베이스 연결
- `db/schema.sql` 파일에 PostgreSQL용 `festivals` 테이블 스키마와 예시 데이터를 추가했습니다.
- Supabase에서 SQL 에디터를 열고 `schema.sql` 내용을 실행하면 바로 테이블과 예시 데이터를 생성할 수 있습니다.
- 이후 `supabase-config.js`에 `Project URL`과 `anon` 키를 입력하면 `list.html`에서 DB 데이터를 불러올 수 있습니다.
