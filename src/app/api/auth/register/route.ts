import prisma from '@/lib/prisma'
import { generateToken } from '@/utils/helper'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { name, email, password, regionId, districtId, villageId } = body

    if (!name || !email || !password || !regionId || !districtId || !villageId) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
        return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            regionId: Number(regionId),
            districtId: Number(districtId),
            villageId: Number(villageId),
        },
    })
    const token = generateToken(user.id, user.email)
    const { password: _, ...safeUser } = user
    return NextResponse.json({ message: 'User created', safeUser, token }, { status: 201 })
}
