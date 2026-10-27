> [!WARNING]
> **🤖 One-prompt app — please ignore the code.**
> This entire project — idea, design, code, GitHub repo, and Cloudflare deployment — was generated and shipped by [Claude Code](https://claude.com/claude-code) from a **single prompt**, in a **single run**. No human wrote or reviewed this code. It is not an example of how I write software; judge the idea, not the implementation.
>
> **The prompt:** "Create the Dutch or my version of hearts / hartenjagen. It must feel like a tabletop experience. Rules: the deck goes from 7 - A. All hearts are one point, the black lady is 5, and the clover jack is 2. First the scores go up till someone reaches 50 points. Then the scoring becomes negative and the person that reaches 0 first wins. 5 players work too with a "stok" on the first round of 2 cards for the player who "wins" the round. Also do show the scoring for all players and don't forget the rule for when you get all points in a single round."

# Hartenjagen

**Live:** https://hartenjagen.graaf.dev

Dutch Hearts for 4 or 5 friends at one real table, each holding their hand on their own phone. One person sets up the
table and gets four words; the others type them or scan the QR code to pull up a chair. The phone looks like a 1970s
kitchen table: oilcloth, real playing cards, coffee saucers with everyone's name, and the score pencilled on a
notepad. In English and Dutch.

## The rules

- **The deck:** 32 cards, 7 to ace. With 4 players everyone gets 8 cards. With 5, everyone gets 6 and the 2 left
  over lie face down as **the stok**; whoever wins the first trick takes it, points and all.
- **Points:** every heart is 1, the queen of spades (the black lady) is 5, the jack of clubs (klaverboer) is 2:
  15 points a hand.
- **Counting up, then down:** scores go up until someone reaches 50. From the next hand on, points are taken off,
  and the first to reach 0 wins.
- **All 15 in one hand:** you score nothing that hand and everyone else gets the 15 (taken off while counting down).
- **The score pad** shows every player's total and what each hand did to it.

Assumptions, where the prompt left it open:

- Standard trick-taking: follow suit if you can, no trumps, the highest card of the suit led takes the trick, and the
  winner leads the next one. Hearts may be led any time. No passing cards.
- The deal moves one seat each hand; the player after the dealer leads the first trick.
- Counting down starts with the hand after someone reaches 50 (the hand that crosses 50 still counts up).
- If more than one player reaches 0 in the same hand, the lowest score wins; a tie is a shared win.
- Players who join after a game started watch until the next game; a table seats at most 5.

## Sharing between devices (unsafe)

The table is kept in sync by a small Cloudflare Worker with one Durable Object per table ([TinyBase](https://tinybase.org)
on both ends). It is **unsafe on purpose**, which is fine for a card game among friends and nothing else:

- **Anyone with the four words can see and change the game.** There are no accounts. The app replays every play by
  the rules and skips illegal ones, but it can't stop someone rewriting the table.
- **Hands are in the shared space too**, so a player who opens the browser's developer tools could peek at other
  hands. Play with people you trust.
- **The server can read everything in it.** Tables are stored as plain data in the Durable Object.
- **Guessing a code is hard, not impossible.** Four words from a list of 904 is about 39 bits, and nothing limits how
  fast someone tries.
- **No backups.** A table someone breaks is gone. The only personal data is the first name each player types.

The words never leave the phone: the server only sees a SHA-256 hash of them.

## Running it

```bash
npm install
npm run dev                          # the site only, no syncing
npm run build && npx wrangler dev    # the site and the sync Worker; open localhost, 127.0.0.1, a.localhost and b.localhost as four phones
npm run deploy                       # build and deploy to Cloudflare
```

Pushes to `main` deploy automatically through GitHub Actions.
