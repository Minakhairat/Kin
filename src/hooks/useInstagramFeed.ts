import { useState, useEffect, useCallback } from 'react';
import { PortfolioItem } from '../types';
import { instagramService } from '../services/instagramService';

export function useInstagramFeed() {
  const [posts, setPosts] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);

  const fetchFeed = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      const data = await instagramService.fetchLatestPosts(forceRefresh);
      setPosts(data);
      setLastSynced(new Date());
    } catch (err: any) {
      console.error('Error fetching Instagram feed:', err);
      setError(err?.message || 'Failed to fetch Instagram feed');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const addManualReel = useCallback((reel: PortfolioItem) => {
    setPosts((prev) => [reel, ...prev]);
    try {
      const existing = localStorage.getItem('kin_custom_reels');
      const list = existing ? JSON.parse(existing) : [];
      localStorage.setItem('kin_custom_reels', JSON.stringify([reel, ...list]));
    } catch {
      // ignore
    }
  }, []);

  const configureApi = useCallback((tokenOrUrl: string) => {
    instagramService.configure(tokenOrUrl);
    fetchFeed(true);
  }, [fetchFeed]);

  return {
    posts,
    loading,
    error,
    lastSynced,
    refetch: () => fetchFeed(true),
    addManualReel,
    configureApi,
  };
}
