import { Schema, model } from 'mongoose';

const CardSchema = new Schema ({
  _id: Schema.Types.ObjectId,
  type: String,
  text: String,
  correctAnswer: String,
  decks: [{ type: Schema.Types.ObjectId, ref: 'Deck'}]
});

export const Card = model('Card', CardSchema);