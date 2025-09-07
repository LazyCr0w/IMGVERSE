import { useState } from 'react'
import { IoSearch } from 'react-icons/io5'

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
            <IoSearch className="w-8 h-8 font-bold" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar