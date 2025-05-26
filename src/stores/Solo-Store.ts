import { acceptHMRUpdate, defineStore } from 'pinia'
import type { GameData, Round, RoundScore, Player } from '@/stores/Solo.utils'
import { getGuid } from '@/utils'
import {
  createGameRoom,
  joinGameRoom,
  saveRound,
  deleteRound,
  addPlayer,
  updatePlayer,
  removePlayer,
} from '@/services/api-service'

export const useSoloStore = defineStore('soloStore', {
  state: (): GameData => ({
    gameId: null,
    isGameStarted: false,
    isGameOver: false,
    isSolo: true,
    players: [],
    rounds: [],
    scoreLimit: 75,
    currentPlayerId: '',
    hostId: null,
  }),
  getters: {
    getPlayerCount: (state) => state.players.length,
    hasWinner: (state) => state.players.some((p) => p.score >= state.scoreLimit),
    getPlayerScoresByScore: (state) =>
      [...state.players]
        .map(({ id, name, score }) => ({ id, name, score }))
        .sort((a, b) => b.score - a.score),
  },
  actions: {
    initHostPlayer(name: string) {
      this.isSolo = false;
      const newPlayer: Player = {
        id: getGuid(),
        name,
        isReady: true,
        score: 0,
        isHost: false,
      }
      this.players = [newPlayer]
      this.hostId = newPlayer.id
      this.currentPlayerId = newPlayer.id
    },
    async addPlayer(name: string) {
      const newPlayer: Player = { name, id: getGuid(), score: 0, isReady: true, isHost: false }
      this.players.push(newPlayer)
      if (!this.isSolo && this.gameId) {
        try {
          await addPlayer(this.gameId, newPlayer)
        } catch (error) {
          console.error('Failed to sync added player:', error)
        }
      }
    },
    async updatePlayerName(id: string, name: string) {
      const player = this.players.find((p) => p.id === id)
      if (player) {
        player.name = name
        if (!this.isSolo && this.gameId) {
          try {
            await updatePlayer(this.gameId, player)
          } catch (error) {
            console.error('Failed to sync updated player name:', error)
          }
        }
      }
    },
    async removePlayer(id: string) {
      this.players = this.players.filter((p) => p.id !== id)
      if (!this.isSolo && this.gameId) {
        try {
          await removePlayer(this.gameId, id)
        } catch (error) {
          console.error('Failed to sync removed player:', error)
        }
      }
    },
    togglePlayerReady(id: string) {
      const player = this.players.find(p => p.id === id)
      if (player) {
        player.isReady = !player.isReady
      }
    },

    startGame() {
      this.isGameStarted = true
      this.isGameOver = false
    },
    endGame() {
      this.isGameOver = true
      this.isGameStarted = false
      this.resetGame()
    },
    resetGame() {
      this.rounds = []
      this.players.forEach((p) => (p.score = 0))
      this.isGameStarted = false
      this.isGameOver = false
    },
    clearStore() {
      this.gameId = null
      this.players = []
      this.rounds = []
      this.scoreLimit = 75
      this.isSolo = true
      this.isGameStarted = false
      this.isGameOver = false
      this.currentPlayerId = ''
      this.hostId = null
    },
    async createGameRoom() {
      try {
        const data = await createGameRoom(this.players, this.scoreLimit)
        this.gameId = data.gameId
        this.isSolo = false
      } catch (error) {
        console.error('Failed to create game room:', error)
      }
    },
    async joinGameRoom(gameId: string) {
      try {
        const data = await joinGameRoom(gameId)
        this.gameId = gameId
        this.players = data.players
        this.rounds = data.rounds
        this.scoreLimit = data.scoreLimit
        this.isSolo = false
      } catch (error) {
        console.error('Failed to join game room:', error)
      }
    },
    async addRound(scoreEntries: { playerId: string; score: RoundScore }[]) {
      const round: Round = {
        id: getGuid(),
        createdAt: Date.now(),
        scores: scoreEntries,
      }
      this.rounds.push(round)

      scoreEntries.forEach(({ playerId, score }) => {
        const player = this.players.find((p) => p.id === playerId)
        if (player) player.score += score.total
      })

      if (this.players.some((p) => p.score >= this.scoreLimit)) {
        this.isGameOver = true
      }

      if (!this.isSolo && this.gameId) {
        try {
          await saveRound(this.gameId, round, this.players)
        } catch (error) {
          console.error('Failed to sync round to server:', error)
        }
      }
    },
    async deleteRound(roundId?: string) {
      if (!roundId) {
        this.rounds?.pop()
        return
      }

      const index = this.rounds.findIndex((r) => r.id === roundId)
      if (index !== -1) {
        const round = this.rounds[index]
        round.scores.forEach(({ playerId, score }) => {
          const player = this.players.find((p) => p.id === playerId)
          if (player) player.score -= score.total
        })
        this.rounds.splice(index, 1)

        if (!this.isSolo && this.gameId) {
          try {
            await deleteRound(this.gameId, roundId)
          } catch (error) {
            console.error('Failed to delete round from server:', error)
          }
        }
      }
    },
    leaveGameRoom() {
      this.gameId = null
      this.players = []
      this.rounds = []
      this.scoreLimit = 75
      this.isSolo = true
      this.isGameStarted = false
      this.isGameOver = false
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSoloStore, import.meta.hot))
}


// import { acceptHMRUpdate, defineStore } from 'pinia'
// import type { GameData, Round } from './Solo.utils'
// import { getGuid } from '@/utils'

// export const useSoloStore = defineStore('soloStore', {
//   state: (): GameData => ({
//     isGameStarted: false,
//     isGameOver: false,
//     isSolo: true,
//     players: [],
//     rounds: [],
//     scoreLimit: 75,
//   }),
//   getters: {
//     getPlayerCount: (state) => {
//       return state.players.length
//     },
//     didWin: (state) => {
//       return state.players.some((p) => p.score >= state.scoreLimit)
//     },
//     getPlayerScoresByScore: (state) => {
//       return state.players
//         .map((player) => ({
//           name: player.name,
//           score: player.score,
//         }))
//         .sort((a, b) => b.score - a.score)
//     },
//   },
//   actions: {
//     addPlayer(name: string) {
//       const newPlayer = {
//         name: name,
//         id: getGuid(),
//         score: 0,
//       }
//       this.players.push(newPlayer)
//     },
//     updatePlayerName(id: string, name: string) {
//       const player = this.players.find((p) => p.id === id)
//       if (player) {
//         player.name = name
//       }
//     },
//     removePlayer(id: string) {
//       const playerIndex = this.players.findIndex((p) => p.id === id)
//       if (playerIndex !== -1) {
//         this.players.splice(playerIndex, 1)
//       }
//     },
//     startGame() {
//       this.isGameStarted = true
//       this.isGameOver = false
//     },
//     endGame() {
//       this.isGameOver = true
//       this.isGameStarted = false
//       this.resetGame()
//     },
//     resetGame() {
//       this.rounds = []
//       this.players.forEach((p) => (p.score = 0))
//     },
//     addRound(round: Round) {
//       this.rounds.push(round)

//       // Update player scores
//       Object.entries(round).forEach(([name, scoreData]) => {
//         const player = this.players.find((p) => p.name === name)
//         if (player) {
//           player.score += scoreData.total
//         }
//       })

//       // Check if anyone reached the score limit
//       if (this.players.some((p) => p.score >= this.scoreLimit)) {
//         this.isGameOver = true
//       }
//     },
//     deleteRound(roundIndex: number) {
//       console.log('roundIndex: ', roundIndex)
//       // Update player scores
//       Object.entries(this.rounds[roundIndex]).forEach(([name, scoreData]) => {
//         const player = this.players.find((p) => p.name === name)
//         if (player) {
//           player.score -= scoreData.total
//         }
//       })
//       if (roundIndex >= 0 && roundIndex < this.rounds.length) {
//         this.rounds.splice(roundIndex, 1)
//       }
//     },
//   },
// })


// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useSoloStore, import.meta.hot))
// }
