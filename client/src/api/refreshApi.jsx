const refreshApi = async () => {
    try {
        const response = await fetch(
            'http://localhost:8000/api/auth/refresh',
            {
                method: 'POST',
                credentials: 'include'
            }
        )

        if (!response.ok) {
            return false
        }

        return true

    } catch (error) {
        console.error('Refresh token error:', error)
        return false
    }
}

export default refreshApi