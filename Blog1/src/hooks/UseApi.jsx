import { useState, useEffect, useCallback } from "react";
import * as api from "../services/api"; 

export default function useApi(method, params = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!api[method]) {
      console.error(`API method '${method}' does not exist in services/api.js`);
      setError(`Unknown API method: ${method}`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await api[method](...params);
      setData(result);
    } catch (err) {
      console.error(`Error calling ${method}:`, err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [method, JSON.stringify(params)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
