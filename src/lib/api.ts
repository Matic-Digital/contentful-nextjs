/**
 * Contentful API Integration Module
 * Provides functions for fetching and managing blog articles from Contentful CMS
 */

// Types
import type {
  Hero,
  HeroResponse,
  Page,
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


const HERO_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  description
  __typename
`;

const PAGE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  slug
  description
  pageContentCollection {
    items {
      ${HERO_GRAPHQL_FIELDS}
    }
  }
  __typename
`;

const PAGE_LIST_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  slug
  pagesCollection {
    items {
      ... on Page {
        sys {
          id
        }
        name
        slug
        description
        __typename
      }
    }
  }
  __typename
`;

const NAVBAR_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  logo {
    sys {
      id
    }
    title
    description
    url
    width
    height
  }
  navLinksCollection {
    items {
      ... on Page {
        sys {
          id
        }
        name
        slug
        __typename
      }
      ... on PageList {
        sys {
          id
        }
        name
        slug
        __typename
      }
    }
  }
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
      
      throw new NetworkError(
        `Network error: ${response.statusText}`,
        response
      );
    }

    const json = await response.json() as GraphQLResponse<T>;

    if (json.errors) {
      throw new GraphQLError(
        'GraphQL query execution error',
        json.errors as Array<{ message: string }>
      );
    }

    return json;
  } catch (error: unknown) {
    console.error('Error in fetchGraphQL:', error);
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

export async function getAllPages(
  preview = false,
  skip = 0,
  limit = 10
): Promise<PageResponse> {
  try {
    const response = await fetchGraphQL<Page>(
      `query GetPages($preview: Boolean!, $skip: Int!, $limit: Int!) {
        pageCollection(preview: $preview, skip: $skip, limit: $limit) {
          items {
            ${PAGE_GRAPHQL_FIELDS}
          }
          total
        }
      }`,
      { preview, skip, limit },
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

    const collection = response.data?.pageCollection;
    if (!collection) {
      return { items: [], total: 0 };
    }

    return collection;
  } catch (error: unknown) {
    console.error('Error fetching pages:', error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new ContentfulError('Failed to fetch pages', error as Error);
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
  preview = true
): Promise<Page | null> {
  try {
    const response = await fetchGraphQL<Page>(
      `query GetPageBySlug($slug: String!, $preview: Boolean!) {
        pageCollection(
          where: { slug: $slug },
          limit: 1,
          preview: $preview
        ) {
          items {
            ${PAGE_GRAPHQL_FIELDS}
          }
        }
      }`,
      { slug, preview },
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

    const page = response.data?.pageCollection?.items[0];
    
    if (!page) {
      console.log(`Page with slug '${slug}' not found`);
      return null;
    }

    return page;
  } catch (error: unknown) {
    console.error(`Error fetching page with slug '${slug}':`, error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new ContentfulError('Failed to fetch page', error as Error);
  }
}

export async function getAllPageLists(preview = false): Promise<PageListResponse> {
  try {
    const response = await fetchGraphQL<PageList>(
      `query GetPageLists($preview: Boolean!) {
        pageListCollection(preview: $preview) {
          items {
            sys {
              id
            }
            name
            slug
            pagesCollection {
              items {
                ... on Page {
                  sys {
                    id
                  }
                  name
                  slug
                  description
                  __typename
                }
              }
            }
            __typename
          }
          total
        }
      }`,
      { preview },
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

    const collection = response.data?.pageListCollection;
    if (!collection) {
      return { items: [], total: 0 };
    }

    return collection;
  } catch (error: unknown) {
    console.error('Error fetching page lists:', error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new ContentfulError('Failed to fetch page lists', error as Error);
  }
}

export async function getPageListBySlug(slug: string, preview = false): Promise<PageList | null> {
  try {
    const response = await fetchGraphQL<PageList>(
      `query GetPageListBySlug($slug: String!, $preview: Boolean!) {
        pageListCollection(where: { slug: $slug }, limit: 1, preview: $preview) {
          items {
            sys {
              id
            }
            name
            slug
            pagesCollection {
              items {
              ${PAGE_LIST_GRAPHQL_FIELDS}
              }
            }
            __typename
          }
        }
      }`,
      { slug, preview },
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

    const pageList = response.data?.pageListCollection?.items[0];
    
    if (!pageList) {
      console.log(`Page list with slug '${slug}' not found`);
      return null;
    }

    return pageList;
  } catch (error: unknown) {
    console.error(`Error fetching page list with slug '${slug}':`, error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new ContentfulError('Failed to fetch page list', error as Error);
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
      `query GetNavBars($preview: Boolean!) {
        navBarCollection(preview: $preview) {
          items {
            ${NAVBAR_GRAPHQL_FIELDS}
          }
          total
        }
      }`,
      { preview },
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

    const collection = response.data?.navBarCollection;
    if (!collection) {
      return { items: [], total: 0 };
    }

    return collection;
  } catch (error: unknown) {
    console.error('Error fetching nav bars:', error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new ContentfulError('Failed to fetch nav bars', error as Error);
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
  preview = false
): Promise<NavBar | null> {
  try {
    const response = await fetchGraphQL<NavBar>(
      `query GetNavBarByName($name: String!, $preview: Boolean!) {
        navBarCollection(
          where: { name: $name },
          limit: 1,
          preview: $preview
        ) {
          items {
            ${NAVBAR_GRAPHQL_FIELDS}
          }
        }
      }`,
      { name, preview },
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

    const navBar = response.data?.navBarCollection?.items[0];
    
    if (!navBar) {
      console.log(`NavBar with name '${name}' not found`);
      return null;
    }

    return navBar;
  } catch (error: unknown) {
    console.error(`Error fetching NavBar with name '${name}':`, error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new ContentfulError('Failed to fetch NavBar', error as Error);
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
    const response = await fetchGraphQL(
      `query GetNavBarById($id: String!, $preview: Boolean!) {
        navBarCollection(where: { sys: { id: $id } }, limit: 1, preview: $preview) {
          items {
            sys {
              id
            }
            name
            logo {
              url
              title
              width
              height
            }
            navLinksCollection {
              items {
                ... on Page {
                  sys {
                    id
                  }
                  name
                  slug
                  __typename
                }
                ... on PageList {
                  sys {
                    id
                  }
                  name
                  slug
                  pagesCollection {
                    items {
                      ... on Page {
                        sys {
                          id
                        }
                        name
                        slug
                        __typename
                      }
                    }
                  }
                  __typename
                }
              }
            }
            __typename
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

    // Safely access the items array
    const navBarCollection = response.data?.navBarCollection;
    if (!navBarCollection?.items?.length) {
      console.warn(`NavBar with ID '${id}' not found`);
      return null;
    }

    // Return the first (and likely only) item
    return navBarCollection.items[0] as NavBar;
  } catch (error: unknown) {
    console.error(`Error fetching NavBar with ID '${id}':`, error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new ContentfulError('Failed to fetch NavBar by ID', error as Error);
  }
}