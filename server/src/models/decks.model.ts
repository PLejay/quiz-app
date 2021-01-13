import { Schema, model } from 'mongoose';

const DeckSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }]
});

export const Deck = model('Deck', DeckSchema);