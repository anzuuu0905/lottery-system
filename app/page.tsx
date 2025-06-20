'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'

interface Stats {
  participants: number
  winners: number
  winnersList: WinnerData[]
}

interface WinnerData {
  timestamp: string
  participantNumber: number
  winRate: number
}

export default function Home() {
  const [stats, setStats] = useState<Stats>({ participants: 0, winners: 0, winnersList: [] })
  const [currentWinRate, setCurrentWinRate] = useState(1.0)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLotteryRunning, setIsLotteryRunning] = useState(false)
  const [result, setResult] = useState<'win' | 'lose' | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [resultTimestamp, setResultTimestamp] = useState<Date | null>(null)

  const MIN_WIN_RATE = 0.05

  useEffect(() => {
    loadStats()
    checkIfAlreadyPlayed()
  }, [])

  useEffect(() => {
    updateWinRate()
  }, [stats])

  const loadStats = async () => {
    try {
      const response = await fetch('/api/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('統計データの取得に失敗:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateWinRate = () => {
    if (stats.participants === 0) {
      setCurrentWinRate(1.0)
    } else {
      const decayFactor = Math.pow(0.5, stats.participants)
      setCurrentWinRate(Math.max(MIN_WIN_RATE, decayFactor))
    }
  }

  const checkIfAlreadyPlayed = () => {
    const lastPlay = localStorage.getItem('lastLotteryPlay')
    const lastResult = localStorage.getItem('lastLotteryResult')
    
    if (lastPlay && lastResult) {
      setHasPlayed(true)
      setResult(lastResult as 'win' | 'lose')
      setShowResult(true)
      setResultTimestamp(new Date(lastPlay))
    }
  }

  const startLottery = async () => {
    if (hasPlayed) {
      alert('既に抽選済みです。お一人様1回限りです！')
      return
    }

    setIsLotteryRunning(true)
    
    setTimeout(async () => {
      const isWin = Math.random() < currentWinRate
      const now = new Date()
      
      try {
        const response = await fetch('/api/lottery', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            isWin,
            timestamp: now.toISOString(),
            winRate: currentWinRate
          })
        })

        if (response.ok) {
          const updatedStats = await response.json()
          setStats(updatedStats)
        }
      } catch (error) {
        console.error('抽選結果の保存に失敗:', error)
      }

      localStorage.setItem('lastLotteryPlay', now.toISOString())
      localStorage.setItem('lastLotteryResult', isWin ? 'win' : 'lose')
      
      setResult(isWin ? 'win' : 'lose')
      setResultTimestamp(now)
      setHasPlayed(true)
      setIsLotteryRunning(false)
      setShowResult(true)

      if (isWin) {
        createConfetti()
      }
    }, 2000)
  }

  const createConfetti = () => {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe']
    const container = document.querySelector('.container')
    
    if (!container) return

    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div')
        confetti.className = 'confetti'
        confetti.style.position = 'absolute'
        confetti.style.left = Math.random() * 80 + 10 + '%'
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.width = Math.random() * 8 + 4 + 'px'
        confetti.style.height = confetti.style.width
        confetti.style.animation = `confettiFall ${Math.random() * 1.5 + 1.5}s ease-in-out forwards`
        container.appendChild(confetti)
        
        setTimeout(() => confetti.remove(), 3500)
      }, i * 20)
    }
  }

  const resetLottery = () => {
    if (confirm('履歴をリセットしますか？（デバッグ用）')) {
      localStorage.removeItem('lastLotteryPlay')
      localStorage.removeItem('lastLotteryResult')
      setHasPlayed(false)
      setResult(null)
      setShowResult(false)
    }
  }

  const formatTimestamp = (date: Date) => {
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className={styles.body}>
      <div className={`${styles.container} container`}>
        {hasPlayed && (
          <button className={styles.resetButton} onClick={resetLottery}>
            リセット
          </button>
        )}
        
        <h1 className={styles.title}>🎯 ツール制作抽選</h1>
        <p className={styles.subtitle}>
          参加者が増えるほど当選確率が下がります<br />
          当選したらスクショを撮って送ってください
        </p>

        <div className={styles.stats}>
          {isLoading ? (
            <div className={styles.loading}>データ読み込み中...</div>
          ) : (
            <>
              <div className={styles.statsItem}>総参加者数: {stats.participants}人</div>
              <div className={styles.statsItem}>当選者数: {stats.winners}人</div>
              <div className={styles.statsItem}>
                現在の当選確率: {Math.round(currentWinRate * 100)}%
              </div>
            </>
          )}
        </div>

        {!hasPlayed && (
          <button
            className={styles.lotteryButton}
            onClick={startLottery}
            disabled={isLoading || isLotteryRunning}
          >
            {isLoading ? '読み込み中...' : isLotteryRunning ? '抽選中...' : '抽選する'}
          </button>
        )}

        <div className={styles.resultContainer}>
          {showResult && result && (
            <div className={`${styles.result} ${result === 'win' ? styles.win : ''}`}>
              {result === 'win' ? (
                <div>
                  <div className={styles.winText}>当選！</div>
                  <p className={`${styles.message} ${styles.winMessage}`}>
                    おめでとうございます！🎉<br />
                    このスクショを送ってください
                  </p>
                </div>
              ) : (
                <div>
                  <div className={styles.loseText}>はずれ</div>
                  <p className={styles.message}>
                    残念でした...<br />
                    また次回チャレンジしてください！
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {resultTimestamp && (
          <div className={styles.timestamp}>
            {formatTimestamp(resultTimestamp)}
          </div>
        )}
      </div>
    </div>
  )
}