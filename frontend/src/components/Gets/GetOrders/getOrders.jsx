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
    const [searchCategory, setSearchCategory] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);

    const handleSearch = () => {
        const filtered = foodOrders.filter((item) =>
            item.category.toLowerCase().includes(searchCategory.toLowerCase())
        );
        setFilteredOrders(filtered);
    };

    const handleReset = () => {
        setSearchCategory('');
        setFilteredOrders([]);
    };

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
            text: "Dirección Técnica - UNAT",
            text: 'Pedido de Alimentos',
            text: `Pedido de Alimentos (${currentWeekDates.start} al ${currentWeekDates.end}, mes: ${currentWeekDates.month}, año: ${currentWeekDates.year})`,
            style: 'header',
            alignment: 'center', // Alinea el texto al centro
            margin: [0, 0, 0, 10], // Márgenes del texto
            },

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
        updateCurrentWeekDates();
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

    const handleDelete = async (id) => {
        try {
            const url = `http://localhost:3001/food_orders/${id}`;
            await axios.delete(url);
            console.log('Elemento eliminado correctamente');
            fetchData(); 
        } catch (error) {
            console.error('Error al eliminar el elemento:', error);
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
        <div className="tableContainer">

        <div>
            <input
                type="text"
                placeholder="Buscar por categoría"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
            />
            <button onClick={handleSearch}>Buscar</button>
            <button onClick={handleReset}>Reset</button>
        </div>
        <div>
            <h2>
                Semana del {weekDates.start} al {weekDates.end}, mes: {weekDates.month}, año: {weekDates.year}
            </h2>
        </div>

        <table className="food-orders-table">
        <thead>
                    <tr>
                        <th>Articulo</th>
                        <th>Unidad de medida</th>
                        <th>Cantidad solicitada</th>
                        <th>Cantidad requerida</th>
                        <th>Categoria</th>
                        <th>Acciones</th>
                    </tr>
            </thead>
            <tbody>
                {(filteredOrders.length > 0 ? filteredOrders : foodOrders).map((item) => (
                    <tr key={item.id}>
                            <td>{item.article}</td>
                            <td>{item.unit_of_measurement}</td>
                            <td>{item.requested_amount}</td>
                            <td>{item.received_amount}</td>
                            <td>{item.category}</td>                           
                            <td>
                            <button onClick={() => handleEdit(item)}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(item.id)}>
                                Eliminar
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




