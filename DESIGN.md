---
name: Hartenjagen
description: Dutch Hearts at a 1970s kitchen table, each phone a hand of cards.
colors:
  oilcloth: '#d9662b'
  oilcloth-deep: '#b9501c'
  petal-brown: '#5a3420'
  petal-gold: '#f2c14e'
  petal-ember: '#b8451a'
  petal-cream: '#f3dcb8'
  leaf: '#7f8f2e'
  dot: '#f6e6c8'
  band: '#3b2418'
  band-ink: '#fbefd9'
  band-ink-soft: '#e2c9a6'
  card: '#fffdf8'
  card-edge: '#b9ab97'
  card-ink: '#1e1a17'
  card-red: '#c3272b'
  paper: '#fbf6e9'
  paper-rule: '#a9c4d9'
  paper-margin: '#e07a6e'
  pencil: '#45444c'
  pencil-soft: '#6e6c74'
  saucer: '#f7f1e6'
  saucer-rim: '#e4d8c4'
  turn: '#f2c14e'
  problem: '#9b1c1f'
typography:
  display:
    fontFamily: 'Shrikhand, Albert Sans Variable, serif'
    fontSize: '3rem'
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: '-0.01em'
  headline:
    fontFamily: 'Shrikhand, Albert Sans Variable, serif'
    fontSize: '2.25rem'
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: '-0.01em'
  title:
    fontFamily: 'Shrikhand, Albert Sans Variable, serif'
    fontSize: '1.875rem'
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: '-0.01em'
  body:
    fontFamily: 'Albert Sans Variable, system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: 'Albert Sans Variable, system-ui, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 700
    lineHeight: 1.43
  card-index:
    fontFamily: 'Albert Sans Variable, system-ui, sans-serif'
    fontSize: '0.95em'
    fontWeight: 800
    lineHeight: 1
  pencilled:
    fontFamily: 'Gochi Hand, Albert Sans Variable, cursive'
    fontSize: '1.125rem'
    fontWeight: 400
    lineHeight: 1.25
    fontFeature: 'tnum'
rounded:
  notepad: '0.375rem'
  card: '0.45rem'
  field: '0.5rem'
  button: '0.75rem'
  pill: '9999px'
spacing:
  gutter: '16px'
  sheet-padding: '20px'
  margin-inset: '48px'
  rule-pitch: '28px'
  section-gap: '24px'
components:
  button-primary:
    backgroundColor: '{colors.band}'
    textColor: '{colors.band-ink}'
    typography: '{typography.label}'
    rounded: '{rounded.button}'
    padding: '12px 20px'
  button-quiet:
    backgroundColor: 'rgb(59 36 24 / 0.1)'
    textColor: '{colors.band}'
    rounded: '{rounded.button}'
    padding: '12px 20px'
  button-quiet-hover:
    backgroundColor: 'rgb(59 36 24 / 0.2)'
  button-on-cloth:
    backgroundColor: 'rgb(59 36 24 / 0.85)'
    textColor: '{colors.band-ink}'
    rounded: '{rounded.pill}'
    padding: '6px 12px'
  button-on-cloth-hover:
    backgroundColor: '{colors.band}'
  text-field:
    backgroundColor: '{colors.card}'
    textColor: '{colors.card-ink}'
    rounded: '{rounded.field}'
    padding: '10px 12px'
  playing-card:
    backgroundColor: '{colors.card}'
    textColor: '{colors.card-ink}'
    rounded: '{rounded.card}'
    width: '4.75rem'
  card-back:
    backgroundColor: '{colors.petal-brown}'
    rounded: '{rounded.card}'
  saucer:
    backgroundColor: '{colors.saucer}'
    textColor: '{colors.band}'
    rounded: '{rounded.pill}'
    size: '4.25rem'
  notepad-sheet:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.pencil}'
    rounded: '{rounded.notepad}'
    padding: '20px 20px 20px 48px'
  turn-pill:
    backgroundColor: '{colors.turn}'
    textColor: '{colors.band}'
    typography: '{typography.title}'
    rounded: '{rounded.pill}'
    padding: '4px 16px'
  table-pill:
    backgroundColor: 'rgb(59 36 24 / 0.85)'
    textColor: '{colors.band-ink}'
    rounded: '{rounded.pill}'
    padding: '4px 16px'
---

# Design System: Hartenjagen

## Overview

**Creative North Star: "The Kitchen Table Under Oilcloth"**

