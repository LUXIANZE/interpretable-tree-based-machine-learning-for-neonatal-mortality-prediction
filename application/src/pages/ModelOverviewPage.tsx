import { Link, useParams } from 'react-router-dom';
import CaseList from '../components/CaseList';
import { useModel } from '../services/modelService';
import styles from '../styles/ModelOverviewPage.module.css';

function ModelOverviewPage() {
  const { modelId } = useParams();
  const { model, loading, error } = useModel(modelId);

  if (loading) {
    return <div className={styles.feedback}>Loading model…</div>;
  }

  if (error) {
    return <div className={styles.feedback}>Failed to load model: {error}</div>;
  }

  if (!model) {
    return <div className={styles.feedback}>Model not found.</div>;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.headerRow}>
        <div className={styles.titleStack}>
          <Link to="/" className={styles.backLink}>
            ← All models
          </Link>
          <div className={styles.titleGroup}>
            <img src={model.icon} alt="Model icon" className={styles.icon} />
            <div>
              <h2 className={styles.title}>{model.name}</h2>
              <p className={styles.description}>{model.description}</p>
            </div>
          </div>
        </div>
        <dl className={styles.metricPanel}>
          <div>
            <dt>Accuracy</dt>
            <dd>{(model.metrics.accuracy * 100).toFixed(1)}%</dd>
          </div>
          <div>
            <dt>AUC</dt>
            <dd>{model.metrics.auc.toFixed(2)}</dd>
          </div>
          <div>
            <dt>F1 Score</dt>
            <dd>{model.metrics.f1Score.toFixed(2)}</dd>
          </div>
          <div>
            <dt>Precision</dt>
            <dd>{model.metrics.precision.toFixed(2)}</dd>
          </div>
          <div>
            <dt>Recall</dt>
            <dd>{model.metrics.recall.toFixed(2)}</dd>
          </div>
        </dl>
      </div>

      <div className={styles.sectionHeader}>
        <h3>Cases</h3>
        <span>{model.cases.length} cases</span>
      </div>

      <CaseList modelId={model.id} cases={model.cases} />
    </section>
  );
}

export default ModelOverviewPage;
