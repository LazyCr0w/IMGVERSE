import { useState } from 'react';
import { useImageDownload } from '../hooks/useImageDownload';
import SourceBadge from './SourceBadge';

function ImageCard({ img, index, isExpanded, onToggleExpand }) {
  const [imageError, setImageError] = useState(false);
  const { downloadImage, isDownloading } = useImageDownload();

  const handleImageError = () => {
    setImageError(true);
  };

  const handleDownload = () => {
    const downloadUrl = img.downloadUrl || img.src;
    downloadImage(downloadUrl);
  };
  if (imageError) {
    return (
      <div className="relative break-inside-avoid mb-4 bg-gray-200 rounded shadow flex items-center justify-center h-32">
        <div className="text-gray-500 text-sm">Image unavailable</div>
        <SourceBadge source={img.source} />
      </div>
    );
  }

  return (
    <div className="relative break-inside-avoid mb-6">
      <div className="relative group">
        <img
          src={img.src}
          alt={img.alt}
          className="rounded shadow w-full block cursor-pointer"
          loading={index < 6 ? "eager" : "lazy"}
          onError={handleImageError}
          onClick={onToggleExpand}
        />

        {/* Source badge */}
        <SourceBadge source={img.source} />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4">
          <div className="text-center text-white mb-4">
            <div className="grid grid-cols-1 gap-2 mb-4">
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase tracking-wider text-gray-300 mb-1">Source</span>
                <span className="font-semibold text-sm">{img.source.charAt(0).toUpperCase() + img.source.slice(1)}</span>
              </div>
              {img.photographer && (
                <div className="flex flex-col items-center">
                  <span className="text-xs uppercase tracking-wider text-gray-300 mb-1">Photographer</span>
                  <a
                    href={img.photographerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 font-semibold text-sm transition-colors"
                  >
                    {img.photographer}
                  </a>
                </div>
              )}
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase tracking-wider text-gray-300 mb-1">License</span>
                <a
                  href={img.licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-200 font-semibold text-sm transition-colors"
                >
                  {img.license}
                </a>
              </div>
            </div>

            {/* Download Button - Icon Only */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
              className="p-2 hover:bg-white hover:bg-opacity-10 rounded transition-colors duration-200"
              title="Download Image"
            >
              <img src="/asset/download-icon.svg" alt="Download" className="w-6 h-6 filter brightness-0 invert" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageCard