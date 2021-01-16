import React, { useEffect, useState } from 'react';
import './components.css';
import { useParams } from 'react-router-dom';
import { DeckType, urlParams } from '../types/types';
import { Link } from 'react-router-dom';

type props = {
  getDeckFromName (deckName: string): DeckType;
}

const Deck = ({ getDeckFromName }: props) => {
  const params = useParams() as urlParams;
  const { deckName } = params;
  // const location = useLo
  const [deck, setDeck] = useState<DeckType>({name: 'Deck loading...', cards:[]});

  useEffect(() => {
    let newDeck = Object.assign({}, deck);
    newDeck = getDeckFromName(deckName);
    setDeck(newDeck);
  }, []);

  const displayCards = () => {
    return (
      deck.cards.map(card =>
        <h3 key={card.text}>{card.text}</h3>
      )
    )
  }

  return (
    <div className="deck">
      {deck.name
        ? <div>
          <h2>{deck.name}</h2>
            {displayCards()}
            <Link to={{ pathname: `/deck/${deck.name}/edit/new` }}>
              <button>Create new card</button>
            </Link>
        </div>
      : null}
    </div>
  );
}


export default Deck;
