export interface Article {
  sys: {
    id: string;
  };
  title: string;
  slug: string;
}

export interface ContentfulResponse<T> {
  data?: {
    blogArticleCollection?: {
      items: T[];
      total: number;
    };
  };
  errors?: Array<{ message: string }>;
}

export interface ArticlesResponse {
  items: Article[];
  total: number;
  hasMore: boolean;
}

export class ContentfulError extends Error {
  constructor(message: string, public errors?: Array<{ message: string }>) {
    super(message);
    this.name = 'ContentfulError';
  }
}
