import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const participants = await kv.get('lottery:participants') || 0
    const winners = await kv.get('lottery:winners') || 0
    const winnersList = await kv.get('lottery:winners_list') || []
    
    return NextResponse.json({
      participants: Number(participants),
      winners: Number(winners),
      winnersList: Array.isArray(winnersList) ? winnersList : []
    })
  } catch (error) {
    console.error('Stats fetch error:', error)
    return NextResponse.json(
      { participants: 0, winners: 0, winnersList: [] },
      { status: 500 }
    )
  }
}