const refreshApi = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken')

        if (!refreshToken) {
            return false
        }

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    refreshToken
                })
            }
        )

        if (!response.ok) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            return false
        }

        const data = await response.json()

        // Save new tokens
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)

        return true

    } catch (error) {
        console.error('Refresh token error:', error)
        return false
    }
}

export default refreshApi