import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ScrollToTop } from "./utils/ScrollToTop";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }
  const { worker } = await import("@/mocks/browser.tsx");
  return worker.start();
}


enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>,
    // </React.StrictMode>
  );
});

