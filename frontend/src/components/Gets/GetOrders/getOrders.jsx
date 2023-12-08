import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import './getOrders.css'
import { useNavigate } from 'react-router-dom'
// import cinai from '../../../assets/img/cencinai.png'


pdfMake.vfs = pdfFonts.pdfMake.vfs;

const GetOrders = () => {
    const navigation = useNavigate();
    const [foodOrders, setFoodOrders] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const exportPDF = () => {
        const data = foodOrders.map((item) => [
            item.article,
            item.category,
            item.unit_of_measurement,
            item.requested_amount,
            item.received_amount,
            item.week,
            item.month,
            item.year,
        ]);
        
        const docDefinition = {
        content: [
            {
            text: 'Pedido de Alimentos',
            style: 'header',
            alignment: 'center', // Alinea el texto al centro
            margin: [0, 0, 0, 10], // Márgenes del texto
            },
            // {
            //     image: ,
            //     fit: [100, 100], // Ajusta el tamaño de la imagen
            //     alignment: 'center', // Alinea la imagen al centro
            //     margin: [0, 20], // Márgenes de la imagen
            // },
            {
            table: {
                headerRows: 1,
                widths: [50, 70, 80, 60, 60, 50, 50, 40],
                body: [
                [
                    { text: 'Artículo', style: 'tableHeader' },
                    { text: 'Categoria', style: 'tableHeader' },
                    { text: 'Unidad de medida', style: 'tableHeader' },
                    { text: 'Monto requerido', style: 'tableHeader' },
                    { text: 'Monto Recibido', style: 'tableHeader' },
                    { text: 'Semana', style: 'tableHeader' },
                    { text: 'Mes', style: 'tableHeader' },
                    { text: 'Año', style: 'tableHeader' },
                ],
                ...data,
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
            margin: [0, 5, 0, 5], // Ajusta los márgenes del encabezado de la tabla
            },
        },
        };
        
        pdfMake.createPdf(docDefinition).download('food_orders.pdf');
            
    }
    useEffect(() => {
        fetchData();
    }, []);

    function goToOrders() {
        navigation('/principal');
    }

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/food_orders');
            setFoodOrders(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
    };

    const handleUpdate = async () => {
        try {
            const url = `http://localhost:3001/food_orders/${selectedItem.id}`;
            const response = await axios.put(url, selectedItem);
            console.log('Data updated:', response.data);
            setSelectedItem(null); // Limpiar el elemento seleccionado después de la actualización
            fetchData(); // Refrescar los datos después de la actualización
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedItem({
            ...selectedItem,
            [name]: value,
        });
    };

    return (
        <div className="tableContainer">
            <h1>Food Orders</h1>
            <table className="food-orders-table">
                <thead>
                        <tr>
                            <th>Articulo</th>
                            <th>Unidad de medida</th>
                            <th>Monto requerido</th>
                            <th>Monto pedido</th>
                            <th>Semana</th>
                            <th>Mes</th>
                            <th>Año</th>
                            <th>Categoria</th>
                            <th>Acciones</th>
                        </tr>
                </thead>
                <tbody>
                    {foodOrders.map((item) => (
                        <tr key={item.id}>
                                <td>{item.article}</td>
                                <td>{item.unit_of_measurement}</td>
                                <td>{item.requested_amount}</td>
                                <td>{item.received_amount}</td>
                                <td>{item.week}</td>
                                <td>{item.month}</td>
                                <td>{item.year}</td>
                                <td>{item.category}</td>
                                <td>
                                    <button onClick={() => handleEdit(item)}>
                                        Edit
                                    </button>
                                </td>
                            </tr>
                    ))}
                </tbody>
            </table>
    
            {selectedItem && (
                <div className="edit-form">
                    <h2>Edit Food Order</h2>
                    <input
                        type="text"
                        name="article"
                        value={selectedItem.article}
                        onChange={handleChange}
                    />
                    <input
                            type="text"
                            name="unit_of_measurement"
                            value={selectedItem.unit_of_measurement}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="requested_amount"
                            value={selectedItem.requested_amount}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="received_amount"
                            value={selectedItem.received_amount}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="week"
                            value={selectedItem.week}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="month"
                            value={selectedItem.month}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="year"
                            value={selectedItem.year}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="category"
                            value={selectedItem.category}
                            onChange={handleChange}
                        />
                    <button onClick={handleUpdate}>Update</button>
                </div>
            )}
    
            <div className="back-to-principal" onClick={() => goToOrders('/principal')}>
                Principal
            </div>
            <button onClick={exportPDF}>Exportar a PDF</button>
        </div>
    );
    };

export default GetOrders;




