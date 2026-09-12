const BASE_URL = "http://localhost:8000/api/reports";

async function parseOrThrow(response, fallbackMessage) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || fallbackMessage);
  }
  return data;
}

export function createReport(payload) {
  return fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  }).then((res) => parseOrThrow(res, "Failed to create report"));
}

export function updateReport(reportId, payload) {
  return fetch(`${BASE_URL}/${reportId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  }).then((res) => parseOrThrow(res, "Failed to update report"));
}

export function submitReport(reportId) {
  return fetch(`${BASE_URL}/${reportId}/submit`, {
    method: "PUT",
    credentials: "include",
  }).then((res) => parseOrThrow(res, "Failed to submit report"));
}