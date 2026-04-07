import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ModelCase, ModelType } from '../types/models';
import styles from '../styles/CaseCharts.module.css';

interface CaseChartsProps {
  modelType: ModelType;
  modelCase: ModelCase;
}

const POSITIVE_COLOR = '#22c55e';
const NEGATIVE_COLOR = '#ef4444';

function CaseCharts({ modelType, modelCase }: CaseChartsProps) {
  const gradientData = useMemo(
    () =>
      modelCase.trees.map((tree) => ({
        name: `Tree ${tree.index}`,
        value: tree.value,
      })),
    [modelCase.trees],
  );

  const votingData = useMemo(() => {
    const tally = modelCase.trees.reduce(
      (acc, current) => {
        const vote = current.voteStr ?? (current.value >= 0 ? 'Alive' : 'Dead');
        acc[vote] += 1;
        return acc;
      },
      { Alive: 0, Dead: 0 },
    );

    return [
      { name: 'Alive', value: tally.Alive },
      { name: 'Dead', value: tally.Dead },
    ];
  }, [modelCase.trees]);

  return (
    <div className={styles.container}>
      {modelType === 'gradientBoosting' ? (
        <div className={styles.chartCard}>
          <h4>Tree Value Contribution</h4>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={gradientData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={90} interval={0} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {gradientData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={entry.value >= 0 ? POSITIVE_COLOR : NEGATIVE_COLOR}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className={styles.chartCard}>
          <h4>Tree Voting Composition</h4>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={votingData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >
                {votingData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={entry.name === 'Dead' ? POSITIVE_COLOR : NEGATIVE_COLOR}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default CaseCharts;
