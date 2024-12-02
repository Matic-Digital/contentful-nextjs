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
  };
  errors?: Array<{ message: string }>;
}
