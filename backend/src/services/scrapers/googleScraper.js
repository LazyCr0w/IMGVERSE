import axios from "axios";

export async function googleScraper(query, page = 1, perPage = 5) {
  try {
    const searchQuery = encodeURIComponent(query);
    let allResults = [];

    // Calculate which page to request from each API for balanced distribution
    const apis = [];

    // 1. Pexels API
    const pexelsApiKey = process.env.PEXELS_API_KEY;
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
    const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
    if (unsplashAccessKey && unsplashAccessKey !== 'your_unsplash_access_key_here') {
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
    const pixabayApiKey = process.env.PIXABAY_API_KEY;
    if (pixabayApiKey && pixabayApiKey !== 'your_pixabay_api_key_here') {
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
        const response = await axios.get(api.url, {
          headers: api.headers,
          timeout: 8000
        });

        const results = api.transform(response.data);
        console.log(`✅ Found ${results.length} images from ${api.name}`);
        return results;
      } catch (error) {
        console.log(`❌ ${api.name} API failed`);
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
      return fallbackImages;
    }

    // Remove duplicates
    const seen = new Set();
    const uniqueResults = allResults.filter(img => {
      if (seen.has(img.src)) return false;
      seen.add(img.src);
      return true;
    });

    console.log(`🎯 Total unique images: ${uniqueResults.length} from multiple APIs (page ${page})`);
    return uniqueResults;

  } catch (error) {
    console.error('❌ Multi-API error:', error.message);
    return [
      { src: "https://picsum.photos/300/200?random=1", alt: query, source: "fallback" },
      { src: "https://picsum.photos/300/200?random=2", alt: query, source: "fallback" },
      { src: "https://picsum.photos/300/200?random=3", alt: query, source: "fallback" }
    ];
  }
}