# Product

<!-- impeccable:product-schema 1 -->

All facts come from the ship-app brief and Jt's rules for his version of hartenjagen; the user delegated every product
and design decision for ship-app runs. Facts marked _(inferred)_ are the builder's reading of the brief.

## Platform

web

## Stack

Vite + React + TypeScript on the react-slices stack (TanStack Router, Tailwind v4 + Base UI, i18next en/nl),
frontend-only, Cloudflare Workers static assets (pinned by ship-app), plus one Worker with a Durable Object for
unsafe sharing between devices (TinyBase), per ship-app's sharing-between-devices rule.

## Users

4 or 5 friends or family around one real table, each holding their own phone as their hand of cards _(inferred: a
Dutch living room or kitchen table, an evening of cards)_. One person sets up the table; the others join by reading
four words aloud or scanning a QR code.

## Product Purpose

Play Jt's house version of hartenjagen (Dutch Hearts) without a physical deck and without anyone keeping score on
paper. It must feel like a tabletop: cards in your hand, tricks laid in the middle, a score pad everyone can see.

## Positioning

The score pad and the house rules are built in: the count up to 50, then down to 0, the all-points rule and the stok
for five players. No accounts, no app store: four words are the table.

## Operating Context

Phones held in portrait, one hand, glanced at between talking and laughing. Players look up at each other more than
at the screen; the screen must show at a glance whose turn it is, what is on the table and what you may play.

## Capabilities and Constraints

- Deck of 32 cards, 7 to ace. 4 players get 8 cards; 5 players get 6, and the 2 left over are the stok, taken by
  whoever wins the first trick.
- Points: every heart 1, the queen of spades (the black lady) 5, the jack of clubs 2: 15 a hand.
- Scores count up until someone reaches 50; from the next hand they count down, and the first to reach 0 wins
  _(inferred: the lowest score wins if several reach 0 in one hand; a tie is shared)_.
- Taking all 15 points in one hand: you score 0 and everyone else gets the 15 (subtracted while counting down)
  _(inferred from "the rule for when you get all points")_.
- Standard trick-taking _(inferred)_: follow suit if you can, no trumps, highest card of the led suit wins, the winner
  leads; the deal moves one seat each hand and the player after the dealer leads. No passing cards.
- Unsafe sharing: anyone with the words can read and change the table, including other players' hands with browser
  tools. Fine for friends who trust each other; no personal data beyond a first name.
- English and Dutch, every word of copy in both.

## Evidence on Hand

None. No testimonials or player counts; do not invent any.

## Product Principles

- Whose turn it is, and what is on the table, readable from across the table.
- Only the cards you may play can be played; the app never lets you break a rule.
- The score pad is always one tap away and shows every player.
- Honest about being unsafe: say plainly that a determined player could peek.

## Accessibility & Inclusion

Suits are told apart by shape and colour, never colour alone _(inferred)_. Works at 360px wide, keyboard playable,
respects reduced motion.
