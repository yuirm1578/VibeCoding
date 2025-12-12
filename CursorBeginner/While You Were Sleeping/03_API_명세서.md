# API 명세서 (테이블 + JSON 예시)

> 현재 프로젝트는 목업 데이터 기반 UI입니다. 아래는 “실서비스 연동 시”를 가정한 API 명세 초안입니다.

## 공통
- Base URL: `/api`
- Response 공통 포맷(권장)
  - 성공: `{ "data": ... }`
  - 실패: `{ "error": { "code": "...", "message": "..." } }`

---

## 1) 화제 종목 TOP N 조회

### Endpoint
`GET /api/stocks/top`

### Query
| 이름 | 타입 | 필수 | 설명 |
|---|---|---:|---|
| date | string(YYYY-MM-DD) | 선택 | 특정 날짜 TOP (미지정 시 오늘) |
| limit | number | 선택 | 기본 3 |

### Response (200)
| 필드 | 타입 | 설명 |
|---|---|---|
| data.date | string | 기준 날짜 |
| data.items | array | TOP 종목 목록 |
| data.items[].rank | number | 순위(1부터) |
| data.items[].symbol | string | 종목 코드 |
| data.items[].name | string | 종목명 |
| data.items[].price | number | 현재가 |
| data.items[].changePercent | number | 변동률(%) |
| data.items[].volume | number | 거래량 |
| data.items[].reason | string | 선정 사유 |

### JSON 예시
```json
{
  "data": {
    "date": "2025-12-12",
    "items": [
      {
        "rank": 1,
        "symbol": "AAPL",
        "name": "Apple Inc.",
        "price": 175.43,
        "changePercent": 1.24,
        "volume": 45234567,
        "reason": "거래량 급증"
      },
      {
        "rank": 2,
        "symbol": "TSLA",
        "name": "Tesla, Inc.",
        "price": 245.67,
        "changePercent": -1.29,
        "volume": 38923456,
        "reason": "변동성 확대"
      },
      {
        "rank": 3,
        "symbol": "NVDA",
        "name": "NVIDIA Corporation",
        "price": 485.23,
        "changePercent": 2.45,
        "volume": 32145678,
        "reason": "종합 점수 상위"
      }
    ]
  }
}
```

---

## 2) 종목 5일 추이(주가/거래량) 조회

### Endpoint
`GET /api/stocks/{symbol}/history`

### Path
| 이름 | 타입 | 필수 | 설명 |
|---|---|---:|---|
| symbol | string | 필수 | 종목 코드 |

### Query
| 이름 | 타입 | 필수 | 설명 |
|---|---|---:|---|
| days | number | 선택 | 기본 5 |

### Response (200)
| 필드 | 타입 | 설명 |
|---|---|---|
| data.symbol | string | 종목 코드 |
| data.items | array | 히스토리 |
| data.items[].date | string | 표시용 날짜(예: `12/12`) |
| data.items[].price | number | 종가(또는 기준가) |
| data.items[].volume | number | 거래량 |

### JSON 예시
```json
{
  "data": {
    "symbol": "AAPL",
    "items": [
      { "date": "12/08", "price": 171.25, "volume": 38450000 },
      { "date": "12/09", "price": 172.8,  "volume": 41230000 },
      { "date": "12/10", "price": 170.95, "volume": 39870000 },
      { "date": "12/11", "price": 173.28, "volume": 42150000 },
      { "date": "12/12", "price": 175.43, "volume": 45234567 }
    ]
  }
}
```

---

## 3) 브리핑 목록 조회

### Endpoint
`GET /api/briefings`

### Query
| 이름 | 타입 | 필수 | 설명 |
|---|---|---:|---|
| limit | number | 선택 | 기본 20 |

### Response (200) JSON 예시
```json
{
  "data": [
    {
      "id": "brief_20241215_143000",
      "symbol": "AAPL",
      "stockName": "Apple Inc.",
      "status": "completed",
      "createdAt": "2024-12-15T14:30:00Z",
      "completedAt": "2024-12-15T14:30:15Z",
      "imageUrl": "https://picsum.photos/seed/aapl/800/600",
      "summary": "요약 문장...",
      "keyPoints": ["포인트1", "포인트2"]
    }
  ]
}
```

---

## 4) 브리핑 상세 조회

### Endpoint
`GET /api/briefings/{id}`

### Response (200) JSON 예시
```json
{
  "data": {
    "id": "brief_20241215_143000",
    "symbol": "AAPL",
    "stockName": "Apple Inc.",
    "status": "completed",
    "createdAt": "2024-12-15T14:30:00Z",
    "completedAt": "2024-12-15T14:30:15Z",
    "imageUrl": "https://picsum.photos/seed/aapl/800/600",
    "summary": "요약 문장...",
    "keyPoints": ["거래량 급증", "가격 상승", "시총 2.73조"],
    "newsSummary": "최근 뉴스 요약..."
  }
}
```

---

## 5) 브리핑 생성(비동기)

### Endpoint
`POST /api/briefings`

### Request Body
| 필드 | 타입 | 필수 | 설명 |
|---|---|---:|---|
| symbol | string | 필수 | 브리핑 생성할 종목 코드 |

### Response (202) JSON 예시
```json
{
  "data": {
    "id": "brief_20251212_090000",
    "status": "processing"
  }
}
```


