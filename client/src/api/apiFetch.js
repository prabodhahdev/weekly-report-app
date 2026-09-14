import refreshApi from './refreshApi'

const API_URL = import.meta.env.VITE_API_URL

// Keep one refresh request at a time
let refreshPromise = null

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

        /*
         * If another request is already refreshing,
         * wait for that same refresh request.
         *
         * This prevents multiple refresh requests
         * from using the same refresh token.
         */
        if (!refreshPromise) {
            refreshPromise = refreshApi()
                .finally(() => {
                    refreshPromise = null
                })
        }

        const refreshed = await refreshPromise

        if (!refreshed) {
            return response
        }

        // Retry the original request once
        return await apiFetch(url, options, false)
    }

    return response
}

export default apiFetch