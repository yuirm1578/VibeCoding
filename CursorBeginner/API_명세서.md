# 당신이 잠든 사이 (While You Were Sleeping)
## REST API 명세서

**Base URL**: `https://api.whileyouweresleeping.com/v1`

**인증 방식**: Bearer Token (JWT)

**Content-Type**: `application/json`

---

## 목차

1. [화제 종목 조회 API](#1-화제-종목-조회-api)
2. [종목 상세 정보 API](#2-종목-상세-정보-api)
3. [브리핑 생성 API](#3-브리핑-생성-api)
4. [발송 API](#4-발송-api)
5. [브리핑 히스토리 조회 API](#5-브리핑-히스토리-조회-api)

---

## 1. 화제 종목 조회 API

### 1.1 오늘의 화제 종목 조회 (TOP 1)

| 항목 | 내용 |
|------|------|
| **HTTP Method** | `GET` |
| **Endpoint** | `/trending/top` |
| **인증** | 선택 (인증 시 사용자 맞춤 필터 적용) |
| **Query Parameters** | `limit` (optional, default: 1, max: 10) |

#### Request Example

```http
GET /v1/trending/top?limit=1
Authorization: Bearer {token}
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "stock": {
      "symbol": "AAPL",
      "name": "Apple Inc.",
      "price": 175.43,
      "change": 2.15,
      "change_percent": 1.24,
      "volume": 45234567,
      "market_state": "REGULAR",
      "selected_at": "2024-12-15T14:30:00Z",
      "selection_reason": "highest_volume"
    },
    "timestamp": "2024-12-15T14:30:00Z"
  }
}
```

#### Error Responses

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | `INVALID_LIMIT` | limit 파라미터가 1-10 범위를 벗어남 |
| 500 | `DATA_FETCH_ERROR` | Yahoo Finance 데이터 조회 실패 |
| 503 | `SERVICE_UNAVAILABLE` | 외부 서비스 일시적 장애 |

```json
{
  "success": false,
  "error": {
    "code": "DATA_FETCH_ERROR",
    "message": "Failed to fetch trending stocks from Yahoo Finance",
    "details": "Network timeout after 3 retries"
  }
}
```

---

### 1.2 화제 종목 목록 조회 (TOP N)

| 항목 | 내용 |
|------|------|
| **HTTP Method** | `GET` |
| **Endpoint** | `/trending/stocks` |
| **인증** | 선택 |
| **Query Parameters** | `limit` (optional, default: 10, max: 50), `sort_by` (optional: `volume`, `change_percent`, default: `volume`) |

#### Request Example

```http
GET /v1/trending/stocks?limit=10&sort_by=volume
Authorization: Bearer {token}
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "stocks": [
      {
        "symbol": "AAPL",
        "name": "Apple Inc.",
        "price": 175.43,
        "change": 2.15,
        "change_percent": 1.24,
        "volume": 45234567,
        "market_state": "REGULAR"
      },
      {
        "symbol": "TSLA",
        "name": "Tesla, Inc.",
        "price": 245.67,
        "change": -3.21,
        "change_percent": -1.29,
        "volume": 38923456,
        "market_state": "REGULAR"
      }
    ],
    "total": 10,
    "timestamp": "2024-12-15T14:30:00Z"
  }
}
```

#### Error Responses

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | `INVALID_PARAMETER` | 잘못된 query parameter |
| 500 | `DATA_FETCH_ERROR` | 데이터 조회 실패 |

---

## 2. 종목 상세 정보 API

### 2.1 종목 기본 정보 조회

| 항목 | 내용 |
|------|------|
| **HTTP Method** | `GET` |
| **Endpoint** | `/stocks/{symbol}` |
| **인증** | 불필요 |
| **Path Parameters** | `symbol` (required, 예: AAPL, TSLA) |

#### Request Example

```http
GET /v1/stocks/AAPL
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "fullName": "Apple Inc. Common Stock",
    "sector": "Technology",
    "industry": "Consumer Electronics",
    "currentPrice": 175.43,
    "previousClose": 173.28,
    "change": 2.15,
    "changePercent": 1.24,
    "volume": 45234567,
    "averageVolume": 52345678,
    "marketCap": 2734567890123,
    "peRatio": 28.45,
    "dividendYield": 0.52,
    "fiftyTwoWeekHigh": 198.23,
    "fiftyTwoWeekLow": 164.08,
    "marketState": "REGULAR",
    "updatedAt": "2024-12-15T14:30:00Z"
  }
}
```

#### Error Responses

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | `INVALID_SYMBOL` | 잘못된 종목 심볼 형식 |
| 404 | `STOCK_NOT_FOUND` | 종목을 찾을 수 없음 |
| 500 | `DATA_FETCH_ERROR` | 종목 정보 조회 실패 |

```json
{
  "success": false,
  "error": {
    "code": "STOCK_NOT_FOUND",
    "message": "Stock symbol 'INVALID' not found",
    "details": null
  }
}
```

---

### 2.2 종목 뉴스 조회

| 항목 | 내용 |
|------|------|
| **HTTP Method** | `GET` |
| **Endpoint** | `/stocks/{symbol}/news` |
| **인증** | 불필요 |
| **Path Parameters** | `symbol` (required) |
| **Query Parameters** | `limit` (optional, default: 10, max: 50) |

#### Request Example

```http
GET /v1/stocks/AAPL/news?limit=10
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "symbol": "AAPL",
    "news": [
      {
        "id": "news_001",
        "title": "Apple Announces New iPhone Features",
        "summary": "Apple Inc. unveiled new AI-powered features for its latest iPhone model...",
        "source": "Bloomberg",
        "publishedAt": "2024-12-15T10:00:00Z",
        "url": "https://example.com/news/apple-iphone",
        "sentiment": "positive"
      },
      {
        "id": "news_002",
        "title": "Apple Stock Rises on Strong Earnings",
        "summary": "Apple shares climbed after reporting better-than-expected quarterly earnings...",
        "source": "Reuters",
        "publishedAt": "2024-12-15T08:30:00Z",
        "url": "https://example.com/news/apple-earnings",
        "sentiment": "positive"
      }
    ],
    "total": 10,
    "timestamp": "2024-12-15T14:30:00Z"
  }
}
```

#### Error Responses

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | `INVALID_SYMBOL` | 잘못된 종목 심볼 |
| 404 | `STOCK_NOT_FOUND` | 종목을 찾을 수 없음 |
| 500 | `NEWS_FETCH_ERROR` | 뉴스 조회 실패 |

---

## 3. 브리핑 생성 API

### 3.1 브리핑 생성 (이미지 + 텍스트)

| 항목 | 내용 |
|------|------|
| **HTTP Method** | `POST` |
| **Endpoint** | `/briefings` |
| **인증** | 필수 |
| **Request Body** | 종목 심볼 또는 자동 선정 옵션 |

#### Request Example

```http
POST /v1/briefings
Authorization: Bearer {token}
Content-Type: application/json

{
  "symbol": "AAPL",
  "options": {
    "include_news": true,
    "news_limit": 5,
    "image_format": "png",
    "image_style": "modern"
  }
}
```

또는 자동 선정:

```json
{
  "auto_select": true,
  "options": {
    "include_news": true,
    "news_limit": 5,
    "image_format": "png",
    "image_style": "modern"
  }
}
```

#### Success Response (201 Created)

```json
{
  "success": true,
  "data": {
    "briefing": {
      "id": "brief_20241215_143000",
      "symbol": "AAPL",
      "stock_name": "Apple Inc.",
      "status": "completed",
      "created_at": "2024-12-15T14:30:00Z",
      "completed_at": "2024-12-15T14:30:15Z",
      "image": {
        "url": "https://cdn.whileyouweresleeping.com/briefings/brief_20241215_143000.png",
        "format": "png",
        "size_bytes": 245678
      },
      "text": {
        "summary": "Apple Inc. (AAPL)는 오늘 거래량 45,234,567주로 가장 활발하게 거래되었습니다. 현재가 $175.43로 전일 대비 1.24% 상승했습니다.",
        "key_points": [
          "거래량 급증: 평균 대비 86% 증가",
          "가격 상승: $173.28 → $175.43 (+1.24%)",
          "시가총액: $2.73조"
        ],
        "news_summary": "최근 뉴스에서 새로운 iPhone 기능 발표와 강한 실적 발표가 주목받고 있습니다."
      },
      "metadata": {
        "selection_reason": "highest_volume",
        "processing_time_ms": 15234
      }
    }
  }
}
```

#### Processing Response (202 Accepted)

브리핑 생성이 비동기로 처리되는 경우:

```json
{
  "success": true,
  "data": {
    "briefing": {
      "id": "brief_20241215_143000",
      "status": "processing",
      "created_at": "2024-12-15T14:30:00Z",
      "estimated_completion": "2024-12-15T14:30:20Z"
    }
  }
}
```

#### Error Responses

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | `INVALID_REQUEST` | 잘못된 요청 (symbol과 auto_select 모두 없음) |
| 400 | `INVALID_SYMBOL` | 잘못된 종목 심볼 |
| 401 | `UNAUTHORIZED` | 인증 토큰 없음 또는 만료 |
| 404 | `STOCK_NOT_FOUND` | 종목을 찾을 수 없음 |
| 500 | `BRIEFING_GENERATION_ERROR` | 브리핑 생성 실패 |
| 503 | `AI_SERVICE_UNAVAILABLE` | AI 이미지 생성 서비스 장애 |

```json
{
  "success": false,
  "error": {
    "code": "BRIEFING_GENERATION_ERROR",
    "message": "Failed to generate briefing image",
    "details": "AI service timeout"
  }
}
```

---

### 3.2 브리핑 상태 조회

| 항목 | 내용 |
|------|------|
| **HTTP Method** | `GET` |
| **Endpoint** | `/briefings/{briefing_id}` |
| **인증** | 필수 |

#### Request Example

```http
GET /v1/briefings/brief_20241215_143000
Authorization: Bearer {token}
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "briefing": {
      "id": "brief_20241215_143000",
      "symbol": "AAPL",
      "status": "completed",
      "created_at": "2024-12-15T14:30:00Z",
      "completed_at": "2024-12-15T14:30:15Z",
      "image": {
        "url": "https://cdn.whileyouweresleeping.com/briefings/brief_20241215_143000.png"
      }
    }
  }
}
```

---

## 4. 발송 API

### 4.1 이메일 발송

| 항목 | 내용 |
|------|------|
| **HTTP Method** | `POST` |
| **Endpoint** | `/deliveries/email` |
| **인증** | 필수 |
| **Request Body** | 브리핑 ID 또는 브리핑 생성 옵션 |

#### Request Example

```http
POST /v1/deliveries/email
Authorization: Bearer {token}
Content-Type: application/json

{
  "briefing_id": "brief_20241215_143000",
  "recipient": {
    "email": "user@example.com",
    "name": "홍길동"
  },
  "schedule": {
    "send_at": "2024-12-16T07:00:00+09:00"
  }
}
```

또는 브리핑 생성과 함께 발송:

```json
{
  "create_briefing": true,
  "briefing_options": {
    "auto_select": true,
    "include_news": true
  },
  "recipient": {
    "email": "user@example.com",
    "name": "홍길동"
  },
  "schedule": {
    "send_at": "2024-12-16T07:00:00+09:00"
  }
}
```

#### Success Response (202 Accepted)

```json
{
  "success": true,
  "data": {
    "delivery": {
      "id": "delivery_email_20241215_143500",
      "type": "email",
      "status": "scheduled",
      "briefing_id": "brief_20241215_143000",
      "recipient": {
        "email": "user@example.com",
        "name": "홍길동"
      },
      "scheduled_at": "2024-12-16T07:00:00+09:00",
      "created_at": "2024-12-15T14:35:00Z"
    }
  }
}
```

#### Error Responses

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | `INVALID_EMAIL` | 잘못된 이메일 형식 |
| 400 | `INVALID_SCHEDULE` | 과거 시간으로 스케줄 설정 |
| 401 | `UNAUTHORIZED` | 인증 실패 |
| 404 | `BRIEFING_NOT_FOUND` | 브리핑을 찾을 수 없음 |
| 500 | `EMAIL_SEND_ERROR` | 이메일 발송 실패 |
| 503 | `EMAIL_SERVICE_UNAVAILABLE` | 이메일 서비스 장애 |

```json
{
  "success": false,
  "error": {
    "code": "INVALID_EMAIL",
    "message": "Invalid email address format",
    "details": "Email must be a valid format"
  }
}
```

---

### 4.2 Slack 발송

| 항목 | 내용 |
|------|------|
| **HTTP Method** | `POST` |
| **Endpoint** | `/deliveries/slack` |
| **인증** | 필수 |
| **Request Body** | 브리핑 ID 및 Slack 웹훅 정보 |

#### Request Example

```http
POST /v1/deliveries/slack
Authorization: Bearer {token}
Content-Type: application/json

{
  "briefing_id": "brief_20241215_143000",
  "slack": {
    "webhook_url": "https://hooks.slack.com/services/YOUR/WEBHOOK/URL",
    "channel": "#stock-alerts",
    "username": "While You Were Sleeping Bot"
  },
  "schedule": {
    "send_at": "2024-12-16T07:00:00+09:00"
  }
}
```

#### Success Response (202 Accepted)

```json
{
  "success": true,
  "data": {
    "delivery": {
      "id": "delivery_slack_20241215_143500",
      "type": "slack",
      "status": "scheduled",
      "briefing_id": "brief_20241215_143000",
      "slack": {
        "channel": "#stock-alerts"
      },
      "scheduled_at": "2024-12-16T07:00:00+09:00",
      "created_at": "2024-12-15T14:35:00Z"
    }
  }
}
```

#### Error Responses

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | `INVALID_WEBHOOK` | 잘못된 Slack 웹훅 URL |
| 400 | `INVALID_SCHEDULE` | 과거 시간으로 스케줄 설정 |
| 401 | `UNAUTHORIZED` | 인증 실패 |
| 404 | `BRIEFING_NOT_FOUND` | 브리핑을 찾을 수 없음 |
| 500 | `SLACK_SEND_ERROR` | Slack 발송 실패 |
| 503 | `SLACK_SERVICE_UNAVAILABLE` | Slack API 장애 |

---

### 4.3 발송 상태 조회

| 항목 | 내용 |
|------|------|
| **HTTP Method** | `GET` |
| **Endpoint** | `/deliveries/{delivery_id}` |
| **인증** | 필수 |

#### Request Example

```http
GET /v1/deliveries/delivery_email_20241215_143500
Authorization: Bearer {token}
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "delivery": {
      "id": "delivery_email_20241215_143500",
      "type": "email",
      "status": "sent",
      "briefing_id": "brief_20241215_143000",
      "recipient": {
        "email": "user@example.com"
      },
      "scheduled_at": "2024-12-16T07:00:00+09:00",
      "sent_at": "2024-12-16T07:00:01Z",
      "created_at": "2024-12-15T14:35:00Z",
      "metadata": {
        "message_id": "email_msg_12345",
        "provider": "sendgrid"
      }
    }
  }
}
```

---

## 5. 브리핑 히스토리 조회 API

### 5.1 사용자 브리핑 히스토리 조회

| 항목 | 내용 |
|------|------|
| **HTTP Method** | `GET` |
| **Endpoint** | `/briefings/history` |
| **인증** | 필수 |
| **Query Parameters** | `page` (optional, default: 1), `limit` (optional, default: 20, max: 100), `symbol` (optional), `start_date` (optional, ISO 8601), `end_date` (optional, ISO 8601) |

#### Request Example

```http
GET /v1/briefings/history?page=1&limit=20&start_date=2024-12-01&end_date=2024-12-15
Authorization: Bearer {token}
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "briefings": [
      {
        "id": "brief_20241215_143000",
        "symbol": "AAPL",
        "stock_name": "Apple Inc.",
        "status": "completed",
        "created_at": "2024-12-15T14:30:00Z",
        "image": {
          "url": "https://cdn.whileyouweresleeping.com/briefings/brief_20241215_143000.png"
        },
        "deliveries": [
          {
            "id": "delivery_email_20241215_143500",
            "type": "email",
            "status": "sent",
            "sent_at": "2024-12-16T07:00:01Z"
          }
        ]
      },
      {
        "id": "brief_20241214_143000",
        "symbol": "TSLA",
        "stock_name": "Tesla, Inc.",
        "status": "completed",
        "created_at": "2024-12-14T14:30:00Z",
        "image": {
          "url": "https://cdn.whileyouweresleeping.com/briefings/brief_20241214_143000.png"
        },
        "deliveries": []
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "total_pages": 3
    }
  }
}
```

#### Error Responses

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | `INVALID_DATE_FORMAT` | 잘못된 날짜 형식 |
| 400 | `INVALID_PAGINATION` | 잘못된 페이지/limit 값 |
| 401 | `UNAUTHORIZED` | 인증 실패 |

---

### 5.2 특정 브리핑 상세 조회

| 항목 | 내용 |
|------|------|
| **HTTP Method** | `GET` |
| **Endpoint** | `/briefings/{briefing_id}/detail` |
| **인증** | 필수 |

#### Request Example

```http
GET /v1/briefings/brief_20241215_143000/detail
Authorization: Bearer {token}
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "briefing": {
      "id": "brief_20241215_143000",
      "symbol": "AAPL",
      "stock_name": "Apple Inc.",
      "status": "completed",
      "created_at": "2024-12-15T14:30:00Z",
      "completed_at": "2024-12-15T14:30:15Z",
      "image": {
        "url": "https://cdn.whileyouweresleeping.com/briefings/brief_20241215_143000.png",
        "format": "png",
        "size_bytes": 245678
      },
      "text": {
        "summary": "Apple Inc. (AAPL)는 오늘 거래량 45,234,567주로 가장 활발하게 거래되었습니다...",
        "key_points": [
          "거래량 급증: 평균 대비 86% 증가",
          "가격 상승: $173.28 → $175.43 (+1.24%)",
          "시가총액: $2.73조"
        ],
        "news_summary": "최근 뉴스에서 새로운 iPhone 기능 발표와 강한 실적 발표가 주목받고 있습니다."
      },
      "stock_data": {
        "price": 175.43,
        "change": 2.15,
        "change_percent": 1.24,
        "volume": 45234567,
        "market_cap": 2734567890123
      },
      "news": [
        {
          "id": "news_001",
          "title": "Apple Announces New iPhone Features",
          "summary": "Apple Inc. unveiled new AI-powered features...",
          "source": "Bloomberg",
          "publishedAt": "2024-12-15T10:00:00Z"
        }
      ],
      "deliveries": [
        {
          "id": "delivery_email_20241215_143500",
          "type": "email",
          "status": "sent",
          "recipient": {
            "email": "user@example.com"
          },
          "sent_at": "2024-12-16T07:00:01Z"
        }
      ],
      "metadata": {
        "selection_reason": "highest_volume",
        "processing_time_ms": 15234
      }
    }
  }
}
```

#### Error Responses

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 401 | `UNAUTHORIZED` | 인증 실패 |
| 403 | `FORBIDDEN` | 다른 사용자의 브리핑 접근 시도 |
| 404 | `BRIEFING_NOT_FOUND` | 브리핑을 찾을 수 없음 |

---

## 공통 에러 응답 형식

모든 API는 다음 형식의 에러 응답을 반환합니다:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": "Additional error details (optional)"
  }
}
```

---

## 공통 HTTP 상태 코드

| Status Code | 의미 |
|-------------|------|
| 200 | OK - 요청 성공 |
| 201 | Created - 리소스 생성 성공 |
| 202 | Accepted - 요청 수락 (비동기 처리) |
| 400 | Bad Request - 잘못된 요청 |
| 401 | Unauthorized - 인증 필요 |
| 403 | Forbidden - 권한 없음 |
| 404 | Not Found - 리소스 없음 |
| 429 | Too Many Requests - 요청 한도 초과 |
| 500 | Internal Server Error - 서버 오류 |
| 503 | Service Unavailable - 서비스 일시 중단 |

---

## 인증 (Authentication)

### JWT Token 사용

모든 인증이 필요한 API는 다음 헤더를 포함해야 합니다:

```http
Authorization: Bearer {jwt_token}
```

### 토큰 발급 (참고)

```http
POST /v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

---

## Rate Limiting

| 사용자 유형 | 제한 |
|------------|------|
| 무료 사용자 | 100 requests/hour |
| 프리미엄 사용자 | 1000 requests/hour |
| API 키 사용자 | 10000 requests/hour |

Rate limit 초과 시:

```http
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1640995200

{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again later.",
    "details": "Reset at 2024-12-15T15:00:00Z"
  }
}
```

---

## 버전 관리

API 버전은 URL 경로에 포함됩니다:

- 현재 버전: `v1`
- 향후 버전: `v2`, `v3` 등

기존 버전은 최소 6개월간 유지됩니다.

---

**작성일**: 2024년 12월  
**버전**: 1.0  
**최종 수정일**: 2024-12-15

