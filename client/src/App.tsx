import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar.component';
import DeckList from './components/decklist.component';
import Deck from './components/deck.component';
import CardEdit from './components/cardedit.component';

import { DeckType } from './types/types';

import ApiClient from './services/apiclient.service';

function App() {
  const [decks, setDecks] = useState<DeckType[] | []>([]);

  const updateDecks = (deckList: DeckType[]) => {
    const newDecks = [...decks, ...deckList];
    setDecks(newDecks);
    console.log('newDecks:', newDecks);
  }


  const getDeckFromName = (deckName: string): DeckType => {
    return decks.filter(deck => deck.name === deckName)[0];
  }

  useEffect(() => {
    ApiClient.getDecks()
    .then((deckList: DeckType[]) => updateDecks(deckList))
    .then(() => console.log('got here!'));
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
              />
            </Route>
            <Route path="/deck/:deckName">
              {decks.length > 0
                ? <Deck
                    getDeckFromName={getDeckFromName}
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
