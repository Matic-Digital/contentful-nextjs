/**
 * Contentful API Integration Module
 * Provides functions for fetching and managing blog articles from Contentful CMS
 */

// Types
import type {
  Hero,
  HeroResponse,
  Page,
  Footer,
  FooterResponse,
  PageResponse,
  PageList,
  PageListResponse,
  NavBar,
  NavBarResponse,
  GraphQLResponse,
} from "@/types";

import {
  ContentfulError,
  NetworkError,
  GraphQLError,
} from './errors';

// Base fields for all content types
const SYS_FIELDS = `
  sys {
    id
  }
  __typename
`;

// Asset fields
const ASSET_FIELDS = `
  sys {
    id
  }
  title
  description
  url
  width
  height
`;

// Hero fields
const HERO_GRAPHQL_FIELDS = `
  ${SYS_FIELDS}
  name
  description
`;

// Page fields (without circular references)
const PAGE_BASIC_FIELDS = `
  ${SYS_FIELDS}
  name
  slug
  description
`;

// PageList fields (without circular references)
const PAGELIST_BASIC_FIELDS = `
  ${SYS_FIELDS}
  name
  slug
`;

// NavBar fields
const NAVBAR_GRAPHQL_FIELDS = `
  ${SYS_FIELDS}
  name
  logo {
    ${ASSET_FIELDS}
  }
  navLinksCollection {
    items {
      ... on Page {
        ${PAGE_BASIC_FIELDS}
      }
      ... on PageList {
        ${PAGELIST_BASIC_FIELDS}
      }
    }
  }
`;

// Footer fields
const FOOTER_GRAPHQL_FIELDS = `
  ${SYS_FIELDS}
  name
  description
  copyright
  logo {
    ${ASSET_FIELDS}
  }
  pageListsCollection(limit: 5) {
    items {
      ... on PageList {
        ${PAGELIST_BASIC_FIELDS}
        pagesCollection(limit: 10) {
          items {
            ... on Page {
              ${PAGE_BASIC_FIELDS}
            }
          }
        }
      }
    }
  }
`;

// Complete PageList fields (with page references)
const PAGELIST_GRAPHQL_FIELDS = `
  ${PAGELIST_BASIC_FIELDS}
  pagesCollection(limit: 10) {
    items {
      ... on Page {
        ${PAGE_BASIC_FIELDS}
      }
    }
  }
`;

// Complete Page fields (with component references)
const PAGE_GRAPHQL_FIELDS = `
  ${PAGE_BASIC_FIELDS}
  header {
    ${NAVBAR_GRAPHQL_FIELDS}
  }
  footer {
    ${FOOTER_GRAPHQL_FIELDS}
  }
  pageContentCollection {
    items {
      ... on Hero {
        ${HERO_GRAPHQL_FIELDS}
      }
    }
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
export async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {},
  preview = false,
  cacheConfig?: { next: { revalidate: number } },
): Promise<GraphQLResponse<T>> {
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
      try {
        // Try to clone the response to read the body without consuming it
        const clonedResponse = response.clone();
        const responseBody = await clonedResponse.text();
        console.error('GraphQL error response body:', responseBody);
      } catch (cloneError) {
        // If cloning fails, just log the error and continue
        console.error('Error cloning response:', cloneError);
      }
      
      // This matches the test expectation
      throw new NetworkError(`Network error: ${response.statusText}`, response);
    }

    const json = await response.json() as GraphQLResponse<T>;

    // Check for GraphQL errors - ensure we're checking the array length
    if (json.errors && json.errors.length > 0) {
      throw new GraphQLError('GraphQL query execution error', json.errors);
    }

    return json;
  } catch (error: unknown) {
    console.error('Error in fetchGraphQL:', error);
    
    // Re-throw NetworkError and GraphQLError as they are already properly formatted
    if (error instanceof NetworkError || error instanceof GraphQLError) {
      throw error;
    }
    
    // For any other errors, wrap in ContentfulError
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
  skip = 0,
): Promise<HeroResponse> {
  try {
    const response = await fetchGraphQL<Hero>(
      `query GetAllHeroes($preview: Boolean!, $limit: Int!, $skip: Int!) {
        heroCollection(preview: $preview, limit: $limit, skip: $skip) {
          items {
            ${HERO_GRAPHQL_FIELDS}
          }
          total
        }
      }`,
      { preview, limit, skip },
      preview,
    );

    if (!response.data?.heroCollection) {
      throw new ContentfulError("Failed to fetch heroes from Contentful");
    }

    return {
      items: response.data.heroCollection.items,
      total: response.data.heroCollection.total,
    };
  } catch (error) {
    if (error instanceof ContentfulError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new NetworkError(`Error fetching heroes: ${error.message}`);
    }
    throw new Error("Unknown error fetching heroes");
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
  preview = true,
): Promise<Hero | null> {
  try {
    const response = await fetchGraphQL<Hero>(
      `query GetHeroById($id: String!, $preview: Boolean!) {
        heroCollection(where: { sys: { id: $id } }, limit: 1, preview: $preview) {
          items {
            ${HERO_GRAPHQL_FIELDS}
          }
        }
      }`,
      { id, preview },
      preview,
    );

    if (!response.data?.heroCollection?.items?.length) {
      return null;
    }

    return response.data.heroCollection.items[0]!;
  } catch (error) {
    if (error instanceof Error) {
      throw new NetworkError(`Error fetching hero: ${error.message}`);
    }
    throw new Error("Unknown error fetching hero");
  }
}

/**
 * Fetches all pages from Contentful
 * @param preview - Whether to fetch draft content
 * @param skip - Number of pages to skip for pagination
 * @param limit - Maximum number of pages to fetch
 * @returns Promise resolving to pages response with pagination info
 */
export async function getAllPages(
  preview = false,
  skip = 0,
  limit = 10,
): Promise<PageResponse> {
  try {
    const response = await fetchGraphQL<Page>(
      `query GetAllPages($preview: Boolean!, $skip: Int!, $limit: Int!) {
        pageCollection(preview: $preview, skip: $skip, limit: $limit) {
          items {
            ${PAGE_GRAPHQL_FIELDS}
          }
          total
        }
      }`,
      { preview, skip, limit },
      preview,
    );

    if (!response.data?.pageCollection) {
      throw new ContentfulError("Failed to fetch pages from Contentful");
    }

    return {
      items: response.data.pageCollection.items,
      total: response.data.pageCollection.total,
    };
  } catch (error) {
    if (error instanceof ContentfulError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new NetworkError(`Error fetching pages: ${error.message}`);
    }
    throw new Error("Unknown error fetching pages");
  }
}

/**
 * Fetches a single page by slug
 * @param slug - The slug of the page to fetch
 * @param preview - Whether to fetch draft content
 * @returns Promise resolving to the page or null if not found
 */
export async function getPageBySlug(
  slug: string,
  preview = true,
): Promise<Page | null> {
  try {
    const response = await fetchGraphQL<Page>(
      `query GetPageBySlug($slug: String!, $preview: Boolean!) {
        pageCollection(where: { slug: $slug }, limit: 1, preview: $preview) {
          items {
            ${PAGE_GRAPHQL_FIELDS}
          }
        }
      }`,
      { slug, preview },
      preview,
    );

    if (!response.data?.pageCollection?.items?.length) {
      return null;
    }

    return response.data.pageCollection.items[0]!;
  } catch (error) {
    if (error instanceof Error) {
      throw new NetworkError(`Error fetching page by slug: ${error.message}`);
    }
    throw new Error("Unknown error fetching page by slug");
  }
}

/**
 * Fetches all page lists from Contentful
 * @param preview - Whether to fetch draft content
 * @returns Promise resolving to page lists response
 */
export async function getAllPageLists(preview = false): Promise<PageListResponse> {
  try {
    const response = await fetchGraphQL<PageList>(
      `query GetAllPageLists($preview: Boolean!) {
        pageListCollection(preview: $preview) {
          items {
            ${PAGELIST_GRAPHQL_FIELDS}
          }
          total
        }
      }`,
      { preview },
      preview,
    );

    if (!response.data?.pageListCollection) {
      throw new ContentfulError("Failed to fetch page lists from Contentful");
    }

    return {
      items: response.data.pageListCollection.items,
      total: response.data.pageListCollection.total,
    };
  } catch (error) {
    if (error instanceof ContentfulError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new NetworkError(`Error fetching page lists: ${error.message}`);
    }
    throw new Error("Unknown error fetching page lists");
  }
}

/**
 * Fetches a single page list by slug
 * @param slug - The slug of the page list to fetch
 * @param preview - Whether to fetch draft content
 * @returns Promise resolving to the page list or null if not found
 */
export async function getPageListBySlug(
  slug: string,
  preview = false,
): Promise<PageList | null> {
  try {
    const response = await fetchGraphQL<PageList>(
      `query GetPageListBySlug($slug: String!, $preview: Boolean!) {
        pageListCollection(where: { slug: $slug }, limit: 1, preview: $preview) {
          items {
            ${PAGELIST_GRAPHQL_FIELDS}
          }
        }
      }`,
      { slug, preview },
      preview,
    );

    if (!response.data?.pageListCollection?.items?.length) {
      return null;
    }

    return response.data.pageListCollection.items[0]!;
  } catch (error) {
    if (error instanceof Error) {
      throw new NetworkError(`Error fetching page list by slug: ${error.message}`);
    }
    throw new Error("Unknown error fetching page list by slug");
  }
}

/**
 * Fetches all NavBars from Contentful
 * @param preview - Whether to fetch draft content
 * @returns Promise resolving to the NavBar response
 */
export async function getAllNavBars(preview = false): Promise<NavBarResponse> {
  try {
    const response = await fetchGraphQL<NavBar>(
      `query GetAllNavBars($preview: Boolean!) {
        navBarCollection(preview: $preview) {
          items {
            ${NAVBAR_GRAPHQL_FIELDS}
          }
          total
        }
      }`,
      { preview },
      preview,
    );

    if (!response.data?.navBarCollection) {
      throw new ContentfulError("Failed to fetch NavBars from Contentful");
    }

    return {
      items: response.data.navBarCollection.items,
      total: response.data.navBarCollection.total,
    };
  } catch (error) {
    if (error instanceof ContentfulError) {
      throw error;
    }
    if (error instanceof GraphQLError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new NetworkError(`Error fetching NavBars: ${error.message}`);
    }
    throw new Error("Unknown error fetching NavBars");
  }
}

/**
 * Fetches a single NavBar by name
 * @param name - The name of the NavBar to fetch
 * @param preview - Whether to fetch draft content
 * @returns Promise resolving to the NavBar or null if not found
 */
export async function getNavBarByName(
  name: string,
  preview = false,
): Promise<NavBar | null> {
  try {
    const response = await fetchGraphQL<NavBar>(
      `query GetNavBarByName($name: String!, $preview: Boolean!) {
        navBarCollection(where: { name: $name }, limit: 1, preview: $preview) {
          items {
            ${NAVBAR_GRAPHQL_FIELDS}
          }
        }
      }`,
      { name, preview },
      preview,
    );

    if (!response.data?.navBarCollection?.items?.length) {
      return null;
    }

    return response.data.navBarCollection.items[0]!;
  } catch (error) {
    if (error instanceof Error) {
      throw new NetworkError(`Error fetching NavBar by name: ${error.message}`);
    }
    throw new Error("Unknown error fetching NavBar by name");
  }
}

/**
 * Fetches a NavBar by its ID
 * @param id - The ID of the NavBar to fetch
 * @param preview - Whether to fetch draft content
 * @returns Promise resolving to the NavBar or null if not found
 */
export async function getNavBarById(id: string, preview = false): Promise<NavBar | null> {
  try {
    const response = await fetchGraphQL<NavBar>(
      `query GetNavBarById($id: String!, $preview: Boolean!) {
        navBarCollection(where: { sys: { id: $id } }, limit: 1, preview: $preview) {
          items {
            ${NAVBAR_GRAPHQL_FIELDS}
          }
        }
      }`,
      { id, preview },
      preview,
    );

    if (!response.data?.navBarCollection?.items?.length) {
      return null;
    }

    return response.data.navBarCollection.items[0]!;
  } catch (error) {
    if (error instanceof ContentfulError) {
      throw error;
    }
    if (error instanceof GraphQLError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new NetworkError(`Error fetching NavBar by ID: ${error.message}`);
    }
    throw new Error("Unknown error fetching NavBar by ID");
  }
}

/**
 * Fetches all footers from Contentful
 * @param preview - Whether to fetch draft content
 * @returns Promise resolving to the Footer response
 */
export async function getAllFooters(preview = true): Promise<FooterResponse> {
  try {
    const response = await fetchGraphQL<Footer>(
      `query GetAllFooters($preview: Boolean!) {
        footerCollection(preview: $preview) {
          items {
            ${FOOTER_GRAPHQL_FIELDS}
          }
          total
        }
      }`,
      { preview },
      preview,
    );

    if (!response.data?.footerCollection) {
      throw new ContentfulError("Failed to fetch Footers from Contentful");
    }

    return {
      items: response.data.footerCollection.items,
      total: response.data.footerCollection.total,
    };
  } catch (error) {
    if (error instanceof ContentfulError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new NetworkError(`Error fetching Footers: ${error.message}`);
    }
    throw new Error("Unknown error fetching Footers");
  }
}

/**
 * Fetches a Footer by its ID
 * @param id - The ID of the Footer to fetch
 * @param preview - Whether to fetch draft content
 * @returns Promise resolving to the Footer or null if not found
 */
export async function getFooterById(id: string, preview = true): Promise<Footer | null> {
  try {
    const response = await fetchGraphQL<Footer>(
      `query GetFooterById($id: String!, $preview: Boolean!) {
        footerCollection(where: { sys: { id: $id } }, limit: 1, preview: $preview) {
          items {
            ${FOOTER_GRAPHQL_FIELDS}
          }
        }
      }`,
      { id, preview },
      preview,
    );

    if (!response.data?.footerCollection?.items?.length) {
      return null;
    }

    return response.data.footerCollection.items[0]!;
  } catch (error) {
    if (error instanceof Error) {
      throw new NetworkError(`Error fetching Footer by ID: ${error.message}`);
    }
    throw new Error("Unknown error fetching Footer by ID");
  }
}