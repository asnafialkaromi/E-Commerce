import { useEffect, useState } from "react";

export default function useFetch<T>(callback: () => Promise<T>, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);

    callback()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));

  }, deps);

  return { data, loading, error };
}
