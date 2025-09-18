import prisma from '@/lib/prisma'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const regionId = searchParams.get('regionId')

    if (!regionId) return Response.json({ error: 'regionId kerak' }, { status: 400 })

    const districts = await prisma.district.findMany({
        where: { regionId: Number(regionId) }
    })

    return Response.json(districts)
}
