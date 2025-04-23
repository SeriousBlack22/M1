'use client';

import { useState, useEffect } from 'react';
import ProfileCard, { Profile } from './ProfileCard';

interface SearchResultsProps {
  results: Profile[] | null;
  isLoading: boolean;
  error: string | null;
  query: string;
  parsedQuery: any;
}

export default function SearchResults({ 
  results, 
  isLoading, 
  error, 
  query, 
  parsedQuery 
}: SearchResultsProps) {
  const [displayResults, setDisplayResults] = useState<Profile[] | null>(null);
  
  // Animation effect for results
  useEffect(() => {
    if (results) {
      setDisplayResults([]);
      const timer = setTimeout(() => {
        setDisplayResults(results);
      }, 300);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [results]);

  if (isLoading) {
    return (
      <div className="mt-8 w-full">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
          <p className="mt-4 text-lg text-gray-600">Analyzing your query and finding the perfect matches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 w-full">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-medium">Error: {error}</p>
          <p className="mt-1">Please try again with a different query.</p>
        </div>
      </div>
    );
  }

  if (!displayResults || displayResults.length === 0) {
    if (query) {
      return (
        <div className="mt-8 w-full">
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
            <p className="font-medium">No matches found for your query.</p>
            <p className="mt-1">Try broadening your search or using different terms.</p>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="mt-8 w-full">
      {parsedQuery && (
        <div className="mb-5 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-2">I understood your query as:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parsedQuery.interests && parsedQuery.interests.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-500">Interests:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {parsedQuery.interests.map((interest: string, i: number) => (
                    <span key={i} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {parsedQuery.skills && parsedQuery.skills.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-500">Skills:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {parsedQuery.skills.map((skill: string, i: number) => (
                    <span key={i} className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {parsedQuery.vibe && (
              <div>
                <p className="text-sm font-semibold text-gray-500">Vibe:</p>
                <p className="text-sm text-gray-700">{parsedQuery.vibe}</p>
              </div>
            )}
            
            {parsedQuery.communicationStyle && (
              <div>
                <p className="text-sm font-semibold text-gray-500">Communication Style:</p>
                <p className="text-sm text-gray-700">{parsedQuery.communicationStyle}</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      <h2 className="text-xl font-semibold text-gray-800 mb-5">
        {displayResults.length} {displayResults.length === 1 ? 'match' : 'matches'} found
      </h2>
      
      <div className="grid grid-cols-1 gap-6">
        {displayResults.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
} 