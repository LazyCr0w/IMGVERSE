import { useState } from 'react'

function SearchBar({ onSearch, isLoading, currentPage }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-1 h-14">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="search images..."
            className="minimal-input"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`search-btn whitespace-nowrap -mt-1 ${isLoading && currentPage === 1 ? 'loading-hover' : ''}`}
          >
            <img
              src="/asset/search-icon.svg"
              alt="Search"
              className="w-12 h-12 font-bold"
              style={{ filter: 'brightness(0) saturate(100%)' }}
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar