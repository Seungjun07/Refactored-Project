import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { biasHandlers } from "@/mocks/handelrs/bias.handlers";
import { feedHandlers } from "./handelrs/feed.handelrs";

export const worker = setupWorker(
  ...handlers,
  ...biasHandlers,
  ...feedHandlers,
);

worker.start({
  onUnhandledRequest: "warn",
});
