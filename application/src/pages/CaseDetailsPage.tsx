import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CaseCharts from '../components/CaseCharts';
import OutcomeTag from '../components/OutcomeTag';
import TreeContributionList from '../components/TreeContributionList';
import TreeGraphModal from '../components/TreeGraphModal';
import { useModelCase } from '../services/modelService';
import type { TreeContribution } from '../types/models';
import styles from '../styles/CaseDetailsPage.module.css';

function CaseDetailsPage() {
  const { modelId, caseId } = useParams();
  const { model, modelCase, loading, error } = useModelCase(modelId, Number(caseId));
  const [selectedTree, setSelectedTree] = useState<TreeContribution | null>(null);

  const featureEntries = useMemo(() => {
    if (!modelCase) {
      return [];
    }

    return Object.entries(modelCase.inputFeatures).sort(([a], [b]) => a.localeCompare(b));
  }, [modelCase]);

  if (loading) {
    return <div className={styles.feedback}>Loading case…</div>;
  }

  if (error) {
    return <div className={styles.feedback}>Failed to load case: {error}</div>;
  }

  if (!model || !modelCase) {
    return <div className={styles.feedback}>Case not found.</div>;
  }

  const isCorrect = modelCase.predictedOutcome === modelCase.actualOutcome;

  return (
    <section className={styles.wrapper}>
      <div className={styles.headerRow}>
        <div>
          <Link to={`/models/${model.id}`} className={styles.backLink}>
            ← Back to {model.name}
          </Link>
          <h2 className={styles.title}>Case {modelCase.index}</h2>
          <p className={styles.subtitle}>Detailed explanation powered by {model.name}.</p>
        </div>
        <div className={styles.summaryCard}>
          <OutcomeTag
            predictedOutcome={modelCase.predictedOutcome}
            actualOutcome={modelCase.actualOutcome}
          />
          <dl className={styles.summaryMetrics}>
            <div>
              <dt>Predicted</dt>
              <dd>{modelCase.predictedOutcome}</dd>
            </div>
            <div>
              <dt>Actual</dt>
              <dd>{modelCase.actualOutcome}</dd>
            </div>
            {/* <div>
              <dt>Probability</dt>
              <dd>{(modelCase.predictedProbability * 100).toFixed(2)}%</dd>
            </div> */}
            <div>
              <dt>Result</dt>
              <dd className={isCorrect ? styles.correct : styles.incorrect}>
                {isCorrect ? 'Correct prediction' : 'Incorrect prediction'}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <section className={styles.section}>
          <h3>Input Features</h3>
          <table className={styles.featureTable}>
            <tbody>
              {featureEntries.map(([feature, value]) => (
                <tr key={feature}>
                  <th scope="row">{feature}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className={styles.section}>
          <h3>Tree Outputs</h3>
          <p className={styles.helperText}>
            Select a tree to inspect its structure and contribution for this case.
          </p>
          <TreeContributionList
            modelType={model.type}
            trees={modelCase.trees}
            onSelectTree={setSelectedTree}
          />
        </section>

        <section className={`${styles.section} ${styles.fullWidth}`}>
          <h3>Model Evaluation View</h3>
          <CaseCharts modelType={model.type} modelCase={modelCase} />
        </section>
      </div>

      {selectedTree && (
        <TreeGraphModal
          tree={selectedTree}
          features={modelCase.inputFeatures}
          onClose={() => setSelectedTree(null)}
        />
      )}
    </section>
  );
}

export default CaseDetailsPage;
