import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './getInventory.css';
import { useNavigate } from 'react-router-dom'


const GetInventary  = () => {
    const navigation = useNavigate();
    const [inventory, setInventory] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    function goToInventory() {
        navigation('/Inventorie');
    }

    useEffect(() => {
        fetchInventory();
    }, []);

    const predefinedCategories = [
        'Lácteos',
        'No perecedero',
        'Vegetales',
        'Frutas',
        'Carnes',
        'Pescado'
    ];

    const predefinedUnits = [
        'Kilogramos',
        'Gramos',
        'Litros',
        'Mililitros',
        'Latas',
        'Unidades',
        'Paquetes',
        'Rollos',
        'Galón'
    ];

    const fetchInventory = async () => {
        try {
            const response = await axios.get('http://localhost:3001/inventories');
            setInventory(response.data);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
    };

    const handleUpdate = async () => {
        try {
            const url = `http://localhost:3001/inventories/${selectedItem.id}`;
            const response = await axios.patch(url, selectedItem);
            console.log('Inventory item updated:', response.data);
            setSelectedItem(null); // Clear selected item after update
            fetchInventory(); // Refresh inventory list after update
        } catch (error) {
            console.error('Error updating inventory item:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedItem({
            ...selectedItem,
            [name]: name === 'quantity' ? parseInt(value, 10) : value,
        });
    };

    const deleteItem = async (id) => {
        const url = `http://localhost:3001/inventories/${id}`;
        try {
            await axios.delete(url);
            console.log('Inventory item deleted successfully');
            fetchInventory(); 
        } catch (error) {
            console.error('Error deleting inventory item:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            deleteItem(id);
        }
    };

    const searchInventory = () => {
        return inventory.filter(item =>
            item.item.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return  (
        <div className="inventory-wrapper">
            <h1>Inventario</h1>
            <input
                type="text"
                placeholder="Busca el producto..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
            />
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Artítulo</th>
                        <th>Unidad</th>
                        <th>Categoria</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {searchInventory().map(item => (
                        <tr className="inventory-item" key={item.id}>
                            <td>{item.item}</td>
                            <td>{item.unit_of_measure}</td>
                            <td>{item.category}</td>
                            <td>{item.quantity}</td>
                            <td>{item.date}</td>
                            <td>
                                <button onClick={() => handleEdit(item)}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(item.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedItem && (
                <div className="edit-form">
                    <h2>Edit Inventory Item</h2>
                    <input
                        type="text"
                        name="item"
                        value={selectedItem.item}
                        onChange={handleChange}
                    />

                    <select
                        name="unit_of_measure"
                        value={selectedItem.unit_of_measure}
                        onChange={handleChange}
                    >
                        {predefinedUnits.map((unit, index) => (
                            <option key={index} value={unit}>
                                {unit}
                            </option>
                        ))}
                    </select>

                    <select
                        name="category"
                        value={selectedItem.category}
                        onChange={handleChange}
                    >
                        {predefinedCategories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        name="quantity"
                        value={selectedItem.quantity}
                        onChange={handleChange}
                    />

                    <input
                        type="date"
                        name="date"
                        value={selectedItem.date}
                        onChange={handleChange}
                    />

                    <button onClick={() => handleUpdate()}>
                        Update
                    </button>
                </div>
            )}
        <div className="Vamos" onClick={()=>goToInventory('/inventorie')}>Añadir Productos</div>
        </div>
        
    );
};

export default GetInventary ;
