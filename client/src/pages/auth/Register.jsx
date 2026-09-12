import AuthForm from '@/components/auth/AuthForm'

const Register = () => {
    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
            <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
                <AuthForm mode="register" />
            </div>
        </main>
    )
}

export default Register
