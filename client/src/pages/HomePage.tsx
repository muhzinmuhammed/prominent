
import NavbarHeader from '../Components/users/Header/Navbar.tsx'
import Instrutor from '../Components/users/Instructor/Instrutor.tsx'
  
import Cards from '../Components/users/cards/Card.tsx'
import Home from '../Components/users/carousel/carousel.tsx'


function HomePage() {
  return (
    <div>
      <NavbarHeader/>
    
    <Home/>

    <Cards/>
    <Instrutor/>
      
    </div>
  )
}

export default HomePage
