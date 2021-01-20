import React, { useEffect, useState } from 'react';
import './components.css'
import { CardType } from '../types/types';
import AnswerButton from './answer-button.component'

type props = {
  card: CardType;
  goToPrevious: () => void;
  goToNext: () => void;
  index: number;
  numCards: number;
}

const QuizCard = ({ card, index, numCards, goToPrevious, goToNext }: props) => {
  const [answerClicked, setAnswerClicked] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    setAnswerClicked(false);
  }, []);

  return (
    <div className="quiz-card">
      <div className="question-text">
        <p>{card.text}</p>
      </div>
      <div className="possible-answers">
        {card.possibleAnswers.map((ans, i) =>
          <AnswerButton
            answer={ans}
            isCorrect={ans === card.correctAnswer}
            clicked={answerClicked}
            key={i}
            cardIndex={index}
          />
      )}
      </div>
      <div className="bottom-actions">
        <button onClick={goToPrevious} disabled={index===0}>Previous</button>
        <button onClick={goToNext} disabled={index===numCards-1}>Next</button>
      </div>
    </div>
  )
}

export default QuizCard;