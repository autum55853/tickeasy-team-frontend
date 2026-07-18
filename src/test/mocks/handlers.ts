import { http, HttpResponse } from "msw";

const BASE = "http://localhost:3001";

export const handlers = [
  http.post(`${BASE}/api/v1/users/login`, () =>
    HttpResponse.json({
      status: "success",
      data: { token: "test-auth-token", user: { email: "test@example.com", role: "user" } },
    })
  ),

  http.post(`${BASE}/api/v1/users/login-error`, () =>
    HttpResponse.json({ status: "error", message: "帳號或密碼錯誤" }, { status: 401 })
  ),

  http.get(`${BASE}/api/v1/users/profile`, () =>
    HttpResponse.json({
      status: "success",
      data: { email: "test@example.com", role: "user" },
    })
  ),

  http.get(`${BASE}/api/v1/concerts`, () =>
    HttpResponse.json({
      status: "success",
      data: {
        concerts: [],
        pagination: { totalCount: 0, totalPages: 0, currentPage: 1, limit: 10 },
      },
    })
  ),

  http.get(`${BASE}/api/v1/concerts/:id`, ({ params }) =>
    HttpResponse.json({
      status: "success",
      data: { concertId: params.id, conTitle: "Test Concert" },
    })
  ),

  http.get(`${BASE}/api/v1/concerts/location-tags`, () =>
    HttpResponse.json({
      status: "success",
      message: "ok",
      data: [
        { locationTagId: "1", locationTagName: "台北", subLabel: "Taipei" },
        { locationTagId: "2", locationTagName: "台中", subLabel: "Taichung" },
      ],
    })
  ),

  http.get(`${BASE}/api/v1/concerts/music-tags`, () =>
    HttpResponse.json({
      status: "success",
      message: "ok",
      data: [
        { musicTagId: "1", musicTagName: "流行", subLabel: "Pop" },
        { musicTagId: "2", musicTagName: "搖滾", subLabel: "Rock" },
      ],
    })
  ),

  http.post(`${BASE}/api/v1/orders`, () =>
    HttpResponse.json({
      status: "success",
      data: { orderId: "test-order-id", lockExpireTime: "2024-12-31T00:00:00Z" },
    })
  ),

  http.get(`${BASE}/api/v1/organizations/:id/concerts`, () =>
    HttpResponse.json({
      status: "success",
      message: "ok",
      data: {
        concerts: [],
        pagination: { totalCount: 0, totalPages: 0, currentPage: 1, limit: 10 },
      },
    })
  ),
];
