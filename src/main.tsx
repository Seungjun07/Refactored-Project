import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ScrollToTop } from "./utils/ScrollToTop";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("@/mocks/browser");
    return worker.start();
  }
}

const queryClient = new QueryClient();

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ScrollToTop />
        <App />
      </QueryClientProvider>
    </BrowserRouter>,
    // </React.StrictMode>
  );
});
