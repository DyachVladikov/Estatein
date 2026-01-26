import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Home from "@/pages/Home"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
