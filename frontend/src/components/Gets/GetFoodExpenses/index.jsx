import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css'; 
import { BiEdit } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


const ExpenseRecordList = () => {
  const [searchDate, setSearchDate] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [expenseRecords, setExpenseRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [showExportButton, setShowExportButton] = useState(false);

  const navi = useNavigate()

  const exportPDF = (data) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const docDefinition = {
      content: [
        {
          text: `Gasto de Alimentos (${currentWeekDates.start} al ${currentWeekDates.end}, mes: ${currentWeekDates.month}, año: ${currentWeekDates.year})`,
          style: 'header',
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        {
          table: {
            headerRows: 1,
            widths: ['10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%'],
            body: [
              [
                { text: 'Responsable', style: 'tableHeader' },
                { text: 'Artículo', style: 'tableHeader' },
                { text: 'Categoría', style: 'tableHeader' },
                { text: 'Unidad de Medida', style: 'tableHeader' },
                { text: 'Inventario Previo', style: 'tableHeader' },
                { text: 'Entrada', style: 'tableHeader' },
                { text: 'Fecha', style: 'tableHeader' },
                { text: 'Cantidad', style: 'tableHeader' },
                { text: 'Alimentos Utilizados', style: 'tableHeader' },
                { text: 'Cantidad Total', style: 'tableHeader' },
              ],
              ...data.map((record) => [
                record.responsible_name,
                record.article,
                record.category,
                record.unit_of_measurement,
                record.previous_inventory,
                record.entry,
                record.date,
                record.quantity,
                record.foods_used,
                record.quantitive_total,
              ]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 24,
          bold: true,
          color: '#333', // Cambiar color del texto del encabezado
          margin: [0, 0, 0, 10],
          fontFamily: 'Arial', // Cambiar la fuente del encabezado
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
          height: 30,
        },
      },
      // Definir un estilo de fondo para todo el documento
      background: [
        {
          canvas: [
            {
              type: 'rect',
              x: 0,
              y: 0,
              w: 595.28,
              h: 841.89,
              color: '#f0f0f0', // Cambiar el color del fondo
            },
          ],
        },
      ],
    };
  
    pdfMake.createPdf(docDefinition).download('gasto_de_alimentos.pdf');
  };
  
  
  const exportToPDF = () => {
    exportPDF(expenseRecords);
  };

  // Obtener datos de ExpenseRecord al cargar el componente
  useEffect(() => {
    fetchExpenseRecords();
    updateCurrentWeekDates();
  }, []);

  function Back() {
    navi('/principal')
  }
  

  //Función para buscar por fecha
  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3001/expense_records');
      
      if (response.status === 200) {
        const data = response.data;
        const filteredData = data.filter(record => record.date === searchDate);
        setFilteredResults(filteredData);
        setShowExportButton(filteredData.length > 0); // Mostrar botón de exportar si hay resultados
      } else {
        console.error('Error al obtener registros');
      }
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    }
  };

  const handleExportFilteredToPDF = () => {
    exportPDF(filteredResults); // Utiliza la función exportPDF para exportar los datos filtrados
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
  <div>
  {expenseRecords.length === 0 ? (
      <h2 className='expenses-h2'>No hay productos agregados</h2>
  ) : (
      <div>
  {/* <label htmlFor="searchDate">Buscar por fecha:</label><br />
  <div className="searchContainer">
      <input type="date" id="searchDate" name="searchDate" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} className="expenses-searchInput" /><br />
      <button type="button" onClick={handleSearch} className="expenses-searchButton">Buscar</button>
  </div>    */}
  {filteredResults.length > 0 && (
        <div>
          <button onClick={handleExportFilteredToPDF}>Exportar búsqueda a PDF</button>
        </div>
      )}  
      <h2>Gasto de Alimentos</h2>
      <div>
      <h2>
        Semana del {weekDates.start} al {weekDates.end}, mes: {weekDates.month}, año: {weekDates.year}
      </h2>
    </div>
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
          <div>
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
          </div>
      ) : (
          searchDate && <p>No se encontraron resultados para la fecha seleccionada.</p>
      )}
      </div>
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
          color: black

        }
        th {
          background-color: #f2f2f2;
          color: black

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
    </div>
    <div>
      <div className="Button-Get-Inventory" onClick={() => Back('/principal')}>Volver </div>
    {expenseRecords.length > 0 && (
                <button onClick={exportToPDF}>Exportar a PDF</button>
            )}
    </div>
    
  </div>
  
);
};

export default ExpenseRecordList;

