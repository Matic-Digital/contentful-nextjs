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
  profileType: 'Strategy' | 'Design' | 'Engineering' | 'Management';
  profileTags?: string[];
  talentBriefDescription?: {
    json: Document;
  };
  talentBriefLocation?: string;
  level?: 'Junior' | 'Mid' | 'Senior' | 'Director';
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
  markets?: string[];
  sectors?: string[];
  skills?: string[];
  tools?: string[];
  availability?: string;
  notes: {
    json: Document;
  }
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
  timeframe: string;
}

export interface Awards {
  sys: {
    id: string;
  };
  awardName: string;
  awardDate: string;
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
 * Represents a work sample from Contentful CMS
 * @property sys - System metadata containing the work sample's unique identifier
 * @property talent - Reference to the associated talent
 * @property sampleName - Name of the work sample
 * @property sampleType - Type of work sample (Contract, Employee, Project)
 * @property title - Title of the work sample
 * @property briefDescription - Rich text description of the work sample
 * @property featuredImage - Optional featured image
 * @property sampleGalleryCollection - Optional gallery of images
 * @property roleTags - Optional array of role tags
 */
export interface WorkSample {
  sys: {
    id: string;
  };
  talent?: {
    sys: {
      id: string;
    };
  };
  sampleName: string;
  sampleType?: 'Contract' | 'Employee' | 'Project';
  title: string;
  briefDescription: {
    json: Document;
  };
  featuredImage?: {
    url: string;
  };
  sampleGalleryCollection?: {
    items: Array<{
      url: string;
    }>;
  };
  roleTags?: string[];
}

/**
 * Represents a professional background entry from Contentful CMS
 * @property sys - System metadata containing the entry's unique identifier
 * @property talent - Reference to the associated talent
 * @property companyName - Name of the company
 * @property companyLogo - Optional company logo
 * @property startDate - Start date of the role
 * @property endDate - Optional end date of the role
 * @property roleTitle - Title of the role
 * @property roleDescription - Rich text description of the role
 */
export interface ProfessionalBackground {
  sys: {
    id: string;
  };
  talent?: {
    sys: {
      id: string;
    };
  };
  companyName?: string;
  companyLogo?: {
    url: string;
  };
  startDate?: string;
  endDate?: string;
  roleTitle?: string;
  roleDescription?: {
    json: Document;
  };
}

export interface TechSpecification {
  sys: {
    id: string;
  };
  talent: {
    sys: {
      id: string;
    };
  };
  repo?: string;
  evaluationField: string;
  blendedScore: number;
  field1: string;
  field1Score: number;
  field1Description: {
    json: Document;
  };
  field2: string;
  field2Score: number;
  field2Description: {
    json: Document;
  };
  field3: string;
  field3Score: number;
  field3Description: {
    json: Document;
  };
  field4: string;
  field4Score: number;
  field4Description: {
    json: Document;
  };
  field5: string;
  field5Score: number;
  field5Description: {
    json: Document;
  };
  field6: string;
  field6Score: number;
  field6Description: {
    json: Document;
  };
  field7: string;
  field7Score: number;
  field7Description: {
    json: Document;
  };
  field8: string;
  field8Score: number;
  field8Description: {
    json: Document;
  };
}

/**
 * Raw response structure from Contentful GraphQL API
 * @template T - The type of items in the collection (usually Article)
 * @property data - Contains the blog article collection if request succeeds
 * @property errors - Contains error details if request fails
 */
export interface ContentfulResponse<T = unknown> {
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
    workSamplesCollection?: {
      items: WorkSample[];
      total: number;
    };
    professionalBackgroundCollection?: {
      items: ProfessionalBackground[];
      total: number;
    };
    techSpecificationCollection?: {
      items: TechSpecification[];
      total: number;
    };
  };
  errors?: Array<{ message: string }>;
}
