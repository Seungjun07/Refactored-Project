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
