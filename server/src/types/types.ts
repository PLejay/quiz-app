export type CardType = {
  _id: string,
  type: string,
  text: string,
  possibleAnswers: string[] | string,
  correctAnswer: string,
}

export type DeckType = {
  name: string,
  cards: CardType[]
};