import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; 
import { BiEdit } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import iconsedit from '../../../assets/img/iconsedit.png';


const ExpenseRecordList = () => {
  const [searchDate, setSearchDate] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [expenseRecords, setExpenseRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [cantidadTotal, setCantidadTotal] = useState(0);

  // Obtener datos de ExpenseRecord al cargar el componente
  useEffect(() => {
    fetchExpenseRecords();
  }, []);

  useEffect(() => {
    // Llamar a la ruta para obtener la cantidad total de alimentos utilizados
    fetchCantidadTotal();
  }, []);

  const fetchCantidadTotal = async () => {
    try {
      const response = await axios.get('http://localhost:3001/expense_records/calculate_foods_used');
      setCantidadTotal(response.data.cantidad_total);
    } catch (error) {
      console.error('Error al obtener la cantidad total:', error);
    }
  };

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

  const handleEdit = (record) => {
    setEditingRecord(record);
  };

  const handleUpdate = async () => {
    try {
      const url = `http://localhost:3001/expense_records/${editingRecord.id}`;
      await axios.patch(url, editingRecord);
      console.log('Registro actualizado correctamente:', editingRecord);
      setEditingRecord(null); // Limpiar el registro editado después de la actualización
      fetchExpenseRecords(); // Recargar datos después de la actualización
    } catch (error) {
      console.error('Error al actualizar el registro:', error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingRecord({
      ...editingRecord,
      [name]: value,
    });
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
                  <th>Cantidad Total</th>
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
                      <button onClick={() => handleEdit(record)}><BiEdit/></button>

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
                  <button onClick={() => handleEdit(record)}><BiEdit /></button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
      ) : (
        searchDate && <p>No se encontraron resultados para la fecha seleccionada.</p>
      )}

      {editingRecord && (
        <div>
          <h2>Editar Registro</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="responsible_name"
              value={editingRecord.responsible_name}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="article"
              value={editingRecord.article}
              onChange={handleEditChange}
              />
              <input
              type="text"
              name="category"
              value={editingRecord.category}
              onChange={handleEditChange}
              />
              <input
              type="text"
              name="unit_of_measurement"
              value={editingRecord.unit_of_measurement}
              onChange={handleEditChange}
              />
              <input
              type="text"
              name="previous_inventory"
              value={editingRecord.previous_inventory}
              onChange={handleEditChange}
              />
              <input 
              type="number" 
              id="entry" 
              name="entry" 
              value={editingRecord.entry} 
              onChange={handleEditChange} 
              />
              
              
              <button type="submit">Guardar Cambios</button>
          </form>
        </div>
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
      <div>
      <h2>Cantidad Total de Alimentos Utilizados: {cantidadTotal}</h2>
    </div>
    </div>
  );

  
};

export default ExpenseRecordList;

