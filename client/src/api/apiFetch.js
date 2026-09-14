import refreshApi from './refreshApi'

const API_URL = import.meta.env.VITE_API_URL

const apiFetch = async (url, options = {}, retry = true) => {

    const accessToken = localStorage.getItem('accessToken')

    const response = await fetch(
        `${API_URL}${url}`,
        {
            ...options,
            headers: {
                ...options.headers,
                ...(accessToken && {
                    Authorization: `Bearer ${accessToken}`
                })
            }
        }
    )

    // Do not refresh these requests
    const noRefreshRoutes = [
        '/api/auth/login',
        '/api/auth/register',
        '/api/auth/refresh'
    ]

    const shouldRefresh =
        response.status === 401 &&
        retry &&
        accessToken &&
        !noRefreshRoutes.includes(url)

    // Access token expired
    if (shouldRefresh) {

        const refreshed = await refreshApi()

        if (!refreshed) {
            return response
        }

        // Retry the original request once
        return await apiFetch(url, options, false)
    }

    return response
}

export default apiFetch