import React from 'react';

function SourceBadge({ source, className = '' }) {
  return (
    <div className={`absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded ${className}`}>
      {source.charAt(0).toUpperCase() + source.slice(1)}
    </div>
  );
}

export default SourceBadge;