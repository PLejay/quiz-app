import { Schema, model } from 'mongoose';
import { CardSchema } from './cards.model';

// Currently using nested schemas (subdocument) instead of nested models
// => easier to deal with, but maybe not best as it leads to duplication
//    as each deck would contain a copy of each card instead of a reference
// See https://stackoverflow.com/questions/42290217/mongoose-nested-schema-vs-nested-models

const DeckSchema = new Schema({
  name: { type: String },
  cards: [CardSchema]
});

export const Deck = model('Deck', DeckSchema);