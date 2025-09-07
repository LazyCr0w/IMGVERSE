import { useState, useEffect, useRef, useCallback } from 'react';
import { apiService } from '../services/apiService';

export function useImageSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  // const [loadedImages, setLoadedImages] = useState(new Set()); // Currently unused

  const loadingRef = useRef(null);

  // Preload first few images for better UX
  useEffect(() => {
    if (results.length > 0) {
      const firstImages = results.slice(0, 6);
      firstImages.forEach(img => {
        const imgElement = new Image();
        imgElement.src = img.src;
      });
    }
  }, [results]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoadingMore && currentQuery) {
          loadMoreImages();
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [hasMore, isLoadingMore, currentQuery, currentPage]);

  const loadMoreImages = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const data = await apiService.searchImages(currentQuery, currentPage + 1, 5);

      setResults(prev => [...prev, ...data.results]);
      setCurrentPage(prev => prev + 1);
      setHasMore(data.pagination?.hasMore || false);
    } catch (error) {
      console.error('Load more failed:', error);
    }
    setIsLoadingMore(false);
  }, [currentPage, currentQuery, hasMore, isLoadingMore]);

  const handleSearch = async (searchQuery, page = 1) => {
    setIsLoading(true);
    try {
      const data = await apiService.searchImages(searchQuery, page, 5);

      if (page === 1) {
        // New search
        setResults(data.results);
        setCurrentQuery(searchQuery);
      } else {
        // Load more - append to existing results
        setResults(prev => [...prev, ...data.results]);
      }

      setCurrentPage(page);
      setHasMore(data.pagination?.hasMore || false);
    } catch (error) {
      console.error('Search failed:', error);
    }
    setIsLoading(false);
  };

  const handleNewSearch = (searchQuery) => {
    setCurrentPage(1);
    setResults([]);
    setHasMore(false);
    handleSearch(searchQuery, 1);
  };

  return {
    query,
    setQuery,
    results,
    currentPage,
    isLoading,
    isLoadingMore,
    hasMore,
    currentQuery,
    loadingRef,
    handleNewSearch,
    loadMoreImages
  };
}