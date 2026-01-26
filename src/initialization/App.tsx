import Content from "@/layouts/Content"
import Header from "@/layouts/Header"
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
      </main>
    </>
    
  )
}

export default App
