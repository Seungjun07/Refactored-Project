import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { biasHandlers } from "@/mocks/handelrs/bias.handlers";
import { exploreHandlers } from "./handelrs/explore.handelrs";
import { keywordHandlers } from "./handelrs/keyword.handlers";
import { commentsHandlers } from "./handelrs/comments.handlers";

export const worker = setupWorker(
  ...handlers,
  ...biasHandlers,
  ...commentsHandlers,
  ...exploreHandlers,
  ...keywordHandlers,
);

worker.start({
  onUnhandledRequest: "warn",
});
