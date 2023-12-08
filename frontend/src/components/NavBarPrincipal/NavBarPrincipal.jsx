import React from 'react'
import './NavBarPrincipal.css'
import cencinai from '../../assets/img/cencinai.png'


function NavBarPrincipal() {
  return (
    <div>
        <nav className="navbar">
  <div className="container-fluid">
  <img className='cencinai' src={cencinai} alt='cencinai'></img>
  </div>
</nav>
    </div>
  )
}

export default NavBarPrincipal

