import prisma from '@/lib/prisma';
import { generateToken } from '@/utils/helper';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { email, password } = body

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (!existingUser) {
        return NextResponse.json({ message: 'this email doesn\'t exist' })
    }

    const checkingPass = await bcrypt.compare(password, existingUser.password)
    if (!checkingPass) {
        return NextResponse.json({ message: 'email or password invalid' })
    }

    const token = generateToken(existingUser.id, existingUser.email)
    const { password: _, ...safeUser } = existingUser

    return NextResponse.json({ message: 'successfully login', safeUser, token })
}