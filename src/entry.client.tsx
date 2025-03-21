import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HydratedRouter } from "react-router/dom";

// Enable React Strict Mode if you want to use it (components will be rendered twice)
const queryClient = new QueryClient();
import ReactDOM from "react-dom/client";

ReactDOM.hydrateRoot(
  document,
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <HydratedRouter />
  </QueryClientProvider>
  // </StrictMode>
);
