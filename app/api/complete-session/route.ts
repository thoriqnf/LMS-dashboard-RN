import { NextRequest, NextResponse } from 'next/server'

const COMPLETION_PASSWORD = 'bni-332'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { day, session, password } = body

    // Validate required fields
    if (!day || !session || !password) {
      return NextResponse.json(
        { error: 'Missing required fields: day, session, password' },
        { status: 400 }
      )
    }

    // Verify password
    if (password !== COMPLETION_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Password is correct, return success
    return NextResponse.json({
      success: true,
      message: 'Session completed successfully',
      completedSession: { day, session }
    })

  } catch (error) {
    console.error('Error completing session:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
