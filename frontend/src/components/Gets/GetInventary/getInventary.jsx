import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pdfMake from 'pdfmake/build/pdfmake'; // Importa pdfmake
import pdfFonts from 'pdfmake/build/vfs_fonts'; // Importa las fuentes
import axios from 'axios';
import './getInventory.css'; 
import Swal from 'sweetalert2'


const GetInventary = () => {
    // Inicio de estados
    const navigation = useNavigate();
    const [inventory, setInventory] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const exportPDF = () => {
        const data = inventory.map((item) => [
            item.item,
            item.unit_of_measure,
            item.category,
            item.quantity,
            item.date,
        ]);
    
        const docDefinition = {
            content: [
                {
                    text: 'Lista de Inventario',
                    style: 'header',
                    alignment: 'center',
                    margin: [0, 0, 0, 10],
                },
                {
                    table: {
                        headerRows: 1,
                        widths: [95, 95, 95, 95, 95],
                        body: [
                            [
                                { text: 'Artículo', style: 'tableHeader' },
                                { text: 'Unidad', style: 'tableHeader' },
                                { text: 'Categoría', style: 'tableHeader' },
                                { text: 'Cantidad', style: 'tableHeader' },
                                { text: 'Fecha', style: 'tableHeader' },
                            ],
                            ...data.map((row) => row.map((cell) => ({ text: cell, style: 'tableBody' }))),
                        ],
                    },
                },
            ],
            styles: {
                header: {
                    fontSize: 24,
                    bold: true,
                },
                tableHeader: {
                    bold: true,
                    fontSize: 12,
                    color: 'black',
                    fillColor: '#f2f2f2',
                    alignment: 'center',
                    margin: [0, 5, 0, 5],
                },
                tableBody: {
                    fontSize: 10,
                    alignment: 'center',
                    margin: [0, 5, 0, 5],
                    height: 30, // Altura de las filas en el cuerpo de la tabla
                },
            },
        };
    
        pdfMake.createPdf(docDefinition).download('inventario.pdf');
    };
    

    // Navegar a la página del inventario
    function goToInventory() {
        navigation('/Inventorie');
    }

    // Aca se obtienen los datos cuandos se carga el componente 
    useEffect(() => {
        fetchInventory();
    }, []);

    // Categorías predefinidas
    const predefinedCategories = [
        'Lácteos',
        'No perecedero',
        'Vegetales',
        'Frutas',
        'Carnes',
        'Pescado'
    ];

    // Unidades predefinidas
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

    // Función get para traer los datos del servidor 
    const fetchInventory = async () => {
        try {
            const response = await axios.get('http://localhost:3001/inventories');
            setInventory(response.data);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    // Función para manejar los edits
    const handleEdit = (item) => {
        setSelectedItem(item);
    };

    // Se hace el patch para que se pueda actualizar un elemento
    const handleUpdate = async () => {
        try {
            const url = `http://localhost:3001/inventories/${selectedItem.id}`;
            const response = await axios.patch(url, selectedItem);
            console.log('Inventory item updated:', response.data);
            await Swal.fire({
                title: "Editado correctamente.",
                icon: "success"
            });   
            setSelectedItem(null); // Limpiar el item seleccionado después de la actualización
            fetchInventory(); // Actualizar la lista de inventario después de la actualización
        } catch (error) {
            console.error('Error updating inventory item:', error);
        }
    };

    // Función para manejar el cambio en los campos de edición
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedItem({
            ...selectedItem,
            [name]: name === 'quantity' ? parseInt(value, 10) : value,
        });
    };

    // Eliminar un elemento del inventario
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
            const result = await Swal.fire({
            title: "Estas Segur@?",
            text: "No podrás revertir esto.!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, elíminalo!"
            });
        
            if (result.isConfirmed) {
            deleteItem(id);
            await Swal.fire({
                title: "Eliminado correctamente.",
                icon: "success"
            });
            }
        };

    // Función para filtrar los elementos pos categoría o nombre
    const searchInventory = () => {
        return inventory.filter(item =>
            (item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    };

    // Función para manejar el cambio en el campo de búsqueda
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="Div-Get-Inventory">
        <h1 className="H1-Get-Inventory">Inventario</h1>
        {inventory.length === 0 ? (
            <p >No hay productos agregados.</p>
        ) : (
            <React.Fragment>
            <input
                className="Search-Get-Inventory"
                type="text"
                placeholder="Busca el producto o categoría..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <table className="Get-inventory-table">
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
                        <tr className="Get-inventory-item" key={item.id}>
                            <td>{item.item}</td>
                            <td>{item.unit_of_measure}</td>
                            <td>{item.category}</td>
                            <td>{item.quantity}</td>
                            <td>{item.date}</td>
                            <td>
                                <button className="Button-Get-Inventory" onClick={() => handleEdit(item)}>
                                    Editar
                                </button>
                                <button className="Button-Get-Inventory" onClick={() => handleDelete(item.id)}>
                                    Borrar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="Button-Get-Inventory " onClick={() => exportPDF()}>
                    Exportar a PDF
                </div>
            </React.Fragment>
            
        )}
    {selectedItem && (
                <div className="edit-form">
                    <h2>Editar inventario</h2>
                    <input
                        className="Input-Get-Inventory"
                        type="text"
                        name="item"
                        value={selectedItem.item}
                        onChange={handleChange}
                    />
    
                    <select
                        className="Select-Get-Inventory"
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
                        className="Select-Get-Inventory"
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
                        className="Input-Get-Inventory"
                        type="number"
                        name="quantity"
                        value={selectedItem.quantity}
                        onChange={handleChange}
                    />
    
                    <button className="Button-Get-Inventory"  onClick={() => handleUpdate()}>
                        Editar
                    </button>
                </div>
            )}    
            <div className='separator'>
                <div className="Button-Get-Inventory" onClick={() => goToInventory('/inventorie')}>Volver </div>
            </div>
            
            </div>
    );
    
};

export default GetInventary;
