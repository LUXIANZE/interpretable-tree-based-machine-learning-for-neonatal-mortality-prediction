import { Link } from 'react-router-dom';
import { useModels } from '../services/modelService';
import styles from '../styles/ModelSelectionPage.module.css';

function ModelSelectionPage() {
  const { models, loading, error } = useModels();

  if (loading) {
    return <div className={styles.feedback}>Loading models…</div>;
  }

  if (error) {
    return <div className={styles.feedback}>Failed to load models: {error}</div>;
  }

  return (
    <section className={styles.grid}>
      {models.map((model) => (
        <Link key={model.id} to={`/models/${model.id}`} className={styles.card}>
          <div className={styles.cardHeader}>
            <img src={model.icon} alt="Model icon" className={styles.icon} />
            <h2 className={styles.modelName}>{model.name}</h2>
          </div>
          <p className={styles.description}>{model.description}</p>
          <dl className={styles.metrics}>
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
              <dt>Recall</dt>
              <dd>{model.metrics.recall.toFixed(2)}</dd>
            </div>
          </dl>
        </Link>
      ))}
    </section>
  );
}

export default ModelSelectionPage;
