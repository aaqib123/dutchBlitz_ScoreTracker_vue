import { acceptHMRUpdate, defineStore } from 'pinia'
import type { GameData, Round } from './Solo.utils'
import { getGuid } from '@/utils'

export const useSoloStore = defineStore('soloStore', {
  state: (): GameData => ({
    isGameStarted: false,
    isGameOver: false,
    players: [
      { name: 'Player 1', id: getGuid(), score: 0 },
      { name: 'Player 2', id: getGuid(), score: 0 },
    ],
    rounds: [],
    scoreLimit: 75,
  }),
  getters: {
    getPlayerCount: (state) => {
      return state.players.length
    },
    didWin: (state) => {
      return state.players.some((p) => p.score >= state.scoreLimit)
    },
    getPlayerScoresByScore: (state) => {
      return state.players
        .map((player) => ({
          name: player.name,
          score: player.score,
        }))
        .sort((a, b) => b.score - a.score)
    },
  },
  actions: {
    addPlayer(name: string) {
      const newPlayer = {
        name: name,
        id: getGuid(),
        score: 0,
      }
      this.players.push(newPlayer)
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
    },
    addRound(round: Round) {
      this.rounds.push(round)

      // Update player scores
      Object.entries(round).forEach(([name, scoreData]) => {
        const player = this.players.find((p) => p.name === name)
        if (player) {
          player.score += scoreData.total
        }
      })

      // Check if anyone reached the score limit
      if (this.players.some((p) => p.score >= this.scoreLimit)) {
        this.isGameOver = true
      }
    },
    deleteRound(roundIndex: number) {
      console.log('roundIndex: ', roundIndex)
      // Update player scores
      Object.entries(this.rounds[roundIndex]).forEach(([name, scoreData]) => {
        const player = this.players.find((p) => p.name === name)
        if (player) {
          player.score -= scoreData.total
        }
      })
      if (roundIndex >= 0 && roundIndex < this.rounds.length) {
        this.rounds.splice(roundIndex, 1)
      }
    },
  },
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSoloStore, import.meta.hot))
}
