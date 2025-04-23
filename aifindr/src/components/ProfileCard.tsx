'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export interface Profile {
  id: number;
  name: string;
  bio: string;
  interests: string[];
  projects: string[];
  skills: string[];
  vibe: string;
  score: number;
  explanation: string;
}

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold text-purple-800">{profile.name}</h2>
          <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">
            Match: {Math.round((profile.score / 10) * 100)}%
          </div>
        </div>
        
        <p className="mt-2 text-gray-600">{profile.bio}</p>
        
        {profile.explanation && (
          <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
            <p className="text-purple-700 text-sm italic">{profile.explanation}</p>
          </div>
        )}
        
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Interests</h3>
          <div className="mt-1 flex flex-wrap gap-2">
            {profile.interests.map((interest, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
        
        {expanded && (
          <>
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Skills</h3>
              <div className="mt-1 flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Projects</h3>
              <div className="mt-1 flex flex-wrap gap-2">
                {profile.projects.map((project, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
                  >
                    {project}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Vibe</h3>
              <p className="mt-1 text-gray-600">{profile.vibe}</p>
            </div>
          </>
        )}
        
        <button 
          onClick={toggleExpanded} 
          className="mt-4 flex items-center text-purple-600 hover:text-purple-800 transition-colors text-sm font-medium"
        >
          {expanded ? (
            <>
              Show less <FaChevronUp className="ml-1" />
            </>
          ) : (
            <>
              Show more <FaChevronDown className="ml-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );
} 