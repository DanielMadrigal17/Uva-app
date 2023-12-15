import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../SideBar/SideBar';
import Footer from '../../Footer/Footer';
import Swal from 'sweetalert2';

const Orders = () => {
const navigate = useNavigate();

function goToGetOrders() {
    navigate('/get_orders');
}

// Status for form data and validation errors
const [formData, setFormData] = useState({
    article: '',
    unit_of_measurement: '',
    requested_amount: '',
    received_amount: '',
    category: ''
}); 

const [errors, setErrors] = useState({
    article: '',
    unit_of_measurement: '',
    requested_amount: '',
    received_amount: '',
    category: ''
});

// Options for categories and units of measure
const categoryOptions = [
    'Lácteos',
    'No perecedero ',
    'Vegetales',
    'Frutas',
    'Carnes',
    'Pescado'
];

const unitOptions = [
    'Kilogramos',
    'Gramos',
    'Litros',
    'Mililitros',
    'Latas',
    'Unidades',
    'Paquetes',
    'Rollos',
    'Galón '
    ];

    // Function to handle changes to form fields
    const handleChange = (e) => {
    const { name, value } = e.target;
    // Validation: The 'Product' field cannot contain numbers
    if (name === 'article' && /\d/.test(value)) {
        // Show an alert if there is a number in the 'Product' field
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo Producto no puede contener números.'
    });
    return;
    }
    
    // Validation: Special characters and negative numbers are not allowed in general
    const regex = /[^\w\sñáéíóú]/gi;
    if (regex.test(value)) {
        // Display an alert if special characters or negative numbers are found
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se permiten caracteres especiales ni números negativos"
        });
        return;
    }

    // Validation: Quantity less than 1
    if (name === 'requested_amount' || name === 'received_amount') {
        if (parseInt(value) < 1) {
        setFormData({ ...formData, [name]: 1 });
        return;
        }
    }

    
    // Update the form state
    setFormData({ ...formData, [name]: value });
    };

    // Function to submit the form
    const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation of form fields
    const newErrors = {
        article: formData.article.trim() === '' ? 'Por favor, completa el campo de Producto.' : '',
        unit_of_measurement: formData.unit_of_measurement === '' ? 'Selecciona una Unidad.' : '',
        category: formData.category === '' ? 'Selecciona una Categoría.' : '',
        requested_amount: formData.requested_amount === '' ? 'Por favor, completa el campo Cantidad requerida.' : '',
        received_amount: formData.received_amount === '' ? 'Por favor, completa el campo Cantidad recibida.' : ''
    };

    setErrors(newErrors);

    const errorValues = Object.values(newErrors).filter((error) => error !== '');

    // If there are errors, show an alert
    if (errorValues.length > 0) {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorValues.join('\n') 
        });
    return;
    }

    try {
    const currentDate = new Date().toISOString();
    
    const dataToSend = {
        ...formData,
        date: currentDate,
    };
    
    // Make a POST request to the server with the order data
    const response = await axios.post('http://localhost:3001/food_orders', dataToSend);
    console.log('Response from POST request:', response.data);
    
    // Resets form fields after data is submitted
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

// Function to get the dates of the current week
const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
    
    const startOfWeek = new Date(today.setDate(diff));
    const endOfWeek = new Date(today.setDate(diff + 4));
    
    const startDate = startOfWeek.getDate();
    const endDate = endOfWeek.getDate();
    const currentMonth = today.getMonth() + 1;
    
    return {
    start: startDate,
    end: endDate,
    month: currentMonth,
    year: today.getFullYear(),
    };
};

const weekDates = getCurrentWeekDates();
const [currentWeekDates, setCurrentWeekDates] = useState(getCurrentWeekDates());

// Update the dates of the current week
const updateCurrentWeekDates = () => {
    setCurrentWeekDates(getCurrentWeekDates());
};

return (
    <div>
    <div class="page-header6">
        <div class="container">
        <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="page-caption">
                <h1 class="page-title6">Pedidos</h1>
            </div>
            </div>
        </div>
        </div>
    </div>
    <div class="card-section">
        <div class="container">
        <div class="card-block bg-white mb30">
            <div class="row">
        <button className="Vamos" onClick={()=>goToGetOrders('/get_orders')}>Ver pedidos</button>
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="section-title mb-0">
                <form className="myForm" onSubmit={handleSubmit}>
                    <label>
                    Producto:
                    <input
                        type="text"
                        name="article"
                        value={formData.article}
                        onChange={handleChange}
                    />
                    </label>
                    <label>
                    Categoria:
                    <select
                    className='Select-inventory'
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    >
                    <option value="">Selecciona una categoría</option>
                    {categoryOptions.map((option, index) => (
                        <option key={index} value={option}>
                        {option}
                        </option>
                    ))}
                    </select>
                    </label>
                    <label>
                        Unidad de medida:
                        <select
                        className='Select-inventory'
                        name="unit_of_measurement"
                        value={formData.unit_of_measurement}
                        onChange={handleChange}
                        >
                        <option value="">Selecciona una unidad</option>
                        {unitOptions.map((option, index) => (
                            <option key={index} value={option}>
                            {option}
                            </option>
                        ))}
                        </select>
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
                    <button type="submit">Agregar Pedido</button>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    <SideBar></SideBar>
    <footer>
        <Footer></Footer>
    </footer>
    </div>
);
}

export default Orders;
