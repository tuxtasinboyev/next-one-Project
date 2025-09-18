import prisma from '@/lib/prisma'

export async function GET() {
    const regions = await prisma.region.findMany()
    return Response.json(regions)
}
