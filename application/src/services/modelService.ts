import { useEffect, useMemo, useState } from 'react';
import type { ModelCase, ModelDefinition, ModelsPayload } from '../types/models';

const DATA_URL = '/data/models.json';

let cachedModels: ModelDefinition[] | null = null;
let fetchPromise: Promise<ModelDefinition[]> | null = null;

async function fetchModels(): Promise<ModelDefinition[]> {
  if (cachedModels) {
    return cachedModels;
  }

  if (!fetchPromise) {
    fetchPromise = fetch(DATA_URL)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to load models: ${response.statusText}`);
        }

        const payload = (await response.json()) as ModelsPayload;
        cachedModels = payload.models;
        return cachedModels;
      })
      .catch((error) => {
        fetchPromise = null;
        throw error;
      });
  }

  return fetchPromise;
}

export function useModels() {
  const [models, setModels] = useState<ModelDefinition[]>(cachedModels ?? []);
  const [loading, setLoading] = useState(!cachedModels);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedModels) {
      return;
    }

    let cancelled = false;

    fetchModels()
      .then((loaded) => {
        if (!cancelled) {
          setModels(loaded);
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
  }, []);

  return { models, loading, error };
}

export function useModel(modelId: string | undefined) {
  const { models, loading, error } = useModels();

  const model = useMemo(
    () => models.find((candidate) => candidate.id === modelId),
    [models, modelId],
  );

  return { model, loading, error };
}

export function useModelCase(modelId: string | undefined, caseId: number | undefined) {
  const { model, loading, error } = useModel(modelId);
  const modelCase: ModelCase | undefined = useMemo(() => {
    if (!model) {
      return undefined;
    }

    return model.cases.find((candidate) => {
        if (candidate.index === caseId) {
            return true;
        } else {
            return false;
        }
            });
  }, [model, caseId]);

  return { model, modelCase, loading, error };
}
