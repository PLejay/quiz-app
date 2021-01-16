import React, { useState, useEffect } from 'react';
import './components.css';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DeckType, CardType, urlParams} from '../types/types';

type props = {
  getDeckFromName (deckName: string): DeckType;
}

const CardEdit = ({getDeckFromName}: props) => {
  const params = useParams() as urlParams;
  const {deckName, cardID} = params;
  const isNew = cardID === 'new';
  const { register, handleSubmit, watch, errors } = useForm();
  const [deck, setDeck] = useState <DeckType | {}>({});

  const onSubmit = (data: CardType) => {
    if (data.type === 'Yes/No') {
      data.possibleAnswers = ['Yes', 'No'];
    } else if (typeof(data.possibleAnswers) === 'string') {
      data.possibleAnswers = data.possibleAnswers.split(',');
    }

    console.log('data: ', data);
  }

  useEffect (() => {
    let newDeck = Object.assign({}, deck);
    newDeck = getDeckFromName(deckName);
    setDeck(newDeck);
  }, []);


  let type = watch('type');
  let isYesNo = type === 'Yes/No';

  console.log('watching:', watch('type'));
  console.log('watching:', watch('text'));


  return (
    <div className="cardEdit">
      <Link to={`/deck/${deckName}`}>
        <h2>{deckName}</h2>
      </Link>
      <h3>{isNew ? 'Create new card' : 'Edit card'}</h3>
      <form onSubmit={handleSubmit(onSubmit)} id="editForm">
        <div className="editRow">
          <label htmlFor="type">Type:</label>
          <select name="type" id="type" ref={register}>
            <option value="Yes/No">Yes/No</option>
            <option value="multipleChoice">Multiple Choice</option>
            <option value="writeAnswer">Write Answer</option>
          </select>
        </div>
        <div className="editRow">
          <label htmlFor="text">Text</label>
          <input type="text" name="text" ref={register}
                  placeholder={isYesNo
                    ? "Do you love white text on black background?"
                    : type==="multipleChoice"
                      ? "Which of the following are valid HTTP methods?"
                      : "List all possible falsy values in Javascript"}/>
        </div>
        <div className="editRow">
          <label>Possible answers</label>
          <input type="text" name="possibleAnswers" ref={register}
                  disabled={isYesNo}
                  placeholder={isYesNo
                    ? "Yes, No"
                    : type === "multipleChoice"
                      ? "GET, PUT, EDIT, DELETE"
                      : ""}/>
        </div>
        <div className="editRow">
          <label>Correct answer</label>
          {isYesNo
            ? (<div id="yesNoAnswers">
                <label htmlFor="Yes">Yes</label>
                <input type="radio" name="correctAnswer" value="Yes" ref={register} defaultChecked></input>
                <label htmlFor="No">No</label>
                <input type="radio" name="correctAnswer" value="No" ref={register}></input>
              </div>)
            : <input type="text" name="correctAnswer" ref={register}
              placeholder={type === "multipleChoice"
                  ? "GET, PUT, DELETE"
                  : "0, null, undefined, false, NaN, empty string, 0n (BigInt)"} />}
        </div>
      </form>

      <div className="actions">
        <button type="submit" form="editForm" ref={register}>Save</button>
        <button type="submit" form="editForm" ref={register}>Save and create another</button>
        <button>Cancel</button>
      </div>
    </div>
  );
};


export default CardEdit;