The phone is your seat at a Dutch kitchen table in the 1970s. The ground is glossy vinyl oilcloth: a burnt-orange field printed in a half-drop repeat of big ember flowers with chocolate-and-gold hearts and small avocado flowers, lit by a lamp highlight and two sheen bands. Everything else is a real object lying on that cloth: white playing cards with drawn suit shapes and corner indices, coffee saucers that carry the players' names, a lined notepad sheet where the score is pencilled, and dark enamel-tin pills and buttons for the few things you press.

The print is kept close in tone to the ground on purpose, so the white cards are always the brightest thing on screen. There are no panels, cards-as-containers or app chrome: words sit on notepad paper, a saucer or a dark band pill; only short status lines and the big lettered headlines stand straight on the cloth, in band cream. Density is low and glanceable; the table reads from arm's length while people talk.

The world refuses green casino felt with a gloss, and the flat card-game UI of rounded grey panels.

**Key Characteristics:**

- Burnt-orange oilcloth print, fixed behind everything, never a flat fill.
- White playing cards are the brightest surface and the only true white.
- Words live on objects: notepad paper, saucers, dark band pills; only one-line statuses and lettering sit bare on the cloth.
- Three voices: Shrikhand lettering, Albert Sans for reading, Gochi Hand for pencilled numbers.
- Soft, warm-brown cast shadows; objects lie on the cloth, they do not float.

## Colors

A warm 1970s kitchen palette: orange vinyl, chocolate, mustard gold, avocado, cream china and blue-ruled paper.

### Primary

- **Burnt Oilcloth Orange** (oilcloth): the table itself. Body background and the field of the print. Never used for text or controls.
- **Chocolate Band** (band): the enamel-tin colour of everything you press and every label on the cloth: primary buttons, pills, the app-name tab, sheet titles, saucer names. At 85% it is the on-cloth pill; at 10-20% it is the quiet button on paper; at 50-60% it is the dimming backdrop behind sheets and dialogs.
- **Band Cream** (band-ink): text on the chocolate band, and the big lettered headlines straight on the cloth.

### Secondary

- **Mustard Turn Gold** (turn, same value as petal-gold): whose turn it is. The "your turn" pill and the ring of the saucer whose turn it is. Also the focus outline and text selection.

### Tertiary

- **Avocado Leaf** (leaf): the small flowers in the print, and the connected status dot.
- **Card Red** (card-red): red suits (hearts, diamonds) on cards, and the "all points" note on the score pad.

### Neutral

- **Card White** (card): playing-card faces, text-field fills, the QR code tile.
- **Card Edge** (card-edge): the hairline border of cards and the resting border of text fields.
- **Card Ink** (card-ink): black suits, body text colour.
- **Notepad Paper** (paper), **Rule Blue** (paper-rule), **Margin Red** (paper-margin): the lined sheet. Rules repeat every line pitch; the red margin sits at 2.1rem from the left edge.
- **Pencil** (pencil) and **Soft Pencil** (pencil-soft): writing on paper; labels and secondary notes.
- **Saucer China** (saucer) and **Saucer Rim** (saucer-rim): the players' places, and the small "your points" chip.
- **Print Tones** (oilcloth-deep, petal-brown, petal-ember, petal-cream, dot): the oilcloth print and the card back only.
- **Band Cream Soft** (band-ink-soft): unpressed language tabs, the reconnecting status dot.
- **Problem Red** (problem): field errors and invalid field borders.

### Named Rules

**The Brightest-Card Rule.** Card white is reserved for playing cards, fields and the QR tile; the oilcloth print stays within a few steps of its own ground so the cards always win the eye.

**The One Gold Rule.** Mustard gold on an interface element means "turn" (or focus). Do not use it for decoration or emphasis elsewhere.

**The Shape-And-Colour Rule.** Suits are always drawn shapes in card-red or card-ink; colour never carries the suit alone.

## Typography

**Display Font:** Shrikhand (with Albert Sans Variable, serif)
**Body Font:** Albert Sans Variable (with system-ui, sans-serif)
**Pencil Font:** Gochi Hand (with Albert Sans Variable, cursive)

**Character:** Shrikhand is the hand-lettered 1970s sign voice: fat, slanted, warm. Albert Sans is a plain geometric grotesque that stays out of the way. Gochi Hand is a pencil on a notepad and only ever writes numbers and the score's running remarks. All three are self-hosted.

### Hierarchy

