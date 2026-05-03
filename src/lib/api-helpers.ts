import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth'
import { AUTHORIZED_USER } from './constants'

/**
 * Check if the current user is authorized
 * @returns {{ authorized: false, response: NextResponse } | { authorized: true, session: Session }}
 * A discriminated union - when authorized is false, response property is present; when true, session property is present
 */
export async function checkAuth() {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.name !== AUTHORIZED_USER) {
        return {
            authorized: false,
            response: new NextResponse('Unauthorized', { status: 401 }),
        }
    }

    return { authorized: true, session }
}

/**
 * Create a standardized error response
 */
export function createErrorResponse(
    message: string,
    error?: Error,
    status: number = 500
) {
    console.error(message, error)
    return new NextResponse(
        JSON.stringify({
            error: message,
            details: error?.message,
        }),
        {
            status,
            headers: { 'Content-Type': 'application/json' },
        }
    )
}

/**
 * Create a not found response
 */
export function createNotFoundResponse(message: string = 'Not found') {
    return new NextResponse(message, { status: 404 })
}
