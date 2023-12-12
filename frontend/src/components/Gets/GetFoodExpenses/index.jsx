import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; 
import { BiEdit } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";


const ExpenseRecordList = () => {
  const [searchDate, setSearchDate] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [expenseRecords, setExpenseRecords] = useState([]);
  const [editingRecordId, setEditingRecordId] = useState(null);

  // Obtener datos de ExpenseRecord al cargar el componente
  useEffect(() => {
    fetchExpenseRecords();
  }, []);

  //Función para buscar por fecha
  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3001/expense_records');
      
      if (response.status === 200) {
        const data = response.data;
        const filteredData = data.filter(record => record.date === searchDate);
        setFilteredResults(filteredData);
      } else {
        console.error('Error al obtener registros');
      }
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    }
  };
  
  const handleDeleteFiltered = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/expense_records/${id}`);
      console.log('ExpenseRecord eliminado correctamente');
      const updatedResults = filteredResults.filter(record => record.id !== id);
      setFilteredResults(updatedResults);
    } catch (error) {
      console.error('Error al eliminar ExpenseRecord:', error);
    }
  };
  
  
  // Función para obtener datos de ExpenseRecord
  const fetchExpenseRecords = async () => {
    try {
      const response = await axios.get('http://localhost:3001/expense_records');
      setExpenseRecords(response.data);
    } catch (error) {
      console.error('Error al obtener ExpenseRecords:', error);
    }
  };

  // Función para eliminar un registro
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/expense_records/${id}`);
      console.log('ExpenseRecord eliminado correctamente');
      fetchExpenseRecords(); // Recargar datos después de eliminar
    } catch (error) {
      console.error('Error al eliminar ExpenseRecord:', error);
    }
  };

  // Función para editar un registro
  const handleEdit = (id) => {
    setEditingRecordId(id);
  };

  return (

  <div>
      <label htmlFor="searchDate">Buscar por fecha:</label><br />
      <div className="searchContainer">
        <input type="date" id="searchDate" name="searchDate" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} className="expenses-searchInput" /><br />
        <button type="button" onClick={handleSearch} className="expenses-searchButton">Buscar</button>
      </div> 

  <h2>Gasto de Alimentos</h2>
  <table style={{ display: filteredResults.length > 0 ? 'none' : 'table' }}>
          <thead>
            <tr>
              <th>Responsable</th>
              <th>Artículo</th>
              <th>Categoria</th>
              <th>Unidad de Medida</th>
              <th>Inventario Previo</th>
              <th>Entrada</th>
              <th>Fecha</th>
              <th>Cantidad</th>
              <th>Alimentos Utilizados</th>
              <th>Total Cuantitativo</th>
              <th>Inventario Final</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {expenseRecords.map(record => (
              <tr key={record.id}>
                <td>{record.responsible_name}</td>
                <td>{record.article}</td>
                <td>{record.category}</td>
                <td>{record.unit_of_measurement}</td>
                <td>{record.previous_inventory}</td>
                <td>{record.entry}</td>
                <td>{record.date}</td>
                <td>{record.quantity}</td>
                <td>{record.foods_used}</td>
                <td>{record.quantitive_total}</td>
                <td>{record.final_inventory}</td>
                <td>
                  <button onClick={() => handleDelete(record.id)}><MdOutlineDeleteOutline /></button>
                  <button onClick={() => handleEdit(record.id)}> <BiEdit /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

  {filteredResults.length > 0 ? (
    <>
      <h2>Resultados de la búsqueda:</h2>
      <table>
        <th>Responsable</th>
        <th>Artículo</th> 
        <th>Categoria</th>
        <th>Unidad de Medida</th>
        <th>Inventario Previo</th>
        <th>Entrada</th>
        <th>Fecha</th>
        <th>Cantidad</th>
        <th>Alimentos Utilizados</th> 
        <th>Acciones</th>
    
      <tbody>
        {filteredResults.map(record => (
          <tr key={record.id}>
            <td>{record.responsible_name}</td>
            <td>{record.article}</td>
            <td>{record.category}</td>
            <td>{record.unit_of_measurement}</td>
            <td>{record.previous_inventory}</td>
            <td>{record.entry}</td>
            <td>{record.date}</td>
            <td>{record.quantity}</td>
            <td>{record.foods_used}</td>
            <td>
              <button onClick={() => handleDeleteFiltered(record.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  ) : (
    searchDate && <p>No se encontraron resultados para la fecha seleccionada.</p>
  )}

  <style>
          {`
            /* Estilos para la tabla */
            table {
              border-collapse: collapse;
              width: 100%;
              color: black
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            tr:hover {
              background-color: #f5f5f5;
            }
            /* Ocultar tabla cuando hay resultados de búsqueda */
            table[style='display: none'] {
              display: table;
            }
          `}
        </style>
  </div>
  );
  
};

export default ExpenseRecordList;

