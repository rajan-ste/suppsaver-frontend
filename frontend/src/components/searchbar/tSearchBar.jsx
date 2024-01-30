import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(query); // Call onSearch with the current query, even if it's an empty string
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