- **Display** (Shrikhand 400, 3rem, 1.05, -0.01em): the app name on home and the game-over headline, in band cream on the cloth.
- **Headline** (Shrikhand 400, 2.25rem): the four join words on the notepad.
- **Title** (Shrikhand 400, 1.5-1.875rem): sheet and dialog titles in chocolate on paper; the "your turn" pill; court letters on card faces (2.4em of the card's text size).
- **Body** (Albert Sans 400-600, 1rem): table messages (semibold band cream when bare on the cloth), dialog text, notes. Buttons are 1.125rem at 600.
- **Label** (Albert Sans 700, 0.875rem): field labels, pill text, saucer details. Saucer names are 800 at 0.8rem.
- **Card Index** (Albert Sans 800, 0.95em, line-height 1): rank in card corners, sized from the card's own text size.
- **Pencilled** (Gochi Hand 400, 1.125-1.5rem, tabular numerals, pencil grey): every score number, hand number and the counting-direction line.

### Named Rules

**The Three Voices Rule.** Shrikhand letters, Albert Sans reads, Gochi Hand pencils. Never set reading text in Shrikhand or Gochi Hand, and never set a score in anything but Gochi Hand.

**The Lettering Is One Weight Rule.** Shrikhand is used at weight 400 only, through the lettered register; size alone sets its rank.

## Layout

A single portrait column built for 360px phones, centred with a 16px gutter: max 28rem on home, 36rem at the table, widening to 48rem from the md breakpoint (768px), where saucers and cards simply grow.

The game screen is a three-row table seen from your seat: the other players' saucers in a row along the top, the trick in the middle (each player's card in a row under the saucers, yours below them, empty places drawn as dashed outlines), and your hand fanned along the bottom with the turn line just above it. The play area fills the viewport height below the top bar.

Your hand fans from a shared origin at the bottom edge: up to nine slots tilting -16deg to 16deg in 4deg steps, the outer cards dropping lower, cards overlapping by about 1.35rem each side. Home repeats the fan as five cards above the lettered name.

Paper keeps its own rhythm: a 1.75rem rule pitch, a red margin at 2.1rem, and text indented 3rem to clear it. Sections stack with 16-24px gaps.

## Elevation & Depth

Depth is physical and warm: real objects cast soft, chocolate-tinted shadows onto the cloth. Shadows are layered pairs (a tight contact shadow plus a wider ambient one), always tinted rgb(58 30 12), never neutral grey. The oilcloth adds its own light: a radial lamp highlight high on the left and two diagonal sheen bands.

### Shadow Vocabulary

- **Card** (`box-shadow: 0 2px 3px rgb(58 30 12 / 0.28), 0 6px 14px rgb(58 30 12 / 0.18)`): cards, saucers, primary buttons, the turn pill at rest.
- **Lifted** (`box-shadow: 0 6px 10px rgb(58 30 12 / 0.3), 0 14px 26px rgb(58 30 12 / 0.22)`): a primary button on hover; the saucer whose turn it is.
- **Paper** (`box-shadow: 0 3px 6px rgb(58 30 12 / 0.3), 0 12px 30px rgb(58 30 12 / 0.2)`): every notepad sheet.
- **Saucer Well** (`box-shadow: inset 0 2px 4px rgb(58 30 12 / 0.18)`): the dip in the middle of a saucer.

### Named Rules

**The Lies-On-The-Cloth Rule.** Elevation means an object resting on or lifted off the table. Raise something by moving it up and deepening its shadow (card to lifted), never by glow or blur.

**The Two-State Hand Rule.** On your turn a card is either playable (lifted 1rem, rising further on hover or focus) or not (sunk 0.5rem, brightness 0.82, saturation 0.4). There is no third state.

## Shapes

Every shape is a household object. Playing cards are 5:7 with a slightly rounded corner (radius card). Saucers are circles with a 5px rim ring and an inset well. Notepad sheets have barely-rounded corners (radius notepad). Buttons are rounded enamel slabs (radius button) on paper and full pills on the cloth. Borders are rare: a hairline card-edge on cards, a 2px border on fields, a dashed 2px outline at 25% chocolate for an empty place on the table. Suits are drawn SVG paths, filled with the card's ink.

## Components

### Buttons

Chunky enamel tins, one obvious thing to press.

