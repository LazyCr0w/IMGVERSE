// API service for consistent request handling
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const apiService = {
  // Search images
  async searchImages(query, page = 1, perPage = 10) {
    try {
      const response = await fetch(`${API_BASE_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, page, perPage }),
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Search API error:', error);
      throw error;
    }
  },

  // Submit contact form
  async submitContact(contactData) {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        throw new Error(`Contact submission failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Contact API error:', error);
      throw error;
    }
  },

  // Download image
  async downloadImage(imageUrl) {
    try {
      const response = await fetch(`${API_BASE_URL}/download?url=${encodeURIComponent(imageUrl)}`);

      if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      console.error('Download API error:', error);
      throw error;
    }
  }
};