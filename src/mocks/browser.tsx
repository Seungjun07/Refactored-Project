import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { biasHandlers } from "@/mocks/handelrs/bias.handlers";
import { feedHandlers } from "./handelrs/feed.handelrs";
import { exploreHandlers } from "./handelrs/explore.handelrs";

export const worker = setupWorker(
  ...handlers,
  ...biasHandlers,
  ...feedHandlers,
  ...exploreHandlers,
);

worker.start({
  onUnhandledRequest: "warn",
});
