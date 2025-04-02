// Uncomment when needed
// import { type Document } from "@contentful/rich-text-types";

export interface Page {
  sys: {
    id: string;
  };
  name: string;
  slug: string;
  description?: string;
  header?: NavBar;
  footer?: Footer;
  pageContentCollection?: {
    items: Hero[];
  };
  __typename?: string;
}

export interface PageList {
  sys: {
    id: string;
  };
  name?: string;
  slug?: string;
  pagesCollection?: {
    items: Array<Page>;
  };
  header?: NavBar;
  pageContentCollection?: {
    items: Hero[];
  };
  footer?: Footer;
  __typename?: string;
}

export interface Footer {
  sys: {
    id: string;
  };
  name: string;
  description?: string;
  pageListsCollection?: {
    items: Array<PageList>;
  };
  copyright?: string;
  logo?: {
    url: string;
    title?: string;
    width?: number;
    height?: number;
  };
  __typename?: string;
}

export interface Hero {
  sys: {
    id: string;
  };
  name?: string;
  description?: string;
  __typename?: string;
}

export interface HeroResponse {
  items: Hero[];
  total: number;
}

export interface PageResponse {
  items: Page[];
  total: number;
}

export interface PageListResponse {
  items: Array<PageList>;
  total: number;
}

export interface FooterResponse {
  items: Array<Footer>;
  total: number;
}

export interface Asset {
  sys: {
    id: string;
  };
  title?: string;
  description?: string;
  url?: string;
  width?: number;
  height?: number;
}

export interface NavBar {
  sys: {
    id: string;
  };
  name?: string;
  logo?: Asset;
  navLinksCollection?: {
    items: Array<Page | PageList>;
  };
  __typename?: string;
}

export interface NavBarResponse {
  items: Array<NavBar>;
  total: number;
}

/**
 * Raw response structure from Contentful GraphQL API
 * @template T - The type of data in the response
 * @property data - Contains the response data if request succeeds
 * @property errors - Contains error details if request fails
 */
export interface GraphQLResponse<T> {
  data?: {
    heroCollection?: {
      items: T[];
      total: number;
    };
    pageCollection?: {
      items: T[];
      total: number;
    };
    pageListCollection?: {
      items: T[];
      total: number;
    };
    navBarCollection?: {
      items: T[];
      total: number;
    };
    footerCollection?: {
      items: T[];
      total: number;
    };
  };
  errors?: Array<{
    message: string;
    locations: Array<{
      line: number;
      column: number;
    }>;
  }>;
}
