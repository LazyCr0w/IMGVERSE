// API service for client-side image search
export const apiService = {
  // Search images using multiple APIs
  async searchImages(query, page = 1, perPage = 10) {
    try {
      const searchQuery = encodeURIComponent(query);
      let allResults = [];

      // APIs configuration
      const apis = [];

      // 1. Pexels API
      const pexelsApiKey = import.meta.env.VITE_PEXELS_API_KEY;
      if (pexelsApiKey) {
        apis.push({
          name: 'pexels',
          url: `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=${perPage}&page=${page}`,
          headers: { 'Authorization': pexelsApiKey },
          transform: (data) => data.photos.map(photo => ({
            src: photo.src.medium,
            alt: query,
            source: "pexels",
            photographer: photo.photographer,
            photographerUrl: photo.photographer_url,
            license: "Pexels License (Free for commercial and personal use)",
            licenseUrl: "https://www.pexels.com/license/",
            downloadUrl: photo.src.original
          }))
        });
      }

      // 2. Unsplash API
      const unsplashAccessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
      if (unsplashAccessKey) {
        apis.push({
          name: 'unsplash',
          url: `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=${perPage}&page=${page}`,
          headers: { 'Authorization': `Client-ID ${unsplashAccessKey}` },
          transform: (data) => data.results.map(photo => ({
            src: photo.urls.small,
            alt: query,
            source: "unsplash",
            photographer: photo.user.name,
            photographerUrl: photo.user.links.html,
            license: "Unsplash License (Free for commercial and personal use)",
            licenseUrl: "https://unsplash.com/license",
            downloadUrl: photo.urls.full
          }))
        });
      }

      // 3. Pixabay API
      const pixabayApiKey = import.meta.env.VITE_PIXABAY_API_KEY;
      if (pixabayApiKey) {
        apis.push({
          name: 'pixabay',
          url: `https://pixabay.com/api/?key=${pixabayApiKey}&q=${searchQuery}&image_type=photo&per_page=${perPage}&page=${page}`,
          headers: {},
          transform: (data) => data.hits.map(hit => ({
            src: hit.webformatURL,
            alt: query,
            source: "pixabay",
            photographer: hit.user,
            photographerUrl: `https://pixabay.com/users/${hit.user}-${hit.user_id}/`,
            license: "Pixabay License (Free for commercial and personal use)",
            licenseUrl: "https://pixabay.com/service/license/",
            downloadUrl: hit.largeImageURL
          }))
        });
      }

      // Fetch from all available APIs
      const promises = apis.map(async (api) => {
        try {
          const response = await fetch(api.url, {
            headers: api.headers,
            timeout: 8000
          });

          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }

          const data = await response.json();
          const results = api.transform(data);
          console.log(`✅ Found ${results.length} images from ${api.name}`);
          return results;
        } catch (error) {
          console.log(`❌ ${api.name} API failed:`, error.message, error.response?.status);
          return [];
        }
      });

      const results = await Promise.all(promises);

      // Combine all results
      results.forEach(apiResults => {
        allResults = allResults.concat(apiResults);
      });

      // If no results from APIs, use fallback
      if (allResults.length === 0) {
        console.log('⚠️ No images from APIs, using fallback');
        const fallbackImages = [
          { src: "https://picsum.photos/300/200?random=1", alt: query, source: "fallback" },
          { src: "https://picsum.photos/300/200?random=2", alt: query, source: "fallback" },
          { src: "https://picsum.photos/300/200?random=3", alt: query, source: "fallback" },
          { src: "https://picsum.photos/300/200?random=4", alt: query, source: "fallback" }
        ];
        return {
          original: query,
          results: fallbackImages,
          pagination: { page: parseInt(page), perPage: parseInt(perPage), hasMore: true }
        };
      }

      // Remove duplicates
      const seen = new Set();
      const uniqueResults = allResults.filter(img => {
        if (seen.has(img.src)) return false;
        seen.add(img.src);
        return true;
      });

      console.log(`🎯 Total unique images: ${uniqueResults.length} from multiple APIs (page ${page})`);
      return {
        original: query,
        results: uniqueResults,
        pagination: { page: parseInt(page), perPage: parseInt(perPage), hasMore: uniqueResults.length > 0 }
      };

    } catch (error) {
      console.error('❌ Search error:', error.message);
      return {
        original: query,
        results: [
          { src: "https://picsum.photos/300/200?random=1", alt: query, source: "fallback" },
          { src: "https://picsum.photos/300/200?random=2", alt: query, source: "fallback" },
          { src: "https://picsum.photos/300/200?random=3", alt: query, source: "fallback" }
        ],
        pagination: { page: parseInt(page), perPage: parseInt(perPage), hasMore: false }
      };
    }
  },

  // Download image (direct link)
  async downloadImage(imageUrl) {
    try {
      // For client-side, trigger download directly
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `image-${Date.now()}.jpg`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return { success: true };
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  }
};