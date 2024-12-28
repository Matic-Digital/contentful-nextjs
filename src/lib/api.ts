/**
 * Contentful API Integration Module
 * Provides functions for fetching and managing blog articles from Contentful CMS
 */

// Types
import type {
  Article,
  ArticlesResponse,
  ContentfulResponse,
  TeamMember,
  Talent,
  Tier,
  Profile,
  Education,
  Awards,
  Language
} from "@/types/contentful";

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

const TALENT_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  slug
  headshot {
    url
  }
  location {
    lat
    lon
  }
  tier {
    sys {
      id
    }
    name
  }
`;

const TIER_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  description {
    json
  }
  talentCollection {
    items {
      sys {
        id
      }
      name
      slug
      headshot {
        url
      }
      location {
        lat
        lon
      }
    }
  }
`;

const PROFILE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  talent {
    sys {
      id
    }
  }
  slug
  talentBriefDescription {
    json
  }
  role
  rate
  focus
  experience
  engagementType
`;

const EDUCATION_GRAPHQL_FIELDS = `
  sys {
    id
  }
  institution
  degreeName
  location {
    lat
    lon
  }
  timeframe
`;

const AWARD_GRAPHQL_FIELDS = `
  sys {
    id
  }
  awardName
  awardDate
  description {
    json
  }
`;

const LANGUAGE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  type
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
    const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
    const token = preview
      ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
      : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

    if (!spaceId || !token) {
      console.error('Missing Contentful credentials:', { spaceId: !!spaceId, token: !!token });
      throw new ContentfulError('Missing Contentful credentials');
    }

    const url = `https://graphql.contentful.com/content/v1/spaces/${spaceId}`;
    const requestBody = JSON.stringify({ query, variables });
    
    console.log('GraphQL Request:', {
      url,
      method: 'POST',
      variables,
      query,
      preview,
      hasToken: !!token,
      requestBody,
    });

    const response = await fetch(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: requestBody,
        next: cacheConfig?.next,
      },
    );

    const responseText = await response.text();
    console.log('Raw Response:', responseText);

    if (!response.ok) {
      console.error('GraphQL Error Response:', {
        status: response.status,
        statusText: response.statusText,
        body: responseText,
        headers: Object.fromEntries(response.headers.entries()),
      });
      throw new NetworkError(
        `Network error: ${response.statusText}. Body: ${responseText}`,
        response
      );
    }

    try {
      const json = JSON.parse(responseText) as ContentfulResponse<T>;
      
      // Check for GraphQL errors in the response
      if (json.errors?.length) {
        console.error('GraphQL errors in response:', json.errors);
        throw new GraphQLError(
          'GraphQL query execution error',
          json.errors.map(e => ({
            message: typeof e === 'string' ? e : e.message || 'Unknown error'
          }))
        );
      }

      return json;
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      throw new Error(`Invalid JSON response: ${responseText}`);
    }
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
        response.errors.map((e: { message?: string; extensions?: Record<string, unknown> }): { message: string; extensions?: Record<string, unknown> } => ({
          message: e?.message ?? (typeof e === 'string' ? e : 'Unknown error'),
          ...(e?.extensions && { extensions: e.extensions })
        }))
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
        response.errors.map((e: { message?: string; extensions?: Record<string, unknown> }): { message: string; extensions?: Record<string, unknown> } => ({
          message: e?.message ?? (typeof e === 'string' ? e : 'Unknown error'),
          ...(e?.extensions && { extensions: e.extensions })
        }))
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
        response.errors.map((e: { message?: string; extensions?: Record<string, unknown> }): { message: string; extensions?: Record<string, unknown> } => ({
          message: e?.message ?? (typeof e === 'string' ? e : 'Unknown error'),
          ...(e?.extensions && { extensions: e.extensions })
        }))
      );
    }

    // Add null check and return empty array if no team members found
    return response.data?.teamMemberCollection?.items ?? [];
  } catch (error) {
    throw new ContentfulError('Failed to fetch team members', error);
  }
}

/**
 * Fetches all talent entries from Contentful
 * @param isDraftMode - Whether to fetch draft content (default: false)
 * @returns Promise resolving to array of Talent entries
 */
export async function getAllTalent(
  isDraftMode = false
): Promise<Talent[]> {
  try {
    console.log('Fetching talent:', { isDraftMode });
    
    const query = `query GetTalent {
      talentCollection {
        items {
          ${TALENT_GRAPHQL_FIELDS}
        }
      }
    }`;

    console.log('GraphQL Query:', query);
    
    const response = await fetchGraphQL<{
      talentCollection: {
        items: Talent[];
      };
    }>(query, {}, isDraftMode);

    console.log('Talent response:', JSON.stringify(response, null, 2));

    // Check for GraphQL errors
    if (response.errors) {
      console.error('GraphQL errors:', response.errors);
      throw new GraphQLError(
        'GraphQL query execution error',
        response.errors.map((e: { message?: string; extensions?: Record<string, unknown> }): { message: string; extensions?: Record<string, unknown> } => ({
          message: e?.message ?? (typeof e === 'string' ? e : 'Unknown error'),
          ...(e?.extensions && { extensions: e.extensions })
        }))
      );
    }

    if (!response.data?.talentCollection?.items) {
      console.error('No talent collection in response:', response);
      throw new ContentfulError('Invalid response format - missing talentCollection.items');
    }

    return response.data.talentCollection.items;
  } catch (error) {
    console.error('Error fetching talent:', error);
    throw new ContentfulError('Failed to fetch talent', error);
  }
}

