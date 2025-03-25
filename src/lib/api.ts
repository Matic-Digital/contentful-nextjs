/**
 * Contentful API Integration Module
 * Provides functions for fetching and managing blog articles from Contentful CMS
 */

// Types
import type {
  Hero,
  ContentfulResponse,
  HeroResponse,
} from "@/types";

import {
  ContentfulError,
  NetworkError,
  GraphQLError,
} from './errors';


const HERO_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  description
  __typename
`;



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

export const HEROES_PER_PAGE = 10;

/**
 * Fetches all heroes from Contentful
 * @param preview - Whether to fetch draft content
 * @param limit - Maximum number of heroes to fetch
 * @param skip - Number of heroes to skip for pagination
 * @returns Promise resolving to heroes response with pagination info
 */
export async function getAllHeroes(
  preview = false,
  limit = HEROES_PER_PAGE,
  skip = 0
): Promise<HeroResponse> {
  try {
    console.log("Fetching heroes:", { limit, skip, preview });

    const response = await fetchGraphQL<Hero>(
      `query GetHeroes($preview: Boolean!, $limit: Int!, $skip: Int!) {
        heroCollection(preview: $preview, limit: $limit, skip: $skip) {
          items {
            ${HERO_GRAPHQL_FIELDS}
          }
          total
        }
      }`,
      { preview, limit, skip },
      preview,
      preview ? undefined : { next: { revalidate: 60 } }
    );

    // Check for GraphQL errors
    if (response.errors) {
      throw new GraphQLError(
        'GraphQL query execution error',
        response.errors
      );
    }

    console.log("GraphQL Response:", response.data?.heroCollection);

    const collection = response.data?.heroCollection;
    if (!collection) {
      return { items: [], total: 0 };
    }

    return collection;
  } catch (error: unknown) {
    console.error('Error fetching heroes:', error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new ContentfulError('Failed to fetch heroes', error as Error);
  }
}

/**
 * Fetches a single hero by ID
 * @param id - The ID of the hero to fetch
 * @param preview - Whether to fetch draft content
 * @returns Promise resolving to the hero or null if not found
 */
export async function getHero(
  id: string,
  preview = true
): Promise<Hero | null> {
  try {
    const response = await fetchGraphQL<Hero>(
      `query GetHero($id: String!, $preview: Boolean!) {
        heroCollection(
          where: { sys: { id: $id } },
          limit: 1,
          preview: $preview
        ) {
          items {
            ${HERO_GRAPHQL_FIELDS}
          }
        }
      }`,
      { id, preview },
      preview,
      preview ? undefined : { next: { revalidate: 60 } }
    );

    // Check for GraphQL errors
    if (response.errors) {
      throw new GraphQLError(
        'GraphQL query execution error',
        response.errors
      );
    }

    const hero = response.data?.heroCollection?.items[0];
    
    if (!hero) {
      console.log(`Hero with ID '${id}' not found`);
      return null;
    }

    return hero;
  } catch (error: unknown) {
    console.error(`Error fetching hero with ID '${id}':`, error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new ContentfulError('Failed to fetch hero', error as Error);
  }
}