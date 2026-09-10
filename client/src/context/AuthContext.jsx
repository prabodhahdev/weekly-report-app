import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(
                    'http://localhost:8000/api/auth/profile',
                    {
                        credentials: 'include'
                    }
                )

                if (!response.ok) {
                    setUser(null)
                    return
                }

                const data = await response.json()
                setUser(data.user)

            } catch (error) {
                console.error('Auth check error:', error)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}