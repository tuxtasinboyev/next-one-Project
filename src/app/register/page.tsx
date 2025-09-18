'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Region {
    id: number;
    name: string;
}

interface District {
    id: number;
    name: string;
}

interface Village {
    id: number;
    name: string;
}

export default function Register() {
    const router = useRouter();

    const [regions, setRegions] = useState<Region[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [villages, setVillages] = useState<Village[]>([]);

    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedVillage, setSelectedVillage] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Viloyatlarni olish
    useEffect(() => {
        axios.get('/api/regions').then(res => setRegions(res.data));
    }, []);

    // Tumanlarni olish
    useEffect(() => {
        if (!selectedRegion) return setDistricts([]);
        axios
            .get(`/api/districts?regionId=${selectedRegion}`)
            .then(res => setDistricts(res.data));
        setSelectedDistrict('');
        setSelectedVillage('');
        setVillages([]);
    }, [selectedRegion]);

    // Qishloqlarni olish
    useEffect(() => {
        if (!selectedDistrict) return setVillages([]);
        axios
            .get(`/api/villages?districtId=${selectedDistrict}`)
            .then(res => setVillages(res.data));
        setSelectedVillage('');
    }, [selectedDistrict]);

    const handleRegister = async () => {
        if (!name || !email || !password || !selectedRegion || !selectedDistrict || !selectedVillage) {
            return alert('Iltimos, barcha maydonlarni to&apos;ldiring');
        }

        try {
            const res = await axios.post('/api/auth/register', {
                name,
                email,
                password,
                regionId: selectedRegion,
                districtId: selectedDistrict,
                villageId: selectedVillage,
            });

            alert(res.data.message);
            const { token, user } = res.data;

            localStorage.setItem('token', token);
            router.push('/');
        } catch (err: any) {
            console.log(err);
            alert(err.response?.data?.message || 'Xatolik yuz berdi');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-6">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md space-y-4">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Ro&apos;yxatdan o&apos;tish</h1>

                {/* Inputlar */}
                <input
                    type="text"
                    placeholder="Ism"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
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

                {/* Select chain */}
                <select
                    value={selectedRegion}
                    onChange={e => setSelectedRegion(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    <option value="">Viloyatni tanlang</option>
                    {regions.map(r => (
                        <option key={r.id} value={r.id}>
                            {r.name}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedDistrict}
                    onChange={e => setSelectedDistrict(e.target.value)}
                    disabled={!selectedRegion}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-100"
                >
                    <option value="">Tumanni tanlang</option>
                    {districts.map(d => (
                        <option key={d.id} value={d.id}>
                            {d.name}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedVillage}
                    onChange={e => setSelectedVillage(e.target.value)}
                    disabled={!selectedDistrict}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-100"
                >
                    <option value="">Qishloqni tanlang</option>
                    {villages.map(v => (
                        <option key={v.id} value={v.id}>
                            {v.name}
                        </option>
                    ))}
                </select>

                {/* Submit button */}
                <button
                    onClick={handleRegister}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition"
                >
                    Ro&apos;yxatdan o&apos;tish
                </button>

                {/* Login link */}
                <div className="text-center mt-4">
                    <Link
                        href="/login"
                        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 inline-block"
                    >
                        Kirish
                    </Link>
                </div>
            </div>
        </div>
    );
}
