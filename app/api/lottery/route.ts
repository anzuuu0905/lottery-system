import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { isWin, timestamp, winRate } = await request.json()
    
    // 現在の統計を取得
    const currentParticipants = Number(await kv.get('lottery:participants') || 0)
    const currentWinners = Number(await kv.get('lottery:winners') || 0)
    const currentWinnersList = await kv.get('lottery:winners_list') || []
    
    // 新しい統計を計算
    const newParticipants = currentParticipants + 1
    const newWinners = currentWinners + (isWin ? 1 : 0)
    
    // 統計を更新
    await kv.set('lottery:participants', newParticipants)
    await kv.set('lottery:winners', newWinners)
    
    // 当選者の場合は詳細データも記録
    if (isWin) {
      const winnerData = {
        timestamp,
        participantNumber: newParticipants,
        winRate
      }
      
      // 当選者リストを更新
      const updatedWinnersList = Array.isArray(currentWinnersList) ? 
        [...currentWinnersList, winnerData] : [winnerData]
      await kv.set('lottery:winners_list', updatedWinnersList)
    }
    
    return NextResponse.json({
      participants: newParticipants,
      winners: newWinners
    })
    
  } catch (error) {
    console.error('Lottery API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}