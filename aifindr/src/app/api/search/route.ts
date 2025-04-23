import { NextResponse } from 'next/server';

// Mock database of profiles for demo purposes
const profilesDatabase = [
  {
    id: 1,
    name: 'Alex Thompson',
    bio: 'Documentary filmmaker with a passion for hiking trails across America. Known for witty banter and Tarantino-esque dialogue in personal projects.',
    interests: ['filmmaking', 'hiking', 'travel', 'cinema', 'storytelling'],
    projects: ['Wild America', 'Urban Legends', 'The Hiking Chronicles'],
    skills: ['directing', 'writing', 'editing', 'photography'],
    vibe: 'Creative, adventurous, slightly sarcastic but warm'
  },
  {
    id: 2,
    name: 'Jamie Chen',
    bio: 'Digital artist combining traditional techniques with AI tools. Loves slow cinema and going on long hikes to find inspiration for abstract landscapes.',
    interests: ['digital art', 'AI', 'hiking', 'abstract art', 'slow cinema'],
    projects: ['Neural Landscapes', 'Digital Dreams', 'Mountain Memories'],
    skills: ['painting', 'AI art', 'digital design', 'photography'],
    vibe: 'Thoughtful, introspective, with subtle humor'
  },
  {
    id: 3,
    name: 'Jordan Rivera',
    bio: 'Software engineer by day, stand-up comedian by night. Creates satirical apps and loves absurdist humor. Hiking enthusiast who codes at mountain summits.',
    interests: ['coding', 'comedy', 'hiking', 'absurdist humor', 'app development'],
    projects: ['Laugh.js', 'Summit Code', 'The Comedy Algorithm'],
    skills: ['programming', 'comedy writing', 'public speaking', 'app design'],
    vibe: 'Energetic, quick-witted, with Tarantino-like pop culture references'
  },
  {
    id: 4,
    name: 'Morgan Kelly',
    bio: 'Environmental scientist specializing in forest ecosystems. Amateur filmmaker creating short documentaries about nature. Loves quiet contemplation and Stanley Kubrick films.',
    interests: ['environmental science', 'filmmaking', 'forests', 'documentaries', 'classic cinema'],
    projects: ['Forest Whispers', 'The Soil Chronicle', 'Silent Woods'],
    skills: ['research', 'data analysis', 'filming', 'scientific writing'],
    vibe: 'Calm, methodical, with deep thoughtfulness'
  },
  {
    id: 5,
    name: 'Taylor Washington',
    bio: 'Pop culture journalist with a focus on film criticism. Writes with a distinct voice that blends academic analysis with pulp sensibilities. Hikes to clear writer\'s block.',
    interests: ['film criticism', 'pop culture', 'hiking', 'writing', 'pulp fiction'],
    projects: ['Screen Speak', 'Culture Pulse', 'Trail & Error'],
    skills: ['critical analysis', 'interviewing', 'editorial writing', 'trend spotting'],
    vibe: 'Sharp, opinionated, with Tarantino-inspired dialogue patterns'
  },
  {
    id: 6,
    name: 'Sam Cortes',
    bio: 'Marine biologist specializing in coral reefs. Creates underwater photography and short documentaries about ocean life. Passionate about sea conservation.',
    interests: ['marine biology', 'sea', 'ocean', 'photography', 'conservation'],
    projects: ['Coral Chronicles', 'Deep Blue', 'Ocean Wonders'],
    skills: ['research', 'diving', 'photography', 'scientific writing'],
    vibe: 'Passionate, calm, with a deep appreciation for nature'
  }
];

