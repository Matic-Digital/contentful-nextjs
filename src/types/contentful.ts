// Uncomment when needed
// import { type Document } from "@contentful/rich-text-types";

/**
 * Raw response structure from Contentful GraphQL API
 * @template T - The type of data in the response
 * @property data - Contains the response data if request succeeds
 * @property errors - Contains error details if request fails
 */
export interface ContentfulResponse<T = unknown> {
  data?: Record<string, T>;
  errors?: Array<{ message: string }>;
}
