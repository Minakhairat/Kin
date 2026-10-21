import { useState, useEffect, useCallback } from 'react';
import { PortfolioItem } from '../types';
import { instagramService } from '../services/instagramService';

export function useInstagramFeed() {
  const [posts, setPosts] = useState<PortfolioItem[]>(() => instagramService.getStoredItems());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSynced, setLastSynced] = useState<Date>(new Date());

  const fetchFeed = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      const data = await instagramService.fetchLatestPosts(forceRefresh);
      if (Array.isArray(data) && data.length > 0) {
        setPosts(data);
      }
      setLastSynced(new Date());
    } catch (err: any) {
      console.warn('Instagram feed sync notice:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed();

    const unsubscribe = instagramService.subscribe((newPosts) => {
      setPosts(newPosts);
      setLastSynced(new Date());
    });

    return () => {
      unsubscribe();
    };
  }, [fetchFeed]);

  return {
    posts,
    loading,
    error,
    lastSynced,
    refetch: () => fetchFeed(true),
  };
}
