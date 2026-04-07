export type ModelType = 'gradientBoosting' | 'extraTrees' | 'randomForest';

export interface ModelMetrics {
  accuracy: number;
  auc: number;
  f1Score: number;
  precision: number;
  recall: number;
}

export interface TreeContribution {
  index: number;
  value: number;
  logOdd?: number;
  vote?: number;
  voteStr?: 'Alive' | 'Dead';
  dotPath: string;
}

export interface ModelCase {
  index: number;
  predictedProbability: number;
  predictedOutcome: 'Alive' | 'Dead';
  actualOutcome: 'Alive' | 'Dead';
  inputFeatures: Record<string, number>;
  trees: TreeContribution[];
}

export interface ModelDefinition {
  id: string;
  name: string;
  type: ModelType;
  description: string;
  icon: string;
  metrics: ModelMetrics;
  cases: ModelCase[];
}

export interface ModelsPayload {
  models: ModelDefinition[];
}