// Common interests, skills, and communication styles for keyword matching
const knownKeywords = {
  interests: [
    'filmmaking', 'hiking', 'travel', 'cinema', 'storytelling', 'digital art', 'AI', 
    'abstract art', 'slow cinema', 'coding', 'comedy', 'absurdist humor', 'app development',
    'environmental science', 'forests', 'documentaries', 'classic cinema', 'film criticism',
    'pop culture', 'writing', 'pulp fiction', 'art', 'tech', 'nature', 'adventure', 'sea', 'ocean'
  ],
  skills: [
    'directing', 'writing', 'editing', 'photography', 'painting', 'AI art', 'digital design',
    'programming', 'comedy writing', 'public speaking', 'app design', 'research', 'data analysis',
    'filming', 'scientific writing', 'critical analysis', 'interviewing', 'editorial writing',
    'trend spotting', 'creative', 'technical', 'analytical', 'communication'
  ],
  vibes: [
    'creative', 'adventurous', 'sarcastic', 'warm', 'thoughtful', 'introspective', 
    'humorous', 'energetic', 'quick-witted', 'calm', 'methodical', 'sharp', 'opinionated',
    'fun', 'serious', 'intellectual', 'artistic', 'technical', 'funny', 'witty'
  ],
  communicationStyles: [
    'tarantino', 'kubrick', 'witty', 'banter', 'thoughtful', 'analytical', 
    'academic', 'conversational', 'direct', 'eloquent', 'precise'
  ]
};

// Parse query using rule-based approach
function parseQuery(query: string) {
  const lowercaseQuery = query.toLowerCase();
  const queryWords = lowercaseQuery.split(/\s+/);
  
  // Extract keywords based on our known lists
  const extractedKeywords = {
    interests: [] as string[],
    skills: [] as string[],
    vibe: "",
    communicationStyle: ""
  };
  
  // Function to check if query contains any keywords from a list
  const findKeywords = (list: string[], includePartial = false) => {
    return list.filter(keyword => {
      // Check for exact match
      if (lowercaseQuery.includes(keyword.toLowerCase())) {
        return true;
      }
      
      // Optionally check for partial matches in individual words
      if (includePartial) {
        const keywordParts = keyword.toLowerCase().split(/\s+/);
        return keywordParts.some(part => 
          part.length > 3 && queryWords.some(word => word.includes(part))
        );
      }
      
      return false;
    });
  };
  
  // Extract interests
  extractedKeywords.interests = findKeywords(knownKeywords.interests, true);
  
  // Extract skills
  extractedKeywords.skills = findKeywords(knownKeywords.skills, true);
  
  // Extract vibe - combine all matching vibes
  const matchingVibes = findKeywords(knownKeywords.vibes);
  if (matchingVibes.length > 0) {
    extractedKeywords.vibe = matchingVibes.join(', ');
  }
  
  // Check for communication style references
  const communicationMatches = findKeywords(knownKeywords.communicationStyles);
  if (communicationMatches.length > 0) {
    extractedKeywords.communicationStyle = communicationMatches[0];
    
    // Special case for Tarantino reference
    if (lowercaseQuery.includes('tarantino') || lowercaseQuery.includes('talk like tarantino')) {
      extractedKeywords.communicationStyle = 'tarantino';
    }
  }
  
  // Do some additional checks for common phrases
  if (lowercaseQuery.includes('like to hike') || lowercaseQuery.includes('enjoy hiking')) {
    if (!extractedKeywords.interests.includes('hiking')) {
      extractedKeywords.interests.push('hiking');
    }
  }
  
  if (lowercaseQuery.includes('make films') || lowercaseQuery.includes('create movies')) {
    if (!extractedKeywords.interests.includes('filmmaking')) {
      extractedKeywords.interests.push('filmmaking');
    }
  }
  
  if (lowercaseQuery.includes('love sea') || lowercaseQuery.includes('love ocean') || 
      lowercaseQuery.includes('like sea') || lowercaseQuery.includes('like ocean')) {
    if (!extractedKeywords.interests.includes('sea')) {
      extractedKeywords.interests.push('sea');
    }
    if (!extractedKeywords.interests.includes('ocean')) {
      extractedKeywords.interests.push('ocean');
    }
  }
  
  return extractedKeywords;
}

