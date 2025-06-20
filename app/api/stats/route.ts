import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import { join } from 'path'

const dataPath = join(process.cwd(), 'data', 'lottery.json')

export async function GET() {
  try {
    const fileContents = await fs.readFile(dataPath, 'utf8')
    const data = JSON.parse(fileContents)
    
    return NextResponse.json({
      participants: data.participants || 0,
      winners: data.winners || 0
    })
  } catch (error) {
    console.error('Stats fetch error:', error)
    return NextResponse.json(
      { participants: 0, winners: 0 },
      { status: 500 }
    )
  }
}