import { useState, useEffect } from 'react';

const ImageTabs = ({ onImagesLoaded, onLoadingStart, isLoading, onLoadMore, hasMore, isLoadingMore }) => {
  const [activeTab, setActiveTab] = useState('featured');
  const [tabPages, setTabPages] = useState({
    featured: 1,
    trending: 1,
    popular: 1
  });

  const tabs = [
    { id: 'featured', label: 'FEATURED', query: 'beautiful landscapes nature photography' },
    { id: 'trending', label: 'TRENDING', query: 'trending fashion lifestyle photography' },
    { id: 'popular', label: 'POPULAR', query: 'popular art digital illustration' }
  ];

  useEffect(() => {
    // Load images for the active tab when component mounts or tab changes
    if (activeTab) {
      loadTabImages(activeTab, 1, true); // Reset to page 1 when switching tabs
    }
  }, [activeTab]);

  const loadTabImages = async (tabId, page = 1, reset = false) => {
    const tab = tabs.find(t => t.id === tabId);
    if (!tab) return;

    if (page === 1) onLoadingStart();
    try {
      const response = await fetch(`http://localhost:3001/api/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: tab.query, page, perPage: 10 })
      });

      const data = await response.json();
      if (data.results) {
        // Update pagination for this tab
        setTabPages(prev => ({
          ...prev,
          [tabId]: page
        }));

        // Call the parent callback with reset flag
        onImagesLoaded(data.results, tab.label.toLowerCase(), reset);

        // Update hasMore for this tab
        if (onLoadMore) {
          onLoadMore(data.pagination?.hasMore || false);
        }
      }
    } catch (error) {
      console.error('Error loading tab images:', error);
      onImagesLoaded([], tab.label.toLowerCase(), reset);
    }
  };


  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="border-b border-gray-200">
      <div className="minimal-container">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-gray-800 text-gray-800'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageTabs;