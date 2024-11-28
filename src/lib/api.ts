/**
 * Contentful API Integration Module
 * Provides functions for fetching and managing blog articles from Contentful CMS
 */

// Types
import {
  Article,
  TeamMember,
  ArticlesResponse,
  ContentfulError,
  ContentfulResponse,
} from "./types";

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
 * @param preview - Whether to use preview or production content
 * @returns Promise resolving to typed API response
 * @throws ContentfulError on network or GraphQL errors
 */
async function fetchGraphQL<T>(
  query: string,
  preview = false,
): Promise<ContentfulResponse<T>> {
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
      body: JSON.stringify({ query }),
      next: {
        revalidate: 3600, // Cache for 1 hour
        tags: ["contentful"],
      },
    },
  );

  if (!response.ok) {
    throw new ContentfulError(`Failed to fetch data: ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new ContentfulError("GraphQL Error", json.errors);
  }

  return json;
}

/**
 * Fetches a paginated list of articles
 * @param limit - Maximum number of articles to fetch (default: 3)
 * @param isDraftMode - Whether to fetch draft content (default: false)
 * @param skip - Number of articles to skip for pagination (default: 0)
 * @returns Promise resolving to articles response with pagination info
 * @throws ContentfulError if articles cannot be extracted from response
 */
export async function getAllArticles(
  limit = 3,
  isDraftMode = false,
  skip = 0,
): Promise<ArticlesResponse> {
  console.log("Fetching articles with:", { limit, skip });

  const response = await fetchGraphQL<Article>(
    `query GetArticles {
      blogArticleCollection(
        limit: ${limit},
        skip: ${skip},
        order: sys_firstPublishedAt_DESC
      ) {
        items {
          ${ARTICLE_GRAPHQL_FIELDS}
        }
        total
      }
    }`,
    isDraftMode,
  );

  const collection = response.data?.blogArticleCollection;

  if (!collection?.items) {
    throw new ContentfulError("Failed to extract articles from response");
  }

  const { items, total } = collection;
  console.log("Contentful Response:", {
    itemsCount: items.length,
    total,
    skip,
    limit,
    raw: response.data?.blogArticleCollection,
  });

  return { items, total, hasMore: skip + items.length < total };
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
    isDraftMode,
  );

  const article = response.data?.blogArticleCollection?.items[0];
  return article ?? null;
}

export async function getTeamMembers(
  isDraftMode = false,
): Promise<TeamMember[]> {
  const response = await fetchGraphQL<TeamMember>(
    `query GetTeamMembers {
      teamMemberCollection {
        items {
          ${TEAM_MEMBER_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode,
  );

  // Add null check and return empty array if no team members found
  return response.data?.teamMemberCollection?.items || [];
}