import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import './styles.css'
import { useNavigate } from 'react-router-dom';

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
    week: '',
    month: '',
    year: '',
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
        // Restablecer el formulario después de enviar los datos
        setFormData({
            article: '',
            unit_of_measurement: '',
            requested_amount: '',
            received_amount: '',
            week: '',
            month: '',
            year: '',
            category: ''
        });
    } catch (error) {
        console.error('Error while making POST request:', error);
    }
};

return (
    <div>
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
            <label>
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
            </label>
            <button type="submit">Agregar</button>
        </form>
        <button className="Vamos" onClick={()=>goToGetOrders('/get_orders')}>Vamos</button>
    </div>
)
}

export default Orders
