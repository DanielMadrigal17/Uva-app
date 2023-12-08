import React from 'react'
import './Footer.css'
import name from '../../assets/img/name.png'

function Footer() {
  return (
    <div><footer className="footer">
    <div className="text-center p-3">
      © 2023 Copyright:
      <img className='uvaName' src={name} alt='logoname'></img>
    </div>
  </footer></div>
  )
}

export default Footer