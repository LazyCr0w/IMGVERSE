import { useState } from 'react';
import { apiService } from '../services/apiService';

export function useImageDownload() {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadImage = async (imageUrl) => {
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      const response = await apiService.downloadImage(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary download link
      const a = document.createElement('a');
      a.href = url;
      a.download = `image-${Date.now()}.jpg`;
      a.style.display = 'none';

      // Add to DOM, click, and remove
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Clean up the object URL
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return { downloadImage, isDownloading };
}