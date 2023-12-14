import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import './styles.css'
import { useNavigate } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import fondo2 from '../../assets/img/fondo2.jpg';

const Orders = () => {
    const navigate = useNavigate()

    function goToGetOrders() {
        navigate('/get_orders');
    }

    const [formData, setFormData] = useState({
    article: '',
    unit_of_measurement: '',
    requested_amount: '',
    received_amount: '',
    category: ''
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3001/food_orders', formData);
        console.log('Response from POST request:', response.data);
        setFormData({
            article: '',
            unit_of_measurement: '',
            requested_amount: '',
            received_amount: '',
            category: ''
        });
    } catch (error) {
        console.error('Error while making POST request:', error);
    }
};

    const getCurrentWeekDates = () => {
        const today = new Date();
        const currentDay = today.getDay(); // Domingo: 0, Lunes: 1, ..., Sábado: 6
        const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Obtener el primer día de la semana
        
        const startOfWeek = new Date(today.setDate(diff));
        const endOfWeek = new Date(today.setDate(diff + 4)); // Sumar 4 días para obtener el viernes
        
        const startDate = startOfWeek.getDate();
        const endDate = endOfWeek.getDate();
        const currentMonth = today.getMonth() + 1; // Sumar 1 porque los meses empiezan en 0
        
        return {
            start: startDate,
            end: endDate,
            month: currentMonth,
            year: today.getFullYear(),
        };
        }
    const weekDates = getCurrentWeekDates();
    const [currentWeekDates, setCurrentWeekDates] = useState(getCurrentWeekDates());

    const updateCurrentWeekDates = () => {
        setCurrentWeekDates(getCurrentWeekDates());
    };

return (
    <div>

    <img className='fondo' src={fondo2} alt='fondo'></img>
    <header className="header3">
        <div className="text-box">
            <div className="loader2">
                <h1 className="heading-primary2">Pedidos</h1>
                <span className="heading-primary-sub4">Algo tengo que poner aquí</span>
            </div>
        </div>
    </header>


    <form className="myForm" onSubmit={handleSubmit}>
            <label>
                Articulo:
                <input
                    type="text"
                    name="article"
                    value={formData.article}
                    onChange={handleChange}
                />
            </label>
            <label>
                Categoria:
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                />
            </label>
            <label>
                Unidad de medida:
                <input
                    type="text"
                    name="unit_of_measurement"
                    value={formData.unit_of_measurement}
                    onChange={handleChange}
                />
            </label>
            <label>
                Monto requerido :
                <input
                    type="number"
                    name="requested_amount"
                    value={formData.requested_amount}
                    onChange={handleChange}
                />
            </label>
            <label>
                Monto recibido :
                <input
                    type="number"
                    name="received_amount"
                    value={formData.received_amount}
                    onChange={handleChange}
                />
            </label>
            {/* <label>
                Semana:
                <input
                    type="text"
                    name="week"
                    value={formData.week}
                    onChange={handleChange}
                />
            </label>
            <label>
                Mes:
                <input
                    type="text"
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                />
            </label>
            <label>
                Año:
                <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                />
            </label> */}
            <button type="submit">Agregar</button>
        </form>
        <button className="Vamos" onClick={()=>goToGetOrders('/get_orders')}>Vamos</button>
        <SideBar></SideBar>
    </div>
)
}

export default Orders
