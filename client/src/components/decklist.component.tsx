import React from 'react';
import './components.css';

import { Link } from 'react-router-dom';
import {DeckProps} from '../types/types';

const deckList = ({decks}: DeckProps) => (
  <div className="deckList">
    <h2>Decks</h2>
    <div className="deck-container">
        {decks.map(deck =>
            <div className="row">
              <div className="cell" id="deckName">
                <Link to={{pathname: `/deck/${deck.name}`, state: deck}} key={deck.name}>
                  {deck.name}
                </Link>
              </div>
              <div className="cell" id="numCards">
                <Link to={{pathname: `/deck/${deck.name}`, state: deck }} key={deck.name}>
                  {deck.cards.length + ' cards'}
                </Link>
              </div>
              <div className="cell" id="Actions">
                <button>Rename</button>
              </div>
              <div className="cell" id="Actions">
                <button>Delete</button>
              </div>
            </div>
        )}
    </div>
    <div className="createNew">
      <button>Create new deck</button>
    </div>
  </div>
);

export default deckList;
