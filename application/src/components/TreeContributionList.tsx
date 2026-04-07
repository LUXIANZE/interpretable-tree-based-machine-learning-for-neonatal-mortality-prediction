import type { ModelType, TreeContribution } from '../types/models';
import styles from '../styles/TreeContributionList.module.css';

interface TreeContributionListProps {
  modelType: ModelType;
  trees: TreeContribution[];
  onSelectTree: (tree: TreeContribution) => void;
}

function TreeContributionList({ modelType, trees, onSelectTree }: TreeContributionListProps) {
  return (
    <ul className={styles.list}>
      {trees.map((tree) => {
        if (tree.vote !== undefined) {
          tree.voteStr = tree.vote > 0 ? 'Dead' : 'Alive';
        }
        let isPositive = tree.voteStr === 'Alive';

        if (modelType === 'gradientBoosting') {
          isPositive = tree.value > 0;
        }

        return (
          <li key={tree.index}>
            <button
              type="button"
              className={`${styles.button} ${isPositive ? styles.positive : styles.negative}`}
              onClick={() => onSelectTree(tree)}
            >
              <div className={styles.title}>Tree {tree.index}</div>
              <div className={styles.meta}>
                <span>
                  Outcome: <strong>{tree.voteStr}</strong>
                </span>
                {modelType === 'gradientBoosting' && (
                  <span>
                    Value: <strong>{tree.value.toFixed(3)}</strong>
                  </span>
                )}
                {tree.logOdd !== undefined && (
                  <span>
                    Log-odd: <strong>{tree.logOdd.toFixed(4)}</strong>
                  </span>
                )}
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default TreeContributionList;
