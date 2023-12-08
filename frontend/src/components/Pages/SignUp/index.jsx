import React from 'react'
import "./SignUp.css"
import uva from '../../assets/img/uva.png';
import NavBar from '../../Components/NavBar/NavBar';



function SignUp() {



  return (
    
    <div>

    <header><NavBar></NavBar> </header>
      <img className='uvaLogo2' src={uva} alt='uva logo'></img>
      <p className='eslogan2'> UVA App, organiza y administra <br/>
       tu empresa de la mejor manera. </p>

    <div>
        <form className="form">
    <p className="title">Registrate </p>
    <p className="message">Registrate para tener acceso a UVA. </p>
        <div class="flex">
        <label>
            <input className="input" type="text" placeholder="" required=""/>
            <span>Nombre</span>
        </label>

        <label>
            <input className="input" type="text" placeholder="" required=""/>
            <span>Apellido</span>
        </label>
    </div>  
            
    <label>
        <input className="input" type="email" placeholder="" required=""/>
        <span>Correo electrónico</span>
    </label> 
        
    <label>
        <input className="input" type="password" placeholder="" required=""/>
        <span>Contraseña</span>
    </label>
    <label>
        <input className="input" type="password" placeholder="" required=""/>
        <span>Confirmar contraseña</span>
    </label>
    <button className="submit">Registrar</button>
    <p className="signin">Ya tienes una cuenta? <a href="http://localhost:3000/">Inicia Sesión</a> </p>
</form>
    </div>
    </div>
  )
}

export default SignUp