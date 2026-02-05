import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { biasHandlers } from "@/mocks/handelrs/bias.handlers";
import { exploreHandlers } from "./handelrs/explore.handelrs";
import { keywordHandlers } from "./handelrs/keyword.handlers";
import { commentsHandlers } from "./handelrs/comments.handlers";
import { boardHandlers } from "./handelrs/board.handlers";

export const worker = setupWorker(
  ...handlers,
  ...biasHandlers,
  ...commentsHandlers,
  ...exploreHandlers,
  ...keywordHandlers,
  ...boardHandlers,
);

worker.start({
  onUnhandledRequest: "warn",
});
