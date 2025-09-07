import { useState } from 'react';
import { useImageDownload } from '../hooks/useImageDownload';
import SourceBadge from './SourceBadge';

function ImageDetailsModal({ img, isOpen, onClose }) {
  const [imageError, setImageError] = useState(false);
  const { downloadImage, isDownloading } = useImageDownload();

  const handleImageError = () => {
    setImageError(true);
  };

  const handleDownload = () => {
    const downloadUrl = img.downloadUrl || img.src;
    downloadImage(downloadUrl);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="minimal-modal w-auto mx-4">
        <div className="p-0">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-wider">IMAGE DETAILS</h2>
                <p className="text-sm text-gray-600 mt-1">License & usage information</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-xl hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200"
              >
                ×
              </button>
            </div>
          </div>

          {/* Main Content - Image First, Details Below */}
          <div className="px-8 py-6">
            {/* Large Image Display */}
            <div className="relative mb-6">
              {imageError ? (
                <div className="w-full h-80 bg-gray-200 rounded-xl flex items-center justify-center">
                  <div className="text-gray-500 text-base">Image unavailable</div>
                </div>
              ) : (
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full rounded-xl shadow-2xl"
                  onError={handleImageError}
                />
              )}

              {/* Source Badge */}
              <SourceBadge source={img.source} className="top-4 left-4 bg-black bg-opacity-80 px-3 py-1 rounded-full text-xs font-medium shadow-lg" />
            </div>

            {/* Metadata Below Image */}
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-medium">Source</span>
                  <span className="font-semibold text-gray-900 text-sm">{img.source.charAt(0).toUpperCase() + img.source.slice(1)}</span>
                </div>
                {img.photographer && (
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-medium">Photographer</span>
                    <a
                      href={img.photographerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
                    >
                      {img.photographer}
                    </a>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-medium">License</span>
                  <a
                    href={img.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
                  >
                    {img.license}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-8 py-6 border-t border-gray-100 bg-gray-50">
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="minimal-btn flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
              >
                CLOSE
              </button>
              <button
                onClick={() => {
                  handleDownload();
                  onClose();
                }}
                className="minimal-btn flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!img.downloadUrl || isDownloading}
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>{isDownloading ? '⏳' : '⬇️'}</span>
                  <span>{isDownloading ? 'DOWNLOADING...' : 'DOWNLOAD'}</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageDetailsModal