import { useState, useEffect, useCallback } from 'react';

export function useSupabaseQuery<T>(queryFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    console.log('Fetching data...');
    setLoading(true);
    setError(null);
    try {
      const result = await queryFn();
      console.log('Query result:', result);
      if (!result) {
        setData([]);
        console.warn('No data returned from query');
      } else {
        setData(result);
        console.log('Data set successfully:', result);
      }
    } catch (err) {
      console.error('Query error:', err);
      setError(err instanceof Error ? err : new Error('An error occurred'));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [queryFn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
}