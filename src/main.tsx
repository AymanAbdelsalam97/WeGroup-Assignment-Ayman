import { createRoot } from "react-dom/client";
import App from "@/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Enable React Strict Mode if you want to use it (components will be rendered twice)
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>

  // </StrictMode>,
);
