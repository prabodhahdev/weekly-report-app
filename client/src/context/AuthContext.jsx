
import { createContext, useContext, useEffect, useState } from 'react'
import refreshApi from '../api/refreshApi'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {

            try {

                let response = await fetch(
                    'http://localhost:8000/api/auth/profile',
                    {
                        credentials: 'include'
                    }
                )

                // Refresh token if the access token is expired
                if (response.status === 401) {

                    const refreshed = await refreshApi()

                    if (!refreshed) {
                        setUser(null)
                        return
                    }

                    response = await fetch(
                        'http://localhost:8000/api/auth/profile',
                        {
                            credentials: 'include'
                        }
                    )
                }

                if (!response.ok) {
                    setUser(null)
                    return
                }

                const data = await response.json()
                console.log("PROFILE API DATA:", data)
console.log("PROFILE USER:", data.user)

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

    const login = (userData) => {
    setUser(userData)
}

    // Logout user
    const logout = async () => {

        try {

            await fetch(
                'http://localhost:8000/api/auth/logout',
                {
                    method: 'POST',
                    credentials: 'include'
                }
            )

        } catch (error) {

            console.error('Logout error:', error)

        } finally {

            // Remove user from React state
            setUser(null)

        }
    }


    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                loading,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext)
}
