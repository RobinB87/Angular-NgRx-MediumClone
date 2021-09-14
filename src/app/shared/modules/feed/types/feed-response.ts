import { Article } from '../../../types/article';

export interface FeedResponse {
  articles: Article;
  articlesCount: number;
}