// Generate a templated explanation based on matching features
function generateExplanation(profile: any, query: string, parsedQuery: any) {
  const explanations = [];
  const lowercaseQuery = query.toLowerCase();
  
  // Check for interest matches
  const matchingInterests = profile.interests.filter((interest: string) => 
    parsedQuery.interests.includes(interest)
  );
  
  if (matchingInterests.length > 0) {
    if (matchingInterests.length === 1) {
      explanations.push(`Shares your interest in ${matchingInterests[0]}.`);
    } else {
      explanations.push(`Shares multiple interests including ${matchingInterests.slice(0, 2).join(' and ')}.`);
    }
  }
  
  // Check for skill matches
  const matchingSkills = profile.skills.filter((skill: string) => 
    parsedQuery.skills.includes(skill)
  );
  
  if (matchingSkills.length > 0) {
    explanations.push(`Has skills in ${matchingSkills[0]}${matchingSkills.length > 1 ? ' and more' : ''}.`);
  }
  
  // Check for communication style matches
  if (parsedQuery.communicationStyle === 'tarantino' && 
      (profile.bio.toLowerCase().includes('tarantino') || profile.vibe.toLowerCase().includes('tarantino'))) {
    explanations.push('Has a Tarantino-like communication style.');
  }
  
  // If no specific matches, provide a generic explanation
  if (explanations.length === 0) {
    if (profile.interests.includes('hiking') && lowercaseQuery.includes('hik')) {
      explanations.push('Enjoys hiking and outdoor activities.');
    } else if (profile.interests.includes('filmmaking') && 
              (lowercaseQuery.includes('film') || lowercaseQuery.includes('movie'))) {
      explanations.push('Works in filmmaking and visual storytelling.');
    } else {
      explanations.push(`Has a ${profile.vibe.split(',')[0].toLowerCase()} personality that might match what you're looking for.`);
    }
  }
  
  return explanations.join(' ');
}

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Use rule-based approach to parse the query
    const parsedQuery = parseQuery(query);
    
    // Calculate matches based on the parsed query
    const results = profilesDatabase.map(profile => {
      // Simple scoring system
      let score = 0;
      
      // Match interests
      if (parsedQuery.interests.length > 0) {
        parsedQuery.interests.forEach((interest: string) => {
          if (profile.interests.some(i => i.toLowerCase().includes(interest.toLowerCase()))) {
            score += 2;
          }
        });
      }
      
      // Match skills
      if (parsedQuery.skills.length > 0) {
        parsedQuery.skills.forEach((skill: string) => {
          if (profile.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))) {
            score += 2;
          }
        });
      }
      
      // Match vibe/communication style
      if (parsedQuery.vibe) {
        const vibeTerms = parsedQuery.vibe.toLowerCase().split(' ');
        vibeTerms.forEach((term: string) => {
          if (profile.vibe.toLowerCase().includes(term)) {
            score += 1;
          }
        });
      }
      
      if (parsedQuery.communicationStyle) {
        if (
          profile.bio.toLowerCase().includes(parsedQuery.communicationStyle.toLowerCase()) ||
          profile.vibe.toLowerCase().includes(parsedQuery.communicationStyle.toLowerCase())
        ) {
          score += 3; // Higher weight for specific communication style
        }
      }

      return {
        ...profile,
        score,
      };
    });

    // Sort by score
    const sortedResults = results
      .filter(profile => profile.score > 0)
      .sort((a, b) => b.score - a.score);

    // Generate templated explanations for each match
    const resultsWithExplanations = sortedResults.map((profile) => {
      return {
        ...profile,
        explanation: generateExplanation(profile, query, parsedQuery)
      };
    });

    return NextResponse.json({ 
      results: resultsWithExplanations,
      parsedQuery 
    });
    
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Failed to process search' }, { status: 500 });
  }
} 