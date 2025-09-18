'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = async () => {
        if (!email || !password) {
            return alert('Iltimos, email va parolni kiriting')
        }

        try {
            const res = await axios.post('/api/auth/login', { email, password })
            const { token, safeUser } = res.data

            localStorage.setItem('token', token)

            alert('Muvaffaqiyatli login!')
            router.push('/')
        } catch (err: any) {
            alert(err.response?.data?.message || 'Xatolik yuz berdi')
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-6">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md space-y-4">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Kirish</h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <input
                    type="password"
                    placeholder="Parol"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition"
                >
                    Kirish
                </button>
                <div className="text-center mt-4">
                    <Link
                        href="/register"
                        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
                    >
                        Ro'yxatdan o'tish
                    </Link>
                </div>
            </div>
        </div>
    )
}