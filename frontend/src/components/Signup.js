import { useRef } from "react";
import axios from "axios"; 
import NavBar from '../components/NavBar/NavBar'
import uva from '../assets/img/uva.png'
import { useNavigate } from "react-router-dom";

const Signup = ({ setCurrUser, setShow }) => {
    const formRef = useRef();
    const navigate = useNavigate()

    const signup = async (userInfo, setCurrUser) => {
        const url = "http://localhost:3001/signup";
        try {
        const response = await axios.post(url, userInfo, {
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
        });
        const data = response.data;
        if (!response.status === 200) throw data.error;
        navigate ("/login")   
        localStorage.setItem("token", response.headers.authorization);
        setCurrUser(data);
        } catch (error) {
        console.log("error", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData);
        const userInfo = {
        user: { email: data.email, password: data.password, name: data.name, last_name: data.last_name },
        };
        signup(userInfo, setCurrUser);
        e.target.reset();
    };

    const handleClick = (e) => {
        e.preventDefault();
        setShow(true);
    };

return (
    <div className="signup-div">
            <header><NavBar></NavBar> </header>
            <img className='signup-uvaLogo2' src={uva} alt='uva logo'></img>
            <p className='signup-eslogan2'> UVA App, organiza y administra <br/>
                    tu empresa de la mejor manera. </p>
            <form className="signup-form" ref={formRef} onSubmit={handleSubmit}>
                <p className="signup-title">Registrate </p>
                <p className="signup-message">Registrate para tener acceso a UVA. </p>
                <div class="signup-flex">
                        <label>
                            <input type="text" name='firstName'  className="signup-input"/>
                            <span>Nombre</span>
                        </label>
                        <br />
                        <label>
                            <input  className="signup-input" type="text" name='lastName'  />                  
                            <span>Apellido</span>
                        </label>
                </div>
                        <label>
                            <input className="signup-input" type="email" name='email' autoComplete="off" />
                            <span>Correo</span>
                        </label>
                        <label>
                            <input className="signup-input" type="password" name='password'  />
                            <span>Contraseña</span>
                        </label>
                        <label>
                            <input className="signup-input" type="password" placeholder="" required=""/>
                            <span>Confirmar contraseña</span>
                        </label>
                        <label>
                            <input className="signup-submit" type='submit' value="Registrar" />
                        </label>
                <div>Ya tienes una cuenta? <a href="/" onClick={handleClick} >inicia sesión</a>.</div>
            </form>
            <br />
    </div>
    );
};

export default Signup;
