-- festivals 테이블 생성
-- Supabase 또는 PostgreSQL 환경에서 실행하세요.

CREATE TABLE IF NOT EXISTS festivals (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  region text NOT NULL,
  month text NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 예시 데이터
INSERT INTO festivals (name, region, month, description) VALUES
  ('진해군항제', '경남', '4월', '벚꽃과 군항제가 어우러지는 봄 축제'),
  ('보령머드페스티벌', '충남', '7월', '머드 체험과 워터파크형 여름 축제'),
  ('진주남강유등제', '경남', '10월', '남강에 유등을 띄우는 가을 야경 축제'),
  ('안동국제탈춤페스티벌', '경북', '9월', '전통 탈춤과 국제 퍼포먼스 축제'),
  ('화천산천어축제', '강원', '1월', '얼음낚시와 겨울 야외 체험 축제'),
  ('부산국제영화제', '부산', '10월', '아시아 대표 영화제'),
  ('강릉단오제', '강원', '5월', '유네스코에 등재된 단오 전통 축제'),
  ('보성녹차대축제', '전남', '5월', '녹차밭 체험과 다례 행사'),
  ('광양매화축제', '전남', '3월', '매화가 만개하는 봄꽃 축제'),
  ('순창발효소스토굴축제', '전북', '10월', '발효 음식과 장류 체험 행사');
