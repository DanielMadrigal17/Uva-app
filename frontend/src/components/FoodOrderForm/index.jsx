import React, { useState } from 'react';
import axios from 'axios';
import fondo2 from '../../assets/img/fondo2.jpg';

const FoodOrderForm = () => {
const [formData, setFormData] = useState({
    article: '',
    unit_of_measurement: '',
    requested_amount: '',
    received_amount: '',
    week: '',
    month: '',
    year: '',
});

const [error, setError] = useState(null);

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const url = 'http://localhost:3001/food_orders';

    try {
    const response = await axios.post(url, formData, {
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        },
    });

    console.log(response.status)

    if (response.status >= 200 && response.status < 300) {
        console.log('Solicitud exitosa');
    } else {
        console.error('Error al enviar la solicitud');
    }
    } catch (error) {
    console.error('Error:', error.message);
    setError('Error al enviar la solicitud. Por favor, inténtalo de nuevo.');
    }
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


    <form onSubmit={handleSubmit}>
    <div>
        <label>
        Articulo:
        <input
            type="text"
            name="article"
            value={formData.article}
            onChange={handleChange}
            
        />
        </label>
    </div>

    <div>
    <label>
        Unidad de medida:
        <input
            type="text"
            name="Unit_of_measurement"
            value={formData.unit_of_measurement}
            onChange={handleChange}
        />
        </label>
    </div>

    <div>
    <label>
        Monto Requerido:
        <input
            type="text"
            name="Requested_amount"
            value={formData.requested_amount}
            onChange={handleChange}
        />
        </label>
    </div>

    <div>
    <label>
        Monto Recibido:
        <input
            type="text"
            name="received_amount"
            value={formData.received_amount}
            onChange={handleChange}
            
        />
        </label>
    </div>

    <div>
    <label>
        Mes:
        <input
            type="text"
            name="month"
            value={formData.month}
            onChange={handleChange}
            
        />
        </label>
    </div>

    <div>
    <label>
        Año:
        <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
        />
        </label>
    </div>
    
    {error && <div>Error: {error}</div>}
    <div>
        <button type="submit">Enviar</button>
    </div>
    </form>
    </div>
);
};

export default FoodOrderForm;
