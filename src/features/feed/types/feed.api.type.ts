import type { FeedType } from "./feed";

export interface FeedQueryParams {
  type?: "today" | "weekly" | "all" | "bias";
  biasId?: string;
  board?: string;
  cursor?: string | null;
  hashtag?: string;
  limit?: number;
  category?: string;
  time?: "today" | "weekly";
  fclass?: "short" | "long";
}

export interface FeedResponse {
  success: boolean;
  body: {
    send_data: FeedType[];
    next_cursor: string | null;
    hasMore: boolean;
  };
}
