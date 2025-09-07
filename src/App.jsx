import { useState, useRef, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import Header from './components/Header';
import ImageTabs from './components/ImageTabs';
import ImageCard from './components/ImageCard';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import { useImageSearch } from './hooks/useImageSearch';
import { apiService } from './services/apiService';

function App() {
  const [expandedImageId, setExpandedImageId] = useState(null);
  const [tabImages, setTabImages] = useState([]);
  const [currentTab, setCurrentTab] = useState('');
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [isTabLoadingMore, setIsTabLoadingMore] = useState(false);
  const [tabHasMore, setTabHasMore] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'about', or 'contact'
  const [tabPages, setTabPages] = useState({
    featured: 1,
    trending: 1,
    popular: 1
  });
  const tabObserverRef = useRef(null);

  const {
    query,
    setQuery,
    results,
    currentPage,
    isLoading,
    isLoadingMore,
    hasMore,
    currentQuery,
    loadedImages,
    setLoadedImages,
    loadingRef,
    handleNewSearch
  } = useImageSearch();

  // Handle images loaded from tabs
  const handleTabImagesLoaded = (images, tabName, reset = false) => {
    if (reset) {
      setTabImages(images);
    } else {
      setTabImages(prev => [...prev, ...images]);
    }
    setCurrentTab(tabName);
    setIsTabLoading(false);
    setIsTabLoadingMore(false);
  };

  // Handle tab loading start
  const handleTabLoadingStart = () => {
    setIsTabLoading(true);
  };

  // Handle tab load more
  const handleTabLoadMore = (hasMore) => {
    setTabHasMore(hasMore);
  };

  // Infinite scroll for tab content
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && tabHasMore && !isTabLoadingMore && currentTab) {
          loadMoreTabImages();
        }
      },
      { threshold: 0.1 }
    );

    if (tabObserverRef.current) {
      observer.observe(tabObserverRef.current);
    }

    return () => {
      if (tabObserverRef.current) {
        observer.unobserve(tabObserverRef.current);
      }
    };
  }, [tabHasMore, isTabLoadingMore, currentTab]);

  // Load current view from localStorage on mount
  useEffect(() => {
    const savedView = localStorage.getItem('currentView');
    if (savedView) {
      setCurrentView(savedView);
    }
  }, []);

  const loadMoreTabImages = async () => {
    setIsTabLoadingMore(true);
    const currentPage = tabPages[currentTab] || 1;

    try {
      const data = await apiService.searchImages(
        getTabQuery(currentTab),
        currentPage + 1,
        10
      );

      if (data.results && data.results.length > 0) {
        setTabImages(prev => [...prev, ...data.results]);
        setTabPages(prev => ({
          ...prev,
          [currentTab]: currentPage + 1
        }));
        setTabHasMore(data.pagination?.hasMore || false);
      } else {
        setTabHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more tab images:', error);
      setTabHasMore(false);
    } finally {
      setIsTabLoadingMore(false);
    }
  };

  const getTabQuery = (tabId) => {
    const queries = {
      featured: 'photography', // Broad query for featured content
      trending: 'trending', // Get trending images
      popular: 'popular' // Get popular images
    };
    return queries[tabId] || '';
  };

  // Navigation handlers
  const handleNavigateToHome = () => {
    setCurrentView('home');
    localStorage.setItem('currentView', 'home');
  };

  const handleNavigateToAbout = () => {
    setCurrentView('about');
    localStorage.setItem('currentView', 'about');
  };

  const handleNavigateToContact = () => {
    setCurrentView('contact');
    localStorage.setItem('currentView', 'contact');
  };

  // Determine which images to display
  const displayImages = results.length > 0 ? results : tabImages;
  const hasSearchResults = results.length > 0;
  const hasTabImages = tabImages.length > 0;
  const shouldShowTabs = !hasSearchResults && !isLoading;
  const isAnyLoading = isLoading || isTabLoading;
  const isAnyLoadingMore = isLoadingMore || isTabLoadingMore;

  const handleToggleExpand = (imageSrc) => {
    setExpandedImageId(expandedImageId === imageSrc ? null : imageSrc);
  };

  return (
    <div className="fade-in">
      <Header
        onSearch={handleNewSearch}
        isLoading={isLoading}
        currentPage={currentPage}
        onNavigateToHome={handleNavigateToHome}
        onNavigateToAbout={handleNavigateToAbout}
        onNavigateToContact={handleNavigateToContact}
        currentView={currentView}
      />

      {currentView === 'about' ? (
        <AboutPage />
      ) : currentView === 'contact' ? (
        <ContactPage />
      ) : (
        <>
          {/* Hero Section */}
          <div className="pt-20">
            <div className="minimal-container text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 tracking-wider mb-6">
                Discover Amazing Images
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                Explore millions of high-quality images from across the web. Search, discover, and find the perfect visual content for your projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="text-sm text-gray-500 bg-white/70 px-4 py-2 rounded-full backdrop-blur-sm">
                  ✨ Powered by multi-source aggregation
                </div>
                <div className="text-sm text-gray-500 bg-white/70 px-4 py-2 rounded-full backdrop-blur-sm">
                  🚀 Fast and reliable search
                </div>
                <div className="text-sm text-gray-500 bg-white/70 px-4 py-2 rounded-full backdrop-blur-sm">
                  📱 Works on all devices
                </div>
              </div>
            </div>
          </div>

          <div className="minimal-container">
        {/* Integrated Tabs - Show in middle when no search results */}
        {shouldShowTabs && (
          <div className="flex justify-center py-0">
            <ImageTabs
              onImagesLoaded={handleTabImagesLoaded}
              onLoadingStart={handleTabLoadingStart}
              onLoadMore={handleTabLoadMore}
              isLoading={isAnyLoading}
              isLoadingMore={isTabLoadingMore}
              hasMore={tabHasMore}
            />
          </div>
        )}

        {/* Single Loading Indicator */}
        {isAnyLoading && displayImages.length === 0 && (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600 text-lg">Loading images...</span>
            </div>
          </div>
        )}

        <Masonry
          breakpointCols={{
            default: 3,
            1100: 3,
            700: 2,
            500: 1
          }}
          className="pixel-grid"
          columnClassName="pixel-column"
        >
          {displayImages && displayImages.map((img, i) => (
            <ImageCard
              key={`${img.src}-${i}`}
              img={img}
              index={i}
              isExpanded={expandedImageId === img.src}
              onToggleExpand={() => handleToggleExpand(img.src)}
            />
          ))}
        </Masonry>

        {/* Infinite scroll trigger for tab content */}
        {shouldShowTabs && <div ref={tabObserverRef} className="h-4"></div>}

        {/* Infinite scroll loading indicator */}
        <div ref={loadingRef} className="text-center mt-8">
          {isAnyLoadingMore && (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Loading more images...</span>
            </div>
          )}
          {!hasMore && hasSearchResults && (
            <div className="text-gray-500 py-4">
              You've reached the end of the results
            </div>
          )}
          {!tabHasMore && hasTabImages && !hasSearchResults && (
            <div className="text-gray-500 py-4">
              You've reached the end of {currentTab} images
            </div>
          )}
        </div>

        {/* Empty states */}
        {displayImages.length === 0 && currentQuery && !isLoading && hasSearchResults && (
          <div className="text-center mt-8 text-gray-500">
            No images found for "{currentQuery}"
          </div>
        )}

        {displayImages.length === 0 && !hasSearchResults && !isLoading && !hasTabImages && (
          <div className="text-center mt-8 text-gray-500">
            Loading featured images...
          </div>
        )}

        {/* Bottom fade effect */}
        <div className="fixed bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/30 to-transparent pointer-events-none z-10"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default App