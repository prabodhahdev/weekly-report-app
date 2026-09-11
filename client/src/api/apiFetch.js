import refreshApi from './refreshApi'

const API_URL = import.meta.env.VITE_API_URL

const apiFetch = async (url, options = {}, retry = true) => {
    const response = await fetch(
        `${API_URL}${url}`,
        {
            ...options,
            credentials: 'include',
        }
    )

    // Access token expired
    if (response.status === 401 && retry) {

        const refreshed = await refreshApi()

        if (!refreshed) {
            return response
        }

        // Retry the original request once
        return apiFetch(url, options, false)
    }

    return response
}

export default apiFetch