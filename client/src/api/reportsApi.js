import apiFetch from "./apiFetch";

const BASE_URL = "/api/reports";

async function parseOrThrow(response, fallbackMessage) {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || fallbackMessage
        );
    }

    return data;
}

export function buildReportsQuery(params = {}) {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            query.set(key, value);
        }
    });

    const qs = query.toString();
    return qs ? `?${qs}` : "";
}

export function fetchMyReports(params = {}) {
    return apiFetch(
        `${BASE_URL}/my-reports${buildReportsQuery(params)}`
    ).then((res) =>
        parseOrThrow(res, "Failed to load reports")
    );
}

export function fetchReports(params = {}) {
    return apiFetch(
        `${BASE_URL}${buildReportsQuery(params)}`
    ).then((res) =>
        parseOrThrow(res, "Failed to load reports")
    );
}

export function createReport(payload) {
    return apiFetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    }).then((res) =>
        parseOrThrow(
            res,
            "Failed to create report"
        )
    );
}

export function updateReport(reportId, payload) {
    return apiFetch(
        `${BASE_URL}/${reportId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    ).then((res) =>
        parseOrThrow(
            res,
            "Failed to update report"
        )
    );
}

export function submitReport(reportId) {
    return apiFetch(
        `${BASE_URL}/${reportId}/submit`,
        {
            method: "PUT",
        }
    ).then((res) =>
        parseOrThrow(
            res,
            "Failed to submit report"
        )
    );
}
