import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET_KEY!

export function generateToken(userId: number, email: string) {
    return jwt.sign(
        { userId, email },
        SECRET,
        { expiresIn: '7d' }
    )
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, SECRET)
    } catch (err) {
        return null
    }
}
