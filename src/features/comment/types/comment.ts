export interface Comment {
  cid: string;
  //   reply: [],
  target_cid: string;
  uname: string;
  is_reworked: boolean;
  owner: boolean;
  body: string;
  date: string;
}
