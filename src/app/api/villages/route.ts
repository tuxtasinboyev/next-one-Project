import prisma from '@/lib/prisma'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const districtId = searchParams.get('districtId')

    if (!districtId) return Response.json({ error: 'districtId kerak' }, { status: 400 })

    const villages = await prisma.village.findMany({
        where: { districtId: Number(districtId) }
    })

    return Response.json(villages)
}
