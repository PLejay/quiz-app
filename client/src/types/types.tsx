export type CardType = {
  type: string,
  text: string,
  possibleAnswers: string[] | string,
  correctAnswer: string,
}

export type DeckType = {
  name: string,
  cards: CardType[]
};

export type urlParams = {
  deckName: string,
  cardID?: string
}

export type DeckProps = { decks: DeckType[] };
export type SingleDeckProp = { deck: DeckType };