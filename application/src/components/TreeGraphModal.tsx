import { useEffect, useMemo, useRef, useState } from 'react';
import { graphviz } from 'd3-graphviz';
import type { TreeContribution } from '../types/models';
import styles from '../styles/TreeGraphModal.module.css';

interface TreeGraphModalProps {
  tree: TreeContribution;
  features: Record<string, number>;
  onClose: () => void;
}

function TreeGraphModal({ tree, features, onClose }: TreeGraphModalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dotSource, setDotSource] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const featureEntries = useMemo(() => {
    return Object.entries(features)
      .map(([name, value]) => [name, Number(value)] as const)
      .sort(([a], [b]) => a.localeCompare(b));
  }, [features]);

  const formatFeatureValue = (value: number) => {
    if (!Number.isFinite(value)) {
      return String(value);
    }

    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  useEffect(() => {
    let cancelled = false;

    fetch(tree.dotPath)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Unable to load dot file: ${response.statusText}`);
        }

        const text = await response.text();
        if (!cancelled) {
          setDotSource(text);
          setLoading(false);
        }
      })
      .catch((loadError: Error) => {
        if (!cancelled) {
          setError(loadError.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [tree.dotPath]);

  useEffect(() => {
    if (!dotSource || !containerRef.current) {
      return;
    }

    const instance = graphviz(containerRef.current, {
      useWorker: false,
      fit: true,
      zoom: true,
    });

    instance.renderDot(dotSource);

    return () => {
      containerRef.current?.replaceChildren();
    };
  }, [dotSource]);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Tree {tree.index} Structure</h3>
          <button type="button" onClick={onClose} className={styles.closeButton}>
            Close
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.graphSection}>
            {(loading || error) && (
              <div className={`${styles.status} ${error ? styles.statusError : ''}`}>
                {error ? `Failed to render tree: ${error}` : 'Rendering tree…'}
              </div>
            )}
            <div
              ref={containerRef}
              className={styles.graphContainer}
              aria-hidden={loading || Boolean(error)}
            />
          </div>

          <aside className={styles.featurePanel} aria-label="Feature values for this case">
            <h4 className={styles.featureTitle}>Feature Values</h4>
            <div className={styles.featureList} role="list">
              {featureEntries.length === 0 ? (
                <p className={styles.featureEmpty}>No feature data available.</p>
              ) : (
                featureEntries.map(([name, value]) => (
                  <div key={name} className={styles.featureRow} role="listitem">
                    <span className={styles.featureName}>{name}</span>
                    <span className={styles.featureValue}>{formatFeatureValue(value)}</span>
                  </div>
                ))
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default TreeGraphModal;
