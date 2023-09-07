

import NavbarHeader from '../../Components/users/Header/Navbar.tsx'
import Instrutor from '../../Components/users/Instructor/Instrutor.tsx'
  
import Cards from '../../Components/users/cards/Card.tsx'
import Home from '../../Components/users/carousel/carousel.tsx'
import UserFooter from '../../Components/users/Footer/Footer.tsx'

function HomePage() {
  return (
    <div>
      <NavbarHeader />
    
    <Home/>

    <Cards/>
    <Instrutor/>
    <UserFooter/>
      
    </div>
  )
}

export default HomePage
