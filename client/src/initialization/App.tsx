import Content from "@/layouts/Content"
import Footer from "@/layouts/Footer"
import Header from "@/layouts/Header"
import EstateBanner from "@/sections/EstateBanner"
import "@/styles/globals.scss"
import { Outlet } from "react-router-dom"


function App() {

  return (
    <>
      <Header />
      <main className="Entatein">
        <Content>
          <Outlet />
        </Content>
        <EstateBanner />
      </main>
      <Footer />
    </>
    
  )
}

export default App
