import { Schema, model } from 'mongoose';

export const CardSchema = new Schema ({
  type: String,
  text: String,
  possibleAnswers: {type: [String], default: undefined},
  correctAnswer: String,
});

export const Card = model('Card', CardSchema);