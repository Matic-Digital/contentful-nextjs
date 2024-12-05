/**
 * Contentful API Integration Module
 * Provides functions for fetching and managing blog articles from Contentful CMS
 */

// Types
import type {
  Article,
  TeamMember,
  ArticlesResponse,
  ContentfulResponse,
} from "@/types";

import {
  ContentfulError,
  NetworkError,
  GraphQLError,
  ResourceNotFoundError,
} from './errors';

/**
 * GraphQL fragment defining the structure of article data to fetch
 * Includes system metadata, content, and media assets
 */
const ARTICLE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  slug
  description {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
  featuredImage {
    url
    description
    width
    height
  }
  video
`;

const TEAM_MEMBER_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  title
  image {
    url
  }
`;

/**
 * Executes GraphQL queries against Contentful's API with caching
 * @param query - GraphQL query string
 * @param variables - GraphQL variables
 * @param preview - Whether to use preview or production content
 * @returns Promise resolving to typed API response
 * @throws Error on network or GraphQL errors
 */
async function fetchGraphQL<T>(
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

    const json = (await response.json()) as ContentfulResponse<T>;

    if (json.errors) {
      throw new GraphQLError(
        'GraphQL query execution error',
        json.errors
      );
    }

    return json;
  } catch (error) {
    if (error instanceof NetworkError || error instanceof GraphQLError) {
      throw error;
    }
    throw new ContentfulError('Failed to fetch data from Contentful', error);
  }
}

export const ARTICLES_PER_PAGE = 3;

/**
 * Fetches a paginated list of articles
 * @param limit - Maximum number of articles to fetch (default: 3)
 * @param isDraftMode - Whether to fetch draft content (default: false)
 * @param skip - Number of articles to skip for pagination (default: 0)
 * @returns Promise resolving to articles response with pagination info
 */
export async function getAllArticles(
  limit = ARTICLES_PER_PAGE,
  isDraftMode = false,
  skip = 0,
): Promise<ArticlesResponse> {
  try {
    console.log("Fetching articles:", { limit, skip, isDraftMode });

    const response = await fetchGraphQL(
      `query GetArticles($limit: Int!, $skip: Int!) {
        blogArticleCollection(limit: $limit, skip: $skip, order: sys_firstPublishedAt_DESC) {
          total
          items {
            ${ARTICLE_GRAPHQL_FIELDS}
          }
        }
      }`,
      { limit, skip },
      isDraftMode,
    );

    // Check for GraphQL errors
    if (response.errors) {
      throw new GraphQLError(
        'GraphQL query execution error',
        response.errors
      );
    }

    console.log("GraphQL Response:", response.data?.blogArticleCollection);

    const collection = response.data?.blogArticleCollection;
    if (!collection) {
      return { items: [], total: 0, hasMore: false, totalPages: 0 };
    }

    const result = {
      items: collection.items,
      total: collection.total,
      hasMore: skip + limit < collection.total,
      totalPages: Math.ceil(collection.total / limit),
    };

    console.log("Returning articles:", result);
    return result;
  } catch (error) {
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new ContentfulError('Failed to fetch articles', error);
  }
}

/**
 * Fetches a single article by its slug
 * @param slug - URL-friendly identifier for the article
 * @param isDraftMode - Whether to fetch draft content (default: false)
 * @returns Promise resolving to the article or null if not found
 */
export async function getArticle(
  slug: string,
  isDraftMode = false,
): Promise<Article | null> {
  try {
    const response = await fetchGraphQL<Article>(
      `query GetArticle {
        blogArticleCollection(
          where: { slug: "${slug}" },
          limit: 1,
        ) {
          items {
            ${ARTICLE_GRAPHQL_FIELDS}
          }
        }
      }`,
      {},
      isDraftMode,
    );

    // Check for GraphQL errors
    if (response.errors) {
      throw new GraphQLError(
        'GraphQL query execution error',
        response.errors
      );
    }

    const article = response.data?.blogArticleCollection?.items[0];

    if (!article) {
      throw new ResourceNotFoundError(
        `Article with slug '${slug}' not found`,
        'article'
      );
    }

    return article;
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      throw error;
    }
    throw new ContentfulError('Failed to fetch article', error);
  }
}

export async function getTeamMembers(
  isDraftMode = false,
): Promise<TeamMember[]> {
  try {
    const response = await fetchGraphQL<TeamMember>(
      `query GetTeamMembers {
        teamMemberCollection {
          items {
            ${TEAM_MEMBER_GRAPHQL_FIELDS}
          }
        }
      }`,
      {},
      isDraftMode,
    );

    // Check for GraphQL errors
    if (response.errors) {
      throw new GraphQLError(
        'GraphQL query execution error',
        response.errors
      );
    }

    // Add null check and return empty array if no team members found
    return response.data?.teamMemberCollection?.items ?? [];
  } catch (error) {
    throw new ContentfulError('Failed to fetch team members', error);
  }
}
