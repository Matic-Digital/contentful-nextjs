/**
 * Contentful API Integration Module
 * Provides functions for fetching and managing blog articles from Contentful CMS
 */

// Types
import type {
  ContentfulResponse,
} from "@/types";

import {
  ContentfulError,
  NetworkError,
  GraphQLError,
} from './errors';

/**
 * Executes GraphQL queries against Contentful's API with caching
 * @param query - GraphQL query string
 * @param variables - GraphQL variables
 * @param preview - Whether to use preview or production content
 * @returns Promise resolving to typed API response
 * @throws Error on network or GraphQL errors
 */
export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  preview = false,
  cacheConfig?: { next: { revalidate: number } },
): Promise<ContentfulResponse<T>> {
  try {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            preview
              ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
              : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
          }`,
        },
        body: JSON.stringify({ query, variables }),
        next: cacheConfig?.next,
      },
    );

    if (!response.ok) {
      throw new NetworkError(
        `Network error: ${response.statusText}`,
        response
      );
    }

    const json = await response.json() as ContentfulResponse<T>;

    if (json.errors) {
      throw new GraphQLError(
        'GraphQL query execution error',
        json.errors as Array<{ message: string }>
      );
    }

    return json;
  } catch (error: unknown) {
    if (error instanceof NetworkError || error instanceof GraphQLError) {
      throw error;
    }
    throw new ContentfulError('Failed to fetch data from Contentful', error as Error);
  }
}