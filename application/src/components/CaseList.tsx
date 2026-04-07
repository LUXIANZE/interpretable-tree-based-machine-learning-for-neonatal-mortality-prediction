import { useId, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { ModelCase } from '../types/models';
import OutcomeTag from './OutcomeTag';
import styles from '../styles/CaseList.module.css';

interface CaseListProps {
  modelId: string;
  cases: ModelCase[];
}

function CaseList({ modelId, cases }: CaseListProps) {
  const filterId = useId();
  const [outcomeFilter, setOutcomeFilter] = useState<'all' | 'correct' | 'incorrect'>('all');

  const filteredCases = useMemo(() => {
    if (outcomeFilter === 'all') {
      return cases;
    }

    const shouldMatch = outcomeFilter === 'correct';
    return cases.filter((modelCase) => {
      const matches = modelCase.predictedOutcome === modelCase.actualOutcome;
      return shouldMatch ? matches : !matches;
    });
  }, [cases, outcomeFilter]);

  const filterLabel = outcomeFilter === 'all'
    ? 'All cases'
    : outcomeFilter === 'correct'
      ? 'Correct predictions'
      : 'Incorrect predictions';

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <label htmlFor={filterId} className={styles.filterLabel}>
          Filter by outcome
        </label>
        <select
          id={filterId}
          className={styles.filterSelect}
          value={outcomeFilter}
          onChange={(event) => setOutcomeFilter(event.target.value as 'all' | 'correct' | 'incorrect')}
        >
          <option value="all">All cases</option>
          <option value="correct">Correct predictions</option>
          <option value="incorrect">Incorrect predictions</option>
        </select>
      </div>

      {filteredCases.length === 0 ? (
        <div className={styles.emptyState}>
          No cases match the selected filter ({filterLabel}).
        </div>
      ) : (
        <ul className={styles.list}>
          {filteredCases.map((modelCase) => (
            <li key={modelCase.index} className={styles.listItem}>
              <Link to={`/models/${modelId}/cases/${modelCase.index}`} className={styles.caseLink}>
                <div className={styles.primaryRow}>
                  <span className={styles.caseTitle}>Case {modelCase.index}</span>
                  <OutcomeTag
                    predictedOutcome={modelCase.predictedOutcome}
                    actualOutcome={modelCase.actualOutcome}
                  />
                </div>
                <div className={styles.secondaryRow}>
                  <span>Predicted: {modelCase.predictedOutcome}</span>
                  <span>Actual: {modelCase.actualOutcome}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CaseList;
