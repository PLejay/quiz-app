import { Deck } from '../models/decks.model';
import { Request, Response } from 'express';

exports.createDeck = async (req: Request, res: Response) => {
  try {
    const deckName = req.body;
    const newDeck = await Deck.create(deckName);
    res.send(newDeck);
  } catch (err) {
    res.status(500);
    res.send(`addManyCards threw an error: ${err}`);
  }
};

exports.getDecks = async (req: Request, res: Response) => {
  try {
    const decks = await Deck.find();
    res.send(decks);
  } catch (err) {
    res.status(500);
    res.send(`Error retrieving decks: ${err}`);
  }
};

export default exports;