import {
  Article,
  ArticlesResponse,
  ContentfulError,
  ContentfulResponse,
} from "./types";

// Set a variable that contains all the fields needed for articles when a fetch for
// content is performed
const ARTICLE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  slug
`;

// Cache the fetch requests
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

export async function getAllArticles(
  limit = 3,
  isDraftMode = false,
  skip = 0,
): Promise<ArticlesResponse> {
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
  const hasMore = skip + items.length >= limit && skip + items.length < total;

  return { items, total, hasMore };
}

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
