'use client';

import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const placeholderExamples = [
    'Find me artists who love hiking and talk like Tarantino',
    'I need comedians with a tech background',
    'Looking for filmmakers who enjoy nature',
    'Show me people with witty humor who like adventures',
    'Find creative writers who are into hiking'
  ];

  const randomPlaceholder = placeholderExamples[Math.floor(Math.random() * placeholderExamples.length)];

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={randomPlaceholder}
          className="w-full px-5 py-4 text-lg rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="absolute right-3 bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition-colors disabled:bg-purple-400"
          disabled={isLoading || !query.trim()}
        >
          <FaSearch className="text-lg" />
        </button>
      </div>
    </form>
  );
} 