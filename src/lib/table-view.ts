import { sortHand } from './cards'
import { dealerOf, firstLeaderOf, type Deal, type PlayerCount } from './deal'
import { playableCards, playHand, type HandState } from './hand'
import { MIN_PLAYERS, playerCountOf, seatsFor, type Player } from './players'
import { scoreHands, type ScorePad } from './scoring'
import type { SharedTable } from './shared-table'

export type Seat = { seat: number; id: string; name: string; isMe: boolean }

export type TablePhase = 'waiting' | 'dealing' | 'playing' | 'finished'

export type TableView = {
  phase: TablePhase
  game: number
  /** Everyone who sat down, in any order; the next game seats from this. */
  players: Player[]
  /** Everyone at the table in seat order; while waiting, the order they would sit in. */
  seats: Seat[]
  /** Joined after the game started, or after the table was full. They play from the next game. */
  watchers: Player[]
  mySeat: number | null
  /** The hand being played, or the one about to be dealt, counting from 1. */
  handNumber: number
  hand: HandState | null
  deal: Deal | null
  myCards: string[]
  playable: string[]
  turn: Seat | null
  dealer: Seat | null
  isMyTurn: boolean
  isMyDeal: boolean
  canStart: boolean
  score: ScorePad
  winners: Seat[]
}

/** Everything a phone shows about the table, from the shared space and who holds this phone. */
export function viewTable(table: SharedTable, myId: string): TableView {
  const playersById = new Map(table.players.map((player) => [player.id, player]))
  const seatIds = table.game === 0 ? seatsFor(table.players) : table.seats.filter((id) => playersById.has(id))
  const seats = seatIds.map((id, seat) => ({ seat, id, name: playersById.get(id)?.name ?? '', isMe: id === myId }))
  const seated = new Set(seatIds)
  const mySeat = seatIds.indexOf(myId)
  const count = playerCountOf(seatIds)
  const base = {
    game: table.game,
    players: table.players,
    seats,
    watchers: table.players.filter((player) => !seated.has(player.id)),
    mySeat: mySeat === -1 ? null : mySeat,
  }

  if (table.game === 0 || count === null) {
    return {
      ...base,
      ...nothingDealt(1, emptyScore(seatIds.length)),
      phase: 'waiting',
      canStart: seatIds.length >= MIN_PLAYERS,
    }
  }

  const { finished, current } = replayHands(table, count)
  const score = scoreHands(
    finished.map((state) => state.points),
    count,
  )
  const winners = score.winners.map((seat) => seats[seat])
  if (winners.length > 0) {
    return { ...base, ...nothingDealt(finished.length, score), phase: 'finished', winners }
  }

  const handNumber = finished.length + 1
  const dealer = seats[dealerOf(handNumber, count)]
  if (!current) {
    return { ...base, ...nothingDealt(handNumber, score), phase: 'dealing', dealer, isMyDeal: dealer.isMe }
  }

  const myCards = mySeat === -1 ? [] : sortHand(current.state.holding[mySeat])
  const turn = current.state.turn === null ? null : seats[current.state.turn]
  return {
    ...base,
    phase: 'playing',
    handNumber,
    hand: current.state,
    deal: current.deal,
    myCards,
    playable: turn?.isMe ? playableCards(myCards, current.state.currentTrick) : [],
    turn,
    dealer,
    isMyTurn: turn?.isMe ?? false,
    isMyDeal: false,
    canStart: false,
    score,
    winners: [],
  }
}

/** Plays every dealt hand in order; the last one is current while cards are still being played. */
function replayHands(table: SharedTable, count: PlayerCount) {
  const finished: HandState[] = []
  for (let hand = 1; table.deals.has(hand); hand++) {
    const deal = table.deals.get(hand)
    if (!deal) break
    const state = playHand(deal, firstLeaderOf(hand, count), table.plays.get(hand) ?? [])
    if (state.turn !== null) return { finished, current: { deal, state } }
    finished.push(state)
    if (
      scoreHands(
        finished.map((done) => done.points),
        count,
      ).winners.length > 0
    )
      break
  }
  return { finished, current: null }
}

function nothingDealt(handNumber: number, score: ScorePad) {
  return {
    handNumber,
    hand: null,
    deal: null,
    myCards: [],
    playable: [],
    turn: null,
    dealer: null,
    isMyTurn: false,
    isMyDeal: false,
    canStart: false,
    score,
    winners: [],
  }
}

function emptyScore(players: number): ScorePad {
  return scoreHands([], players)
}
