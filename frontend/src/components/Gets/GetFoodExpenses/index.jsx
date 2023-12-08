import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseRecordList = () => {
  const [expenseRecords, setExpenseRecords] = useState([]);
  const [editingRecordId, setEditingRecordId] = useState(null);

  // Obtener datos de ExpenseRecord al cargar el componente
  useEffect(() => {
    fetchExpenseRecords();
  }, []);

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
      <h2>Expense Records</h2>
      <table>
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
                <button onClick={() => handleDelete(record.id)}>Eliminar</button>
                {/* <button onClick={() => handleEdit(record.id)}>Editar</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style>
        {`
          table {
            border-collapse: collapse;
            width: 100%;
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
        `}
      </style>
    </div>
  );
};

export default ExpenseRecordList;
