import styles from '../styles/OutcomeTag.module.css';

interface OutcomeTagProps {
  predictedOutcome: 'Alive' | 'Dead';
  actualOutcome: 'Alive' | 'Dead';
}

function OutcomeTag({ predictedOutcome, actualOutcome }: OutcomeTagProps) {
  const isCorrect = predictedOutcome === actualOutcome;
  const displayText = isCorrect ? 'Correct' : 'Incorrect';

  return (
    <span className={isCorrect ? styles.correct : styles.incorrect}>
      {displayText}
    </span>
  );
}

export default OutcomeTag;
