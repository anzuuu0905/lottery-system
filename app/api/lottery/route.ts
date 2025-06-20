import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import { join } from 'path'

const dataPath = join(process.cwd(), 'data', 'lottery.json')

export async function POST(request: NextRequest) {
  try {
    const { isWin, timestamp, winRate } = await request.json()
    
    // 現在のデータを読み込み
    let data
    try {
      const fileContents = await fs.readFile(dataPath, 'utf8')
      data = JSON.parse(fileContents)
    } catch (error) {
      // ファイルが存在しない場合は初期データ
      data = { participants: 0, winners: 0, winnersList: [] }
    }
    
    // 新しい統計を計算
    const newParticipants = data.participants + 1
    const newWinners = data.winners + (isWin ? 1 : 0)
    
    // データを更新
    const updatedData = {
      participants: newParticipants,
      winners: newWinners,
      winnersList: data.winnersList || []
    }
    
    // 当選者の場合は詳細データも記録
    if (isWin) {
      const winnerData = {
        timestamp,
        participantNumber: newParticipants,
        winRate
      }
      updatedData.winnersList.push(winnerData)
    }
    
    // ファイルに保存
    await fs.writeFile(dataPath, JSON.stringify(updatedData, null, 2))
    
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