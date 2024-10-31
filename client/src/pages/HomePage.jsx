import Navbar from "../components/Navbar"
import Slide from "../components/Slide"
import Categories from "../components/Categories"
import Footer from "../components/Footer"
import About from "./About"

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Slide />
      <Categories /> 
      <About/>
      <Footer />
    </>
  )
}

export default HomePage