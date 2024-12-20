import { type Document } from "@contentful/rich-text-types";

/**
 * Represents a blog article from Contentful CMS
 * @property sys - System metadata containing the article's unique identifier
 * @property title - Article title
 * @property slug - URL-friendly version of the title
 * @property description - Rich text content with embedded assets
 * @property featuredImage - Optional header image for the article
 */
export interface Article {
  sys: {
    id: string;
  };
  title: string;
  slug: string;
  description: {
    json: Document;
    links: {
      assets: {
        block: {
          sys: {
            id: string;
          };
          url: string;
          description: string;
        };
      };
    };
  };
  featuredImage: {
    url: string;
  } | null;
  video: {
    assetId: string;
    playbackId: string;
    duration: number;
  };
}

/**
 * Processed response for article listings
 * @property items - Array of articles
 * @property total - Total number of articles available
 * @property hasMore - Indicates if there are more articles to load
 * @property totalPages - Total number of pages available
 */
export interface ArticlesResponse {
  items: Article[];
  total: number;
  hasMore: boolean;
  totalPages: number;
}

/**
 * Represents a team member from Contentful CMS
 * @property name - Team member's name
 * @property title - Team member's title or role
 * @property image - URL of the team member's image
 */
export interface TeamMember {
  name: string;
  title: string;
  image: {
    url: string;
  };
}

/**
 * Processed response for team member grid
 * @property members - Array of team members
 */
export interface TeamSection {
  members: TeamMember[];
}

/**
 * Represents a talent from Contentful CMS
 * @property sys - System metadata containing the talent's unique identifier
 * @property name - Talent's name
 */
export interface Talent {
  sys: {
    id: string;
  };
  name: string;
  slug: string;
  headshot: {
    url: string;
  };
  location: {
    lat: number;
    lon: number;
  }
  tier: {
    sys: {
      id: string;
    };
    name: string;
  };
  linkedFrom: {
    educationCollection: {
      items: Array<{
        sys: {
          id: string;
        };
        institution: string;
        degreeName: string;
        location: {
          lat: number;
          lon: number;
        }
        timeframe: string;
      }>;
    };
  };
  awards: {
    sys: {
      id: string;
    };
    awardName: string;
    awardDate: {
      start: string;
    };
    description: {
      json: Document;
    };
  };
  languages: {
    sys: {
      id: string;
    };
    name: string;
    type: string;
  };
}

export interface Tier {
  sys: {
    id: string;
  };
  name: string;
  description: {
    json: Document;
  };
  talent: Array<{
    sys: {
      id: string;
    };
  }>;
}

export interface Profile {
  sys: {
    id: string;
  };
  talent?: {
    sys: {
      id: string;
    };
  };
  slug?: string;
  profileType?: {
    sys: {
      id: string;
    };
  };
  talentBriefDescription?: {
    json: Document;
  };
  role: string;
  focus?: string;
  rate?: number;
  engagementType?: Array<'Full-Time' | 'Dedicated' | 'Fractional'>;
  technicalEvaluation?: Array<{
    sys: {
      id: string;
    };
  }>;
  experience?: number;
  workSamples?: Array<{
    sys: {
      id: string;
    };
  }>;
  markets?: Array<{
    sys: {
      id: string;
    };
  }>;
  sectors?: Array<{
    sys: {
      id: string;
    };
  }>;
  skills?: string[];
  tools?: string[];
  rolesBackground?: Array<{
    sys: {
      id: string;
    };
  }>;
}

export interface Education {
  sys: {
    id: string;
  };
  institution: string;
  degreeName: string;
  location: {
    lat: number;
    lon: number;
  }
  timeframe: {
    start: string;
    end: string;
  }
}

export interface Awards {
  sys: {
    id: string;
  };
  awardName: string;
  awardDate: {
    start: string;
  };
  description: {
    json: Document;
  };
}

export interface Language {
  sys: {
    id: string;
  };
  name: string;
  type: string;
  talent: Array<{
    sys: {
      id: string;
    };
  }>;
}

/**
 * Raw response structure from Contentful GraphQL API
 * @template T - The type of items in the collection (usually Article)
 * @property data - Contains the blog article collection if request succeeds
 * @property errors - Contains error details if request fails
 */
export interface ContentfulResponse<T> {
  data?: {
    blogArticleCollection?: {
      items: Article[];
      total: number;
    };
    teamMemberCollection?: {
      items: T[];
      total: number;
    };
    talentCollection?: {
      items: Talent[];
      total: number;
    };
    tierCollection?: {
      items: Tier[];
      total: number;
    };
    profileCollection?: {
      items: Profile[];
      total: number;
    };
    educationCollection?: {
      items: Education[];
      total: number;
    };
    awardsCollection?: {
      items: Awards[];
      total: number;
    };
    languagesCollection?: {
      items: Language[];
      total: number;
    };
  };
  errors?: Array<{ message: string }>;
}
