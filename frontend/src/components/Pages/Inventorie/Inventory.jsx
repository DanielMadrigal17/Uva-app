import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css"
import SideBar from '../../SideBar/SideBar';
import Footer from '../../Footer/Footer'
import axios from 'axios';
import Swal from 'sweetalert2';


function Inventory () {

    const navigate = useNavigate()

    function goToget() {
        navigate('/get_inventorie');
    }

    const [formData, setFormData] = useState({
        item: '',
        unit_of_measure: '',
        category: '',
        quantity: 1,
    });

    const [errors, setErrors] = useState({
        item: '',
        unit_of_measure: '',
        category: '',
        quantity: ''
    });

    // Predefined arrays for categories and units of measure
    const predefinedCategories = [
        'Lácteos',
        'No perecedero ',
        'Vegetales',
        'Frutas',
        'Carnes',
        'Pescado'
    ];

    const predefinedUnit = [
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

    // Function for changing form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        const regex = /[^\w\sñáéíóú]/gi; 
        // Validation for quantity less than 1
        if (name === 'quantity' && parseInt(value) < 1) {
            // If the number is less than 1, set the quantity to 1
            setFormData({ ...formData, [name]: 1 });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Función para enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { item, unit_of_measure, category, quantity } = formData;

        // Validation of empty fields in the form
        const newErrors = {
            item: item.trim() === '' ? 'Por favor, completa el campo de Producto.' : '',
            unit_of_measure: unit_of_measure === '' ? 'Selecciona una Unidad.' : '',
            category: category === '' ? 'Selecciona una Categoría.' : '',
            quantity: quantity === '' ? 'Por favor, completa el campo Cantidad.' : ''
        };

        setErrors(newErrors);

        const errorValues = Object.values(newErrors).filter((error) => error !== '');
        // Error alert if any
        if (errorValues.length > 0) {
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorValues.join('\n') // Muestra mensajes de error separados por nueva línea
        });
        return;
        }
        // Creating the data object and sending the POST request
        const currentDate = new Date().toISOString().split('T')[0]; // Obtiene la fecha en formato 'YYYY-MM-DD'
        try {
            const response = await axios.post('http://localhost:3001/inventories', {
            inventory: { ...formData, date: currentDate } // Agregando la fecha al objeto de datos
            });
            // Success alert and page reload                
            Swal.fire({
            position: "center",
            icon: "success",
            title: "Se agrego correctamente.",
            showConfirmButton: false,
            timer: 1500
            });
        
            window.location.reload();
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "No puedes agregara productos en blanco.",
                showConfirmButton: false,
                timer: 1500
            });
        }
        };
return (
<div>
    <div class="page-header2">
        <div class="container">
            <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="page-caption">
                        <h1 class="page-title">Inventario</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="card-section">
        <div class="container">
            <div class="card-block bg-white mb30">
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="section-title mb-0">
                            <div className='VerInventario' onClick={() => goToget('/get_inventorie')}>
                                <button>
                                    Ver Inventario
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="Form-Inventory">
                                <h1>Agregar producto al Inventario</h1>
                                <label className="form-label" htmlFor="item">Producto:</label>
                                <input
                                    className="Input-Inventory"
                                    type="text"
                                    autoComplete='off'
                                    id="item"
                                    name="item"
                                    value={formData.item}
                                    onChange={handleChange}
                                />

                                <label htmlFor="unit_of_measure">Unidad de Medida:</label>
                                <select
                                    className='Select-inventory'
                                    id="unit_of_measure"
                                    name="unit_of_measure"
                                    value={formData.unit_of_measure}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecciona una Unidad de Medida</option>
                                    {predefinedUnit.map((unit_of_measure) => (
                                        <option key={unit_of_measure} value={unit_of_measure}>
                                            {unit_of_measure}
                                        </option>
                                    ))}
                                </select>

                                <label htmlFor="category">Categoría:</label>
                                <select
                                    className='Select-inventory'
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecciona una Categoría</option>
                                    {predefinedCategories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>

                                <label htmlFor="quantity">Cantidad:</label>
                                <input
                                    className="Input-Inventory"
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                />

                                <div id="tenth" class="buttonBox">
                                    <button>
                                        <span>A</span>
                                        <span>G</span>
                                        <span>R</span>
                                        <span>E</span>
                                        <span>G</span>
                                        <span>A</span>
                                        <span>R</span>
                                    </button>
                                </div>
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
)
}

export default Inventory 


