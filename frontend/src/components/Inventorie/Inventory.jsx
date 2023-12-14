import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css"
import SideBar from '../SideBar/SideBar';
import carton from '../../assets/img/carton.png';
import fondo from '../../assets/img/fondo.jpeg';
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
        // date: ''
    });

    const [errors, setErrors] = useState({
        item: '',
        unit_of_measure: '',
        category: '',
        quantity: ''
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        const regex = /[^\w\sñáéíóú]/gi; 

        if (regex.test(value)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se permite ingresar emojis ni números"
            })
            return                 
        }

        if (name === 'quantity' && parseInt(value) < 1) {
            // Si el número es menor que 1, establece la cantidad en 1
            setFormData({ ...formData, [name]: 1 });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { item, unit_of_measure, category, quantity } = formData;

        const newErrors = {
            item: item.trim() === '' ? 'Por favor, completa el campo de Producto.' : '',
            unit_of_measure: unit_of_measure === '' ? 'Selecciona una Unidad.' : '',
            category: category === '' ? 'Selecciona una Categoría.' : '',
            quantity: quantity === '' ? 'Por favor, completa el campo Cantidad.' : ''
        };

        setErrors(newErrors);

        const errorValues = Object.values(newErrors).filter((error) => error !== '');

        if (errorValues.length > 0) {
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorValues.join('\n') // Muestra mensajes de error separados por nueva línea
        });
        return;
        }

        const currentDate = new Date().toISOString().split('T')[0]; // Obtiene la fecha en formato 'YYYY-MM-DD'
        try {
            const response = await axios.post('http://localhost:3001/inventories', {
            inventory: { ...formData, date: currentDate } // Agregando la fecha al objeto de datos
            });
            console.log('Inventory created:', response.data);
        
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
            <img className='fondo' src={fondo} alt='fondo'></img>
            <header className="header3">
                <div className='VerInventario' onClick={() => goToget('/get_inventorie')}>
                    <button>
                        Ver Inventario
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className="text-box">
                    <div className="loader3">
                        <h1 className="heading-primary">Inventario</h1>
                            <span className="heading-primary-sub2">       
                            </span>
                        <img className='carton2' src={carton} alt="carton" />
                    </div>
                </div>
            </header>

        <div>
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

                <label htmlFor="unit_of_measure">Unidad de medida:</label>
                <select
                    className='Select-inventory'
                    id="unit_of_measure"
                    name="unit_of_measure"
                    value={formData.unit_of_measure}
                    onChange={handleChange}
                >
                    <option value="">Select a Unit</option>
                    {predefinedUnit.map((unit_of_measure) => (
                    <option key={unit_of_measure} value={unit_of_measure}>
                        {unit_of_measure}
                    </option>
                    ))}
                </select>

                <label htmlFor="category">Categoria:</label>
                <select
                    className='Select-inventory'
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="">Seleccione una categoria</option>
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
            <SideBar></SideBar>
    </div>
)
}

export default Inventory 


