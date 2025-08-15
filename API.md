## Barbershop Admin API Specification (v1)

This document defines a minimal REST API that the current admin panel can consume. It covers authentication, clients, services, staff, appointments, settings, and dashboard stats.

### Base URL

- Production: `https://api.example.com/v1`
- Local: `http://localhost:4000/v1`

### Conventions

- Content type: `application/json`
- Timestamps: ISO 8601 (e.g., `2025-01-31T14:30:00Z`)
- IDs: string UUIDs
- Auth: Bearer JWT in `Authorization: Bearer <token>`
- List responses are wrapped with pagination `meta`

```json
{
  "data": [/* items */],
  "meta": { "page": 1, "limit": 20, "total": 120 }
}
```

### Errors

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": { "email": "Required" }
  }
}
```

Common status codes: `200`, `201`, `204`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, `500`.

### Pagination, Sorting, Filtering

- Pagination: `?page=1&limit=20`
- Sorting: `?sort=field&order=asc|desc` (e.g., `?sort=name&order=asc`)
- Search: `?q=term`
- Additional resource-specific filters noted below

---

## Authentication

### POST /auth/login

Authenticates a user and returns a JWT.

Request
```json
{ "email": "admin@barber.com", "password": "admin123" }
```

Response 200
```json
{
  "token": "<jwt>",
  "user": { "id": "1", "name": "Admin User", "email": "admin@barber.com", "role": "admin" }
}
```

### GET /auth/me

Returns the current authenticated user.

Headers: `Authorization: Bearer <jwt>`

Response 200
```json
{ "id": "1", "name": "Admin User", "email": "admin@barber.com", "role": "admin" }
```

### POST /auth/logout (optional)

Invalidates the current session/token (if using server-side sessions or revocation list).

Response 204 (no content)

---

## Clients

Type
```ts
type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;     // ISO date, e.g. 2025-01-31
  totalVisits: number;
  totalSpent: number;    // in major currency units
}
```

### GET /clients

Query params: `q`, `page`, `limit`, `sort` (name|email|lastVisit|totalVisits|totalSpent), `order`

Response 200
```json
{
  "data": [
    {"id":"1","name":"John Doe","email":"john@example.com","phone":"(555) 123-4567","lastVisit":"2023-06-15","totalVisits":8,"totalSpent":240}
  ],
  "meta": {"page":1,"limit":20,"total":1}
}
```

### POST /clients

Request
```json
{ "name": "Jane Doe", "email": "jane@example.com", "phone": "+1-555-111-2222" }
```

Response 201
```json
{"id":"uuid","name":"Jane Doe","email":"jane@example.com","phone":"+1-555-111-2222","lastVisit":"Never","totalVisits":0,"totalSpent":0}
```

### GET /clients/{id}
Response 200: `Client`

### PATCH /clients/{id}
Request (partial)
```json
{ "name": "Jane A. Doe", "phone": "+1-555-999-0000" }
```
Response 200: `Client`

### DELETE /clients/{id}
Response 204

---

## Services

Type
```ts
type Service = {
  id: string;
  name: string;
  description: string;
  duration: number;      // minutes
  price: number;         // major currency units
  category: 'haircut'|'beard'|'styling'|'color'|'other';
  barberName: string;    // name of the barber who performs this service
}
```

### GET /services

Query params: `q`, `category`, `barberName`, `page`, `limit`, `sort` (name|price|duration|category|barberName), `order`

### POST /services
Request
```json
{ "name": "Haircut", "description": "Classic haircut", "duration": 30, "price": 30, "category": "haircut", "barberName": "Mike Smith" }
```

### GET /services/{id}
Response 200: `Service`

### PATCH /services/{id}
Partial update
```json
{ "price": 35, "barberName": "Jessica Lee" }
```
Response 200: `Service`

### DELETE /services/{id}
Response 204

---

## Staff

Type
```ts
type Staff = {
  id: string;
  name: string;
  position: 'barber'|'stylist'|'assistant'|'manager';
  email: string;
  phone: string;
  hireDate: string;      // ISO date
  bio: string;           // internal notes/bio for admin
  websiteDescription: string; // public-friendly description for website profiles
  barberSpeciality?: string; // e.g., "Fades, Beard trims"
  slug: string;          // URL slug for website, unique (e.g., "mike-smith")
  social: {
    facebook?: string;
    instagram?: string;
  };
  mainImage?: {
    id: string;
    url: string;
    alt?: string;
  };
  gallery?: Array<{
    id: string;
    url: string;
    alt?: string;
    isPrimary?: boolean;
  }>;
}
```

### GET /staff

Admin list (auth required).

Query: `q`, `position`, `page`, `limit`, `sort` (name|position|hireDate), `order`

Response 200
```json
{
  "data": [
    {
      "id":"1","name":"Mike Smith","slug":"mike-smith","position":"barber",
      "email":"mike@barber.com","phone":"(555) 123-4567","hireDate":"2020-01-15",
      "bio":"Experienced barber with classic cuts.",
      "barberSpeciality":"Fades, Beard trims",
      "websiteDescription":"Classic cuts and clean fades with 10+ years of experience.",
      "social":{"facebook":"https://facebook.com/mike","instagram":"https://instagram.com/mike"},
      "mainImage":{"id":"img_1","url":"https://cdn.example.com/staff/mike/main.jpg","alt":"Mike cutting hair"}
    }
  ],
  "meta": {"page":1, "limit":20, "total":1}
}
```

### POST /staff

Create a staff member. Accepts either image URLs or upload later via images endpoints.

Request
```json
{
  "name":"Mike Smith",
  "slug":"mike-smith",
  "position":"barber",
  "email":"mike@barber.com",
  "phone":"(555) 123-4567",
  "hireDate":"2020-01-15",
  "bio":"Experienced barber with over 10 years of experience in classic cuts.",
  "barberSpeciality":"Fades, Beard trims",
  "websiteDescription":"Classic cuts and clean fades with attention to detail.",
  "social":{
    "facebook":"https://facebook.com/mike",
    "instagram":"https://instagram.com/mike"
  },
  "mainImage":{
    "url":"https://cdn.example.com/staff/mike/main.jpg",
    "alt":"Mike at work"
  }
}
```

Response 201: `Staff`

### GET /staff/{id}
Response 200: `Staff`

### GET /staff/slug/{slug}
Response 200: `Staff`

### PATCH /staff/{id}

Partial update.

Request (example)
```json
{
  "name":"Michael Smith",
  "websiteDescription":"Specialist in modern fades and beard trims.",
  "social": {"instagram":"https://instagram.com/mike.fade"}
}
```

Response 200: `Staff`

### DELETE /staff/{id}

Response 204

### Image management (optional)

If you need file uploads instead of URLs, use multipart endpoints.

- POST /staff/{id}/images (multipart/form-data)
  - Fields: `file` (image), optional `alt`, optional `isPrimary`
  - Response 201: `{ "id": "img_123", "url": "https://cdn...", "alt": "...", "isPrimary": true }`

- PATCH /staff/{id}/images/{imageId}
  - Body: `{ "alt": "...", "isPrimary": true|false }`

- DELETE /staff/{id}/images/{imageId}
  - Response 204

---

## Appointments

Recommendation: store exact start time; duration in minutes; derive end time server-side.

Type
```ts
type Appointment = {
  id: string;
  clientId: string;
  serviceId: string;
  staffId: string;
  startTime: string;     // ISO datetime
  duration: number;      // minutes
  price: number;         // major currency units
  status: 'confirmed'|'cancelled'|'completed'|'no-show';
}
```

### GET /appointments

Query params:
- `q` (matches client or service names)
- `date` (YYYY-MM-DD) or `from`/`to` (ISO datetimes)
- `status` (confirmed|cancelled|completed|no-show)
- `staffId`, `clientId`, `serviceId`
- `page`, `limit`, `sort` (startTime|status|price|duration), `order`

Response 200
```json
{
  "data": [
    {"id":"1","clientId":"1","serviceId":"1","staffId":"1","startTime":"2023-07-01T10:00:00Z","duration":30,"price":30,"status":"confirmed"}
  ],
  "meta": {"page":1,"limit":20,"total":1}
}
```

### POST /appointments

Request
```json
{
  "clientId": "1",
  "serviceId": "1",
  "staffId": "1",
  "startTime": "2025-02-01T10:00:00Z",
  "duration": 30,
  "price": 30
}
```

Response 201: `Appointment` with derived fields if any

### PATCH /appointments/{id}
Partial update (e.g., status change)
```json
{ "status": "completed" }
```

### DELETE /appointments/{id}
Response 204

---
## Settings

Type
```ts
type Settings = {
  shopName: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  openingHours: Record<string, string>; // e.g. { monday: "9:00 AM - 5:00 PM" }
  socialMedia: { facebook: string; instagram: string; twitter: string };
  notifications: {
    emailReminders: boolean;
    smsReminders: boolean;
    appointmentConfirmation: boolean;
    marketingEmails: boolean;
  };
  appearance: { theme: 'light'|'dark'|'system'; primaryColor: string };
}
```

### GET /settings
Response 200: `Settings`

### PUT /settings
Replaces full settings

Request (example)
```json
{
  "shopName": "Downtown Barbers",
  "address": "123 Main St",
  "phone": "+1-555-123-4567",
  "email": "info@barbers.com",
  "website": "https://barbers.com",
  "openingHours": {
    "monday": "9:00 AM - 5:00 PM",
    "tuesday": "9:00 AM - 5:00 PM"
  },
  "socialMedia": {"facebook":"https://fb.com/","instagram":"https://ig.com/","twitter":"https://x.com/"},
  "notifications": {"emailReminders":true,"smsReminders":false,"appointmentConfirmation":true,"marketingEmails":false},
  "appearance": {"theme":"system","primaryColor":"#F97316"}
}
```

Response 200: `Settings`

### PATCH /settings
Partial update (same shape as `Settings`)

---

## Dashboard

### GET /stats/overview

Query params: `range=day|week|month|year` (default: `month`), optional `from`/`to`

Response 200
```json
{
  "totalAppointments": 42,
  "confirmed": 28,
  "completed": 10,
  "revenue": 1250
}
```

---

---

### Public website-facing appointment endpoints (no auth)

These endpoints power the website reservation form (stylist, service, date, time, email).

#### GET /public/availability

Returns available 30-minute time slots for a given staff and date. Takes service duration into account.

Query params:
- `staffId` or `staffSlug` (one required)
- `date` (YYYY-MM-DD)
- `serviceId` (optional; if provided, slot fit is validated against service duration)

Response 200
```json
{
  "date": "2025-02-14",
  "staff": { "id": "1", "slug": "mike-smith", "name": "Mike Smith" },
  "slots": [
    { "time": "08:00", "available": true },
    { "time": "08:30", "available": true },
    { "time": "09:00", "available": false }
  ]
}
```

#### POST /public/appointments

Creates a booking request. The server will convert `date`+`time` into an ISO `startTime`. Implement double-submit protection and rate limiting.

Request
```json
{
  "client": {
    "email": "john@example.com",
    "name": "John Doe",
    "phone": "+1-555-111-2222",
    "notes": "Please do a low fade"
  },
  "staffId": "1",
  "serviceId": "2",
  "date": "2025-02-14",
  "time": "10:30"
}
```

Alternative (use slug instead of id): include `staffSlug` instead of `staffId`.

Response 201
```json
{
  "id": "apt_123",
  "status": "pending",
  "startTime": "2025-02-14T10:30:00Z",
  "duration": 30,
  "price": 30,
  "staff": { "id": "1", "name": "Mike Smith", "slug": "mike-smith" },
  "service": { "id": "2", "name": "Signature Cut & Style" }
}
```

Errors
- 409 `SLOT_UNAVAILABLE` if the selected time is no longer available
- 422 validation errors for required fields

---

Public website-facing endpoints (no auth):

### GET /public/services
Query: `q`, `category`, `barberName`, `page`, `limit`, `sort` (name|price|duration|category|barberName), `order`

Response 200
```json
{
  "data": [
    {
      "id": "1",
      "name": "Haircut",
      "description": "Classic haircut with scissors and clippers",
      "duration": 30,
      "price": 30,
      "category": "haircut",
      "barberName": "Mike Smith"
    }
  ],
  "meta": {"page": 1, "limit": 12, "total": 1}
}
```

### GET /public/services/{id}
Response 200: `Service` (public fields)

---

### GET /public/staff
Query: `q`, `position`, `page`, `limit`

Response 200: list of `Staff` with only public fields: `name`, `slug`, `position`, `websiteDescription`, `social`, `mainImage`, `gallery`

### GET /public/staff/{slug}
Response 200: public `Staff` profile