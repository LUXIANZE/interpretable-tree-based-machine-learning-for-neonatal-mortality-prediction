import { Navigate, Route, Routes } from 'react-router-dom';
import ModelSelectionPage from './pages/ModelSelectionPage';
import ModelOverviewPage from './pages/ModelOverviewPage';
import CaseDetailsPage from './pages/CaseDetailsPage';
import styles from './styles/App.module.css';

function App() {
  return (
    <div className={styles.appShell}>
      <header className={styles.header}>
        <h1 className={styles.title}>Tree Based Model Explainer</h1>
        <p className={styles.subtitle}>Explore ensemble model decisions at the case level.</p>
      </header>
      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<ModelSelectionPage />} />
          <Route path="/models/:modelId" element={<ModelOverviewPage />} />
          <Route path="/models/:modelId/cases/:caseId" element={<CaseDetailsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
