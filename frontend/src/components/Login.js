import { useRef } from "react";
import uva from '../assets/img/uva.png';
// import NavBar from '../components/NavBar/NavBar';
import '../assets/styles.css';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = ({ setCurrUser, setShow }) => {
  const navigate = useNavigate();

  const login = async (userInfo) => {
    const url = "http://localhost:3001/login";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();
      if (!response.ok) throw data.error;

      console.log('Información del usuario guardada en Local Storage:', data);
      localStorage.setItem("token", response.headers.get("Authorization"));
      localStorage.setItem('currentUser', JSON.stringify(data));
      setCurrUser(data);
      console.log("Token:", response.headers.get("Authorization"));
      navigate("/principal");
    } catch (error) {
      console.log("error", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Correo o contraseña invalido!",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const userInfo = {
      user: { email: data.email, password: data.password },
    };
    await login(userInfo);
    e.target.reset();
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShow(false);
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <img className='login-uvaLogo' src={uva} alt='uva logo' />
        <div className='login-eslogan'><p className="PSlogan" >UVA App, organiza y administra<br />tu empresa de la mejor manera.</p> </div>      </div>
      <div className="login-form">
        <form onSubmit={handleSubmit} className="form1">
          <p id="heading">Inicia Sesión</p>
          <div className="login-field">
                <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                  <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                </svg>          
                <input autoComplete="off" className="login-input-field" type="email" name='email' placeholder="Correo" />
          </div>
          <div className="login-field">
              <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                </svg>          
                <input className="login-input-field" type="password" name='password' placeholder="Contraseña" />
          </div>
          <div className="login-btn">
            <button className="login-button2" type='submit' value="Login">Ingresar</button>
            <button className="login-button2" onClick={handleClick}>Registrarse</button>
          </div>
          <button className="login-button3">Olvidé la contraseña</button>
        </form>
      </div>
    </div>
  );
}

export default Login;


