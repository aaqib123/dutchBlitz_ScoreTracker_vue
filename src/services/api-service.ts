// services/gameService.ts
import type { Player, Round } from '../stores/Solo.utils'

const BASE_URL = 'https://fake-api.com'

export async function addPlayer(gameId: string, player: Player) {
  const response = await fetch(`${BASE_URL}/add-player/${gameId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(player),
  })
  return await response.json()
}

export async function removePlayer(gameId: string, playerId: string) {
  const response = await fetch(`${BASE_URL}/remove-player/${gameId}/${playerId}`, {
    method: 'DELETE',
  })
  return await response.json()
}

export async function updatePlayer(gameId: string, player: Player) {
  const response = await fetch(`${BASE_URL}/update-player/${gameId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(player),
  })
  return await response.json()
}

export async function getAllPlayers(gameId: string) {
  const response = await fetch(`${BASE_URL}/players/${gameId}`)
  return await response.json()
}

export async function createGameRoom(players: Player[], scoreLimit: number) {
  const response = await fetch(`${BASE_URL}/create-room`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ players, scoreLimit }),
  })
  return await response.json()
}

export async function joinGameRoom(gameId: string) {
  const response = await fetch(`${BASE_URL}/join-room/${gameId}`)
  return await response.json()
}

export async function saveRound(gameId: string, round: Round, players: Player[]) {
  await fetch(`${BASE_URL}/save-round`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gameId, round, players }),
  })
}

export async function deleteRound(gameId: string, roundId: string) {
  await fetch(`${BASE_URL}/delete-round`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gameId, roundId }),
  })
}
