import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import apiFetch from '../../api/apiFetch'
import logo from '../../../public/logo.png'

const AuthForm = ({ mode }) => {
    const isLogin = mode === 'login'
    const navigate = useNavigate()
    const { login } = useAuth()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'member'
    })

    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [passwordFocused, setPasswordFocused] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {
            const endpoint = isLogin
                ? '/api/auth/login'
                : '/api/auth/register'

            const data = isLogin
                ? {
                    email: formData.email,
                    password: formData.password
                }
                : formData

            const response = await apiFetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const result = await response.json()

            if (!response.ok) {
                toast.error(result.errors ? result.errors[0].msg : result.msg)
                return
            }

            toast.success(result.msg)

            if (isLogin) {
                login(result.user)

                if (result.user.role === 'manager') {
                    navigate('/manager-dashboard')
                }
                else {
                    navigate('/member-dashboard')
                }
            }
            else {
                navigate('/')
            }

        } catch (error) {
            console.error('Error:', error)
            toast.error('Unable to connect to server')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md">

            {/* Header */}
            <div className="mb-8 text-center">
                <div className="mb-5 flex justify-center">
                    <img
                        src={logo}
                        alt="ReportMe"
                        className="h-16 w-16 object-contain"
                    />
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-[#1b496d]">
                    {isLogin
                        ? 'Welcome back'
                        : 'Create your account'
                    }
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    {isLogin
                        ? 'Sign in to manage your weekly reports'
                        : 'Create an account to get started'
                    }
                </p>
            </div>

            {/* Form Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name */}
                    {!isLogin && (
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Full name
                            </label>

                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                                required
                            />
                        </div>
                    )}

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Email address
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                            required
                        />
                    </div>

                    {/* Password */}
                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                            placeholder="••••••••"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 pr-10 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? (
                                <FiEyeOff className="h-4 w-4 cursor-pointer" />
                            ) : (
                                <FiEye className="h-4 w-4 cursor-pointer" />
                            )}
                        </button>


                    </div>
                    {!isLogin && passwordFocused && (
                        <p className="mt-2 text-xs text-gray-500">
                            Password must contain at least 8 characters, one uppercase letter,
                            one lowercase letter, one number, and one special character.
                        </p>
                    )}


                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full cursor-pointer rounded-lg bg-[#1b496d] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1b496dab] focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? 'Please wait...'
                            : isLogin
                                ? 'Sign in'
                                : 'Create account'
                        }
                    </button>

                </form>

                {/* Bottom link */}
                <div className="mt-6 border-t border-gray-100 pt-6 text-center">

                    <p className="text-sm text-gray-500">
                        {isLogin
                            ? "Don't have an account?"
                            : 'Already have an account?'
                        }

                        <button
                            type="button"
                            onClick={() => navigate(isLogin ? '/register' : '/')}
                            className="ml-1 font-semibold text-[#1b496d] hover:text-[#1b496d]/70 cursor-pointer"
                        >
                            {isLogin ? 'Create account' : 'Sign in'}
                        </button>
                    </p>

                </div>

            </div>

            <p className="mt-6 text-center text-xs text-gray-400">
                Weekly Report Generator & Team Dashboard
            </p>

        </div>
    )
}

export default AuthForm