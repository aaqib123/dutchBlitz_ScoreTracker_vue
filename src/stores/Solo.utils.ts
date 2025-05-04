export interface Player {
  name: string
  id: string
  score: number
}

export interface Round {
  [playerName: string]: RoundScore
}

export interface RoundScore {
  dutch: number
  blitz: number
  total: number
}

export interface GameData {
  isGameStarted: boolean
  isGameOver: boolean
  players: Player[]
  rounds: Round[]
  scoreLimit: number
}
