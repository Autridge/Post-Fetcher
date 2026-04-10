import { useState, useEffect, useCallback } from "react";
import type { Post } from "./types";

export function useFetchPosts(url: string) {
  const [data, setData] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (url) {
      fetchPosts();
    }
  }, [url, fetchPosts]);

  return { data, refetch: fetchPosts, loading, error };
}
