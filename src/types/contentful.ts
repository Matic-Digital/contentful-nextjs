// Uncomment when needed
// import { type Document } from "@contentful/rich-text-types";

export interface Hero {
  sys: {
    id: string;
  };
  description?: string;
}

export interface HeroResponse {
  items: Hero[];
  total: number;
}

/**
 * Raw response structure from Contentful GraphQL API
 * @template T - The type of data in the response
 * @property data - Contains the response data if request succeeds
 * @property errors - Contains error details if request fails
 */
export interface ContentfulResponse<T> {
  data?: {
    heroCollection?: {
      items: T[];
      total: number;
    };
  };
  errors?: Array<{ message: string }>;
}