- **Shape:** rounded slab on paper (radius button); full pill on the cloth.
- **Primary:** chocolate band with band-cream text, 1.125rem semibold, full width by default, card shadow.
- **Hover / Focus:** primary rises 1px and takes the lifted shadow; pressing settles it back. Focus everywhere is a 3px mustard outline at 2px offset. Disabled drops to 45% opacity. Transitions run 150ms ease-out.
- **Quiet:** chocolate at 10% on paper, chocolate text, 20% on hover. The second choice beside a primary.
- **On Cloth:** a small chocolate pill at 85% (100% on hover) with band-cream 0.875rem text: Stand, Uitnodigen, Leave, Last trick.

### Chips

- **Table pill:** chocolate at 85% or 100% with band-cream bold text, full pill: whose turn it is when it is not yours, who took the trick, status lines, the stok label.
- **Your turn:** mustard gold pill with Shrikhand chocolate text and the card shadow.
- **Your points:** saucer-china pill with chocolate bold text.
- **Toggle state:** pressed swaps to band-cream fill with chocolate text (language tabs, "last trick").

### Cards / Containers

- **Corner Style:** notepad radius.
- **Background:** the notepad: paper with blue rules every 1.75rem and a red margin line.
- **Shadow Strategy:** paper shadow.
- **Border:** none.
- **Internal Padding:** 20px, 48px on the left to clear the margin.

### Inputs / Fields

- **Style:** card-white fill, 2px card-edge border, field radius, 1.125rem text, soft-pencil placeholder, bold pencil label above.
- **Focus:** the border turns chocolate; no outline ring.
- **Error:** border and message in problem red.

### Navigation

A top bar on the cloth: the app name as a Shrikhand tab in a chocolate pill, a 10px status dot (avocado connected, cream reconnecting) ringed in chocolate, then on-cloth pills for the score and invite sheets. The language switch is two small uppercase tabs (EN / NL) joined in one chocolate pill.

### Playing Card

A white 5:7 card (4.75rem in hand, 4.1rem on the table, larger from md) with a hairline edge and the card shadow. Two corner indices (rank over a small suit shape, the lower one rotated 180deg) and a centred pip at 42% width, or a Shrikhand court letter for J, Q, K. Red suits in card-red, black in card-ink. The back is chocolate with a cross-hatch of deep-orange stripes inside a 3px white border.

### Saucer

A player's place: a china circle (4.25rem, 7rem from md) with a 5px rim ring and an inset well holding the name and points. The current player's saucer swaps its rim to mustard gold and takes the lifted shadow; your own name is underlined.

### Notepad Sheet

Sheets and dialogs slide over the table as notepad paper: a dimmed chocolate backdrop, the sheet rising 2rem into place over 300ms, a Shrikhand title and a quiet close pill. The score pad is a table on this paper: one pencilled row per hand with the signed change and the running total under it, totals under a 2px pencil rule.

### Trick Motion

A card played by someone across the table lands from above (from 3rem up, 85% scale); yours lands from below (4rem down, 115% scale), 380ms on cubic-bezier(0.16, 1, 0.3, 1). A full trick lies still for about 0.7s, then sweeps towards the winner's saucer (or down to your hand), shrinking to 30-35% and fading, 1.3s ease-in. Reduced motion collapses every animation and transition to 1ms.

## Do's and Don'ts

### Do:

- **Do** put the oilcloth print behind every screen, fixed, with its lamp highlight and sheen bands.
- **Do** place any block of words on notepad paper, a saucer or a chocolate pill; bare text on the cloth is limited to one-line statuses in semibold band cream and lettered headlines.
- **Do** keep card white the brightest surface on screen and the print within a few steps of the orange ground.
- **Do** use the three voices strictly: Shrikhand to letter, Albert Sans to read, Gochi Hand with tabular numerals for scores.
- **Do** tint every shadow chocolate (rgb(58 30 12)) and layer a contact shadow with an ambient one.
- **Do** show playable cards lifted and the rest sunk and greyed on your turn, nothing in between.
- **Do** draw suits as SVG shapes and colour them card-red or card-ink.
- **Do** mark the turn with mustard gold only, and focus with a 3px mustard outline.

### Don't:

- **Don't** use green baize felt, casino gloss or flat rounded grey panels.
- **Don't** fill the background with a flat colour or a cream/off-white field; the table is burnt-orange oilcloth.
- **Don't** use mustard gold for decoration, badges or emphasis outside turn and focus.
- **Don't** add neutral grey or coloured glow shadows, or hard offset shadows; depth is soft and warm.
- **Don't** set suits as text glyphs or tell them apart by colour alone.
- **Don't** set reading text in Shrikhand or Gochi Hand.
