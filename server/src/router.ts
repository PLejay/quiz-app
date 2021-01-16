import express from 'express';
import card from './controllers/cards.controller';
import deck from './controllers/decks.controller';
export const router = express.Router();

router.get('/test', (req, res) => {
  res.send('This is a test');
});

router.post('/addManyCards', card.addManyCards);
router.post('/createDeck', deck.createDeck);
router.get('/getDecks', deck.getDecks);