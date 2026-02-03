export interface FeedWithBiasPayload {
  body: {
    bid: string;
    board: string;
    key: number;
  };
}

export interface FeedRequest {
  bid: string;
  board: string;
  key: number;
}

export interface Feed {
  feed: FeedType;
}

export interface FeedType {
  fid: string;
  title: string;
  body: string;
  bid: string;
  nickname: string;
  date: string;
  board: string;
  content: string;
  author: string;
  hashtag: string[];
  star: number;
  star_flag: boolean;
  num_comment: number;
  fclass: string;
  raw_body: string;
  is_owner: boolean;
  image: string[];
  links: [];
}
