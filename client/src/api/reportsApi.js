
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