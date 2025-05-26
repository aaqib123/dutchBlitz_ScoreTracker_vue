// export interface Player {
//   name: string
//   id: string
//   score: number
//   isHost?: boolean
//   isReady?: boolean
// }



// export interface GameData {
//   isGameStarted: boolean
//   isGameOver: boolean
//   isSolo: boolean,
//   players: Player[]
//   rounds: Round[]
//   scoreLimit: number
// }

// export interface RoundScore {
//   dutch: number
//   blitz: number
//   total: number
// }

// export interface Round {
//   [playerId: string]: RoundScore
// }


export interface Player {
  name: string
  id: string
  score: number
  isHost?: boolean
  isReady?: boolean
}

export interface RoundScore {
  dutch: number
  blitz: number
  total: number
}

export interface Round {
  id: string
  createdAt: number
  scores: {
    playerId: string
    score: RoundScore
  }[]
}

export interface GameData {
  gameId: string | null
  isGameStarted: boolean
  isGameOver: boolean
  isSolo: boolean
  players: Player[]
  rounds: Round[]
  scoreLimit: number,
  currentPlayerId: string
  hostId: string | null
}
