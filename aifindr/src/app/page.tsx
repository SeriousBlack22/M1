'use client';

import { useState } from 'react';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';
import { Profile } from '@/components/ProfileCard';
import { FaGithub } from 'react-icons/fa';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Profile[] | null>(null);
  const [parsedQuery, setParsedQuery] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setResults(data.results);
      setParsedQuery(data.parsedQuery);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to perform search. Please try again.');
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="pt-8 pb-6 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 flex items-center">
              <h1 className="text-4xl font-bold text-purple-800">
                AI<span className="text-gray-900">Findr</span>
              </h1>
              <div className="ml-3 text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                Beta
              </div>
            </div>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 hover:text-purple-800 transition-colors"
            >
              <FaGithub className="text-xl mr-2" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto max-w-6xl px-4 pb-16">
        <section className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI-Powered People Discovery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Describe what you're looking for in a person — interests, goals, communication style — 
            and let AI find your perfect matches.
          </p>
        </section>
        
        <section className="flex justify-center mb-10">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </section>
        
        <section>
          <SearchResults 
            results={results} 
            isLoading={isLoading} 
            error={error}
            query={query}
            parsedQuery={parsedQuery}
          />
        </section>
      </main>
      
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} AIFindr — AI-Powered People Discovery
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-purple-800 transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-purple-800 transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-purple-800 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
