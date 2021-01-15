import React from 'react';
import './components.css';
import { useLocation } from 'react-router-dom';
import { DeckType } from '../types/types';
import { Link } from 'react-router-dom';


const CardEdit = () => {
  // const {deckName}: string | undefined = useParams();
  const location = useLocation();
  const deck = location.state as DeckType;


  return (
    <div className="deck">
      <h2>{deck.name}</h2>
      {deck.cards.map(card =>
        <h3>{card.text}</h3>
      )}
      <Link to={{ pathname: `/deck/${deck.name}/edit/new` }}>
        <button>Create new card</button>
      </Link>
    </div>
  );
}


export default CardEdit;
