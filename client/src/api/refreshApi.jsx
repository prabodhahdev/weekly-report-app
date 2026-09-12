const refreshApi = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
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