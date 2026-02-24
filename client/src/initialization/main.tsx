import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Home from "@/pages/Home"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AboutUs from "@/pages/AboutUs"
import App from './App'

const PATHS  = {
  HOME: "/",
  ABOUT_US: "about-us"
} as const

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {path: PATHS.ABOUT_US, element: <AboutUs />},
        {path: PATHS.HOME, element: <Home />}
      ]
    }
  ]
)

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </StrictMode>,
)
