import { useState, useEffect, useCallback } from 'react';
import { PortfolioItem } from '../types';
import { PORTFOLIO_ITEMS } from '../data/content';
import { instagramService } from '../services/instagramService';

export function useInstagramFeed() {
  // Initialize with PORTFOLIO_ITEMS immediately to prevent empty state or layout flash
  const [posts, setPosts] = useState<PortfolioItem[]>(PORTFOLIO_ITEMS);
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
      console.warn('Instagram feed fetch notice:', err);
      // Keep verified posts on error so the UI never breaks
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  return {
    posts,
    loading,
    error,
    lastSynced,
    refetch: () => fetchFeed(true),
  };
}
