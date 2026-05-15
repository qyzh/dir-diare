import { NextRequest } from 'next/server'
import { getDb } from '@/lib/db-helpers'

export async function POST(
    _req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params
    const db = await getDb()
    const result = await db.collection('dirpost').findOneAndUpdate(
        { slug },
        { $inc: { kudos: 1 } },
        { returnDocument: 'after', upsert: false }
    )
    if (!result) {
        return Response.json({ error: 'not found' }, { status: 404 })
    }
    return Response.json({ kudos: (result as any).kudos ?? 1 })
}
