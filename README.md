# Proxy check — frontend

Vue 3 app for bulk proxy checks. Auth via cookies, dashboard with results table.

## Routes

| Path | Access | Purpose |
|------|--------|---------|
| `/` | guest | Landing |
| `/auth/sign-in` | guest | Sign in |
| `/auth/sign-up` | guest | Sign up |
| `/dashboard` | auth | Proxy check |
| `*` | — | 404 |

## API (used by frontend)

| Method | Endpoint | Notes |
|--------|----------|-------|
| `POST` | `/auth/sign-in` | |
| `POST` | `/auth/sign-up` | |
| `POST` | `/auth/log-out` | |
| `GET` | `/auth/session` | |
| `POST` | `/proxy/check` | Body: `{ "proxies": ["ip:port", ...] }`