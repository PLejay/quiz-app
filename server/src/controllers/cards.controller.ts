import { Card } from '../models/cards.model';
import { Deck } from '../models/decks.model';
import { Request, Response } from 'express';


exports.addManyCards = async (req: Request, res: Response) => {
  try {
    const cards = req.body.cards;
    const deck = await Deck.findOne({name: req.body.deck});
    deck.cards = [...deck.cards, ...cards];
    deck.save((err: string, doc: string) => {
      if (err) return console.log(`save threw an error: ${err}`);
      res.status(201);
      res.send(doc);
    });
  } catch (err) {
    res.status(500);
    res.send(`addManyCards threw an error: ${err}`);
  }
};




export default exports;