export async function getTalent(
  slug: string,
  isDraftMode = false
): Promise<Talent | null> {
  try {
    console.log('Fetching talent by slug:', { slug, isDraftMode });
    
    const query = `query GetTalentBySlug {
      talentCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          ${TALENT_GRAPHQL_FIELDS}
        }
      }
    }`;

    console.log('GraphQL Query:', query);
    
    const response = await fetchGraphQL<{
      talentCollection: {
        items: Talent[];
      };
    }>(query, {}, isDraftMode);

    console.log('Contentful Response:', JSON.stringify(response, null, 2));

    if (!response.data?.talentCollection?.items?.length) {
      console.log('No talent found with slug:', slug);
      return null;
    }

    return response.data.talentCollection.items[0] ?? null;
  } catch (error) {
    console.error('Error fetching talent:', error);
    throw error;
  }
}

export async function getAllTiers(
  isDraftMode = false
): Promise<Tier[]> {
  try {
    console.log('Fetching tiers:', { isDraftMode });
    
    const query = `query GetTiers {
      tierCollection {
        items {
          ${TIER_GRAPHQL_FIELDS}
        }
      }
    }`;

    console.log('GraphQL Query:', query);
    
    const response = await fetchGraphQL<Tier>(
      query,
      {},
      isDraftMode
    );

    // Check for GraphQL errors
    if (response.errors) {
      console.error('GraphQL errors:', response.errors);
      throw new GraphQLError(
        'GraphQL query execution error',
        response.errors.map((e: { message?: string; extensions?: Record<string, unknown> }): { message: string; extensions?: Record<string, unknown> } => ({
          message: e?.message ?? (typeof e === 'string' ? e : 'Unknown error'),
          ...(e?.extensions && { extensions: e.extensions })
        }))
      );
    }

    return response.data?.tierCollection?.items ?? [];
  } catch (error) {
    console.error('Error fetching tiers:', error);
    throw new ContentfulError('Failed to fetch tiers', error);
  }
}

