import { useRef } from "react";
import axios from "axios"; 
import uva from '../assets/img/uva.png'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

/**
 * The Signup function is responsible for making a POST request to the server to sign up a user and set
 * the current user in the application.
 */
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
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Cuenta creada correctamente",
            showConfirmButton: false,
            timer: 1500
        });
        localStorage.setItem("token", response.headers.authorization);
        setCurrUser(data);
        window.location.reload();

        } catch (error) {
        console.log("error", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData);
        const userInfo = {
        user: {
            email: data.email,
            password: data.password,
            password_confirmation: data.password, 
            name: data.name, 
            last_name: data.last_name,
        },
        };
    
        try {
        await signup(userInfo, setCurrUser);
        formRef.current.reset();
        } catch (error) {
        console.error('Error during signup:', error);
        }
    };


    const handleClick = (e) => {
        e.preventDefault();
        setShow(true);
    };

return  (
    <div className="signup-container">
        <div className="signup-logo">
            <img className='signup-uvaLogo' src={uva} alt='uva logo' />
            <div className='signup-eslogan'><p className='PSlogan'>UVA App, organiza y administra<br />tu empresa de la mejor manera.</p></div>
        </div>
        <div className="signup-form">
            <form className="signup-card" ref={formRef} onSubmit={handleSubmit}>
                <h2 id="heading">Regístrate</h2>
                <p>Regístrate para tener acceso a UVA.</p>
                <div className="signup-flex">
                <div class="container">
                
                </div>
                    <label className="signup-field">
                        <input className="signup-input-field" type="text" name="name" placeholder="Nombre" />
                    </label>
                    <label className="signup-field">
                        <input className="signup-input-field" type="text" name="last_name" placeholder="Apellido" />
                    </label>
                    <label className="signup-field">
                        <input className="signup-input-field" type="email" name="email" autoComplete="off" placeholder="Correo" />
                    </label>
                    <label className="signup-field">
                        <input className="signup-input-field" type="password" name="password" placeholder="Contraseña" />
                    </label>
                    <label className="signup-field">
                        <input className="signup-input-field" type="password" name="password_confirmation" placeholder="Confirmar Contraseña" />
                    </label>
                    <div className="signup-btn">
                        <input className="signup-button2" type='submit' value="Registrar" />
                    </div>
                </div>
                <div>¿Ya tienes una cuenta? <a href="/" onClick={handleClick}>Inicia sesión</a>.</div>
            </form>
        </div>
    </div>
);
};

export default Signup;
