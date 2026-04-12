import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Home from "@/pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AboutUs from "@/pages/AboutUs";
import App from "./App";
import Properties from "@/pages/Properties";
import PropertyDetails from "@/pages/PropertyDetails";
import Service from "@/pages/Service";

const PATHS = {
  ABOUT_US: "about-us",
  PROPERTIES: "properties",
  PROPERTY_DETAILS: "properties/:id",
  SERVICE: "service",
} as const;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: PATHS.ABOUT_US, element: <AboutUs /> },
      { index: true, element: <Home /> },
      { path: PATHS.PROPERTIES, element: <Properties /> },
      { path: PATHS.PROPERTY_DETAILS, element: <PropertyDetails /> },
      { path: PATHS.SERVICE, element: <Service /> },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