export async function getTier (
  slug: string,
  isDraftMode = false
): Promise<Tier> {
  try {
    const response = await fetchGraphQL<Tier>(
      `query GetTier {
        tierCollection(
          where: { slug: "${slug}" },
          limit: 1,
        ) {
          items {
            ${TIER_GRAPHQL_FIELDS}
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
        response.errors.map((e: { message?: string; extensions?: Record<string, unknown> }): { message: string; extensions?: Record<string, unknown> } => ({
          message: e?.message ?? (typeof e === 'string' ? e : 'Unknown error'),
          ...(e?.extensions && { extensions: e.extensions })
        }))
      );
    }

    const tier = response.data?.tierCollection?.items[0];

    if (!tier) {
      throw new ResourceNotFoundError(
        `Tier with slug '${slug}' not found`,
        'tier'
      );
    }

    return tier;
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      throw error;
    }
    throw new ContentfulError('Failed to fetch tier', error);
  }
}

export async function getAllProfiles(
  isDraftMode = false
): Promise<Profile[]> {
  try {
    const response = await fetchGraphQL<Profile>(
      `query GetProfiles {
        profileCollection {
          items {
            ${PROFILE_GRAPHQL_FIELDS}
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
        response.errors.map((e: { message?: string; extensions?: Record<string, unknown> }): { message: string; extensions?: Record<string, unknown> } => ({
          message: e?.message ?? (typeof e === 'string' ? e : 'Unknown error'),
          ...(e?.extensions && { extensions: e.extensions })
        }))
      );
    }

    return response.data?.profileCollection?.items ?? [];
  } catch (error) {
    throw new ContentfulError('Failed to fetch profiles', error);
  }
}

export async function getProfile(
  talentId: string,
  isDraftMode = false
): Promise<Profile> {
  try {
    const response = await fetchGraphQL<Profile>(
      `query GetProfile {
        profileCollection(
          where: { talent: { sys: { id: "${talentId}" } } },
          limit: 1,
        ) {
          items {
            ${PROFILE_GRAPHQL_FIELDS}
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
        response.errors.map((e: { message?: string; extensions?: Record<string, unknown> }): { message: string; extensions?: Record<string, unknown> } => ({
          message: e?.message ?? (typeof e === 'string' ? e : 'Unknown error'),
          ...(e?.extensions && { extensions: e.extensions })
        }))
      );
    }

    const profile = response.data?.profileCollection?.items[0];

    if (!profile) {
      throw new ResourceNotFoundError(
        `Profile for talent with ID '${talentId}' not found`,
        'profile'
      );
    }

    return profile;
  } catch (error: unknown) {
    if (error instanceof ResourceNotFoundError) {
      throw error;
    }
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new ContentfulError('Failed to fetch profile', new Error(errorMessage));
  }
}

export async function getEducation(
  talentId: string,
  isDraftMode = false
): Promise<Education[]> {
  try {
    const response = await fetchGraphQL<ContentfulResponse<Education>>(`
      query GetEducation {
        educationCollection(
          where: { talent: { sys: { id: "${talentId}" } } }
        ) {
          items {
            ${EDUCATION_GRAPHQL_FIELDS}
          }
        }
      }
    `, {}, isDraftMode);

    const educations = response.data?.educationCollection?.items ?? [];

    if (!educations) {
      throw new ResourceNotFoundError(
        `No education found for talent '${talentId}'`,
        'education'
      );
    }
    return educations;    
  } catch (error: unknown) {
    if (error instanceof ResourceNotFoundError) {
      throw error;
    }
    const errorMessage = 
      error instanceof Error ? error.message : 
      typeof error === 'string' ? error :
      'An unknown error occurred';
    throw new Error(errorMessage);
  }
}

export async function getAllAwards(
  isDraftMode = false
): Promise<Awards[]> {
  try {
    const response = await fetchGraphQL<Awards>(
      `query GetAwards {
        awardsCollection {
          items {
            ${AWARD_GRAPHQL_FIELDS}
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
        response.errors.map((e: { message?: string; extensions?: Record<string, unknown> }): { message: string; extensions?: Record<string, unknown> } => ({
          message: e?.message ?? (typeof e === 'string' ? e : 'Unknown error'),
          ...(e?.extensions && { extensions: e.extensions })
        }))
      );
    }

    if (!response.data?.awardsCollection) {
      return [];
    }

    return response.data.awardsCollection.items;
  } catch (error: unknown) {
    // Ensure type-safe error handling
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new ContentfulError('Failed to fetch awards', new Error(errorMessage));
  }
}

export async function getAwards(
  talentId: string,
  isDraftMode = false
): Promise<Awards[]> {
  try {
    const response = await fetchGraphQL<Awards>(
      `query GetAwardsByTalent($talentId: String!) {
        awardsCollection(where: { talent: { sys: { id: $talentId } } }) {
          items {
            ${AWARD_GRAPHQL_FIELDS}
          }
        }
      }`,
      { talentId },
      isDraftMode,
    );

    if (response.errors) {
      throw new GraphQLError(
        'GraphQL query execution error',
        response.errors.map((e: unknown) => ({
          message: typeof e === 'string' 
            ? e 
            : (e && typeof e === 'object' && 'message' in e && typeof e.message === 'string')
              ? e.message
              : 'Unknown error',
          ...(e && typeof e === 'object' && 'extensions' in e && e.extensions 
              ? { extensions: e.extensions as Record<string, unknown> }
              : {})
        }))
      );
    }

    if (!response.data?.awardsCollection) {
      return [];
    }

    return response.data.awardsCollection.items;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(errorMessage);
  }
}

export async function getLanguage(
  id: string,
  isDraftMode?: boolean
): Promise<Language> {
  try {
    const response = await fetchGraphQL<ContentfulResponse<Language>>(
      `query GetLanguage($id: String!) {
        languagesCollection(
          where: { 
            sys: { id: $id }
          },
          limit: 1,
        ) {
          items {
            ${LANGUAGE_GRAPHQL_FIELDS}
          }
        }
      }`,
      { id },
      isDraftMode ?? false,
    );

    // Check for GraphQL errors
    if (response.errors) {
      throw new GraphQLError(
        'GraphQL query execution error',
        response.errors.map((e: unknown) => ({
          message: typeof e === 'string' 
            ? e 
            : (e && typeof e === 'object' && 'message' in e && typeof e.message === 'string')
              ? e.message
              : 'Unknown error',
          ...(e && typeof e === 'object' && 'extensions' in e && e.extensions 
              ? { extensions: e.extensions as Record<string, unknown> }
              : {})
        }))
      );
    }

    const language = response.data?.languagesCollection?.items[0];

    if (!language) {
      throw new ResourceNotFoundError(`Language with ID ${id} not found`, 'language');
    }

    return language;
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      throw error;
    }
    throw new ContentfulError('Failed to fetch language', error);
  }
}

export async function getLanguages(
  talentId: string,
  isDraftMode = false
): Promise<Language[]> {
  try {
    const response = await fetchGraphQL<ContentfulResponse<Language>>(`
      query GetLanguages {
        languagesCollection(
          where: { talent: { sys: { id: "${talentId}" } } }
        ) {
          items {
            ${LANGUAGE_GRAPHQL_FIELDS}
          }
        }
      }
    `, {}, isDraftMode);

    if (response.errors) {
      throw new GraphQLError(
        'GraphQL query execution error',
        response.errors.map((e: { message?: string }) => ({
          message: e?.message ?? 'Unknown error'
        }))
      );
    }

    if (!response.data?.languagesCollection) {
      return [];
    }

    return response.data.languagesCollection.items;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(errorMessage);
  }
}