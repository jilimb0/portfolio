import Header from "./components/Header"
import MainSection from "./components/MainSection"
import Footer from "./components/Footer"
import { useState } from "react"

function App() {
  const [bool, setBool] = useState(false)
  function handleBio() {
    setBool((prevState) => !prevState)
  }

  return (
    <>
      <Header handlePortfolio={handleBio} />
      <MainSection handlePortfolio={bool} />
    </>
  )
}

export default App
