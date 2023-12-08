import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css"
import SideBar from '../SideBar/SideBar';
import NavBarPrincipal from '../NavBarPrincipal/NavBarPrincipal'
import carton from '../../assets/img/carton.png';
import fondo from '../../assets/img/fondo.jpeg';
import axios from 'axios';


function Inventory () {

    const navigate = useNavigate()

    function goToget() {
        navigate('/get_inventorie');
    }

    const [formData, setFormData] = useState({
        item: '',
        unit_of_measure: '',
        category: '',
        quantity: 0,
        date: ''
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
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post('http://localhost:3001/inventories', {
            inventory: formData
        });
        console.log('Inventory created:', response.data);
        } catch (error) {
        console.error('Error creating inventory:', error);
        }
    };


    return (
        <div>
            <img className='fondo' src={fondo} alt='fondo'></img>
            <NavBarPrincipal></NavBarPrincipal>
            <header className="header3">
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

        <div className="Vamos" onClick={()=>goToget('/get_inventorie')}>Ver Inventario</div>

    <form onSubmit={handleSubmit} className="inventory-form">
        <label className="form-label" htmlFor="item">Item:</label>
        <input
            type="text"
            autoComplete='off'
            id="item"
            name="item"
            value={formData.item}
            onChange={handleChange}
        />

        <label htmlFor="unit_of_measure">Unit of Measure:</label>
        <select
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

        <label htmlFor="category">Category:</label>
        <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
        >
            <option value="">Select a category</option>
            {predefinedCategories.map((category) => (
            <option key={category} value={category}>
                {category}
            </option>
            ))}
        </select>

        <label htmlFor="quantity">Quantity:</label>
        <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
        />

        <label htmlFor="date">Date:</label>
        <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
        />

        <button className="form-button" type="submit">Submit</button>
        </form>
    </div>
    <SideBar></SideBar>
</div>
)
}

export default Inventory 


