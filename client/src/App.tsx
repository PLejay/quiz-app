import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar.component';
import DeckList from './components/decklist.component';
import Deck from './components/deck.component';
import CardEdit from './components/cardedit.component';
import Quiz from './components/quiz.component';

import { DeckType, CardType } from './types/types';

import ApiClient from './services/apiclient.service';

function App() {
  const [decks, setDecks] = useState<DeckType[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false)

  const updateDecks = async () => {
    let newDecks = [];
    newDecks = await ApiClient.getDecks();
    setDecks(newDecks);
    setRefresh(!refresh);
  }

  const getDeckFromName = (deckName: string): DeckType => {
    const [selectedDeck] = decks.filter(deck => deck.name === deckName);
    return selectedDeck;
  }

  const getCardFromID = (deck: DeckType, id: string): CardType => {
    const [selectedCard] = deck.cards.filter(card => card._id === id);
    return selectedCard;
  }

  const editCard = async (card: CardType, deckName: string, isNew: boolean): Promise<void> => {
    await ApiClient.editCard(card, deckName, isNew);
  }

  const deleteCard = async (card: CardType, deckName: string): Promise<void> => {
    const deleteResult = await ApiClient.deleteCard(card, deckName);
    console.log('deleteResult:', deleteResult);
  }

  useEffect(() => {
    ApiClient.getDecks()
      .then((deckList: DeckType[]) => setDecks(deckList))
  },[])

  return (
    <div className="App">
      <BrowserRouter>
          <Navbar/>
          <div className="App-body">
          <Switch>
            <Route path="/deck/:deckName/edit/:cardID">
              <CardEdit
                getDeckFromName={getDeckFromName}
                getCardFromID={getCardFromID}
                editCard={editCard}
                updateDecks={updateDecks}
              />
            </Route>
            <Route path="/deck/:deckName/quiz">
              {decks.length > 0
                ? <Quiz
                  getDeckFromName={getDeckFromName}
                />
                : <p>Loading...</p>}
            </Route>
            <Route path="/deck/:deckName">
              {decks.length > 0
                ? <Deck
                    getDeckFromName={getDeckFromName}
                    deleteCard={deleteCard}
                    updateDecks={updateDecks}
                    refresh={refresh}
                  />
                : <p>Loading...</p>}
            </Route>
            <Route exact path="/">
              {decks.length > 0
              ? <DeckList
                decks={decks}
                />
              : <p>Loading...</p>}
            </Route>
          </Switch>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
