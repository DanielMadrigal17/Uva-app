import React, { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const FoodExpenseForm = () => {
  const getSelectedDate = (selectedDay) => {
    const today = new Date(); 
    const dayIndex = today.getDay();
    const difference = selectedDay - dayIndex;
    const selectedDate = new Date(today.setDate(today.getDate() + difference));
    return selectedDate.toISOString().split('T')[0]; // Formatear la fecha como 'YYYY-MM-DD'
  };

  const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  const navigate = useNavigate();

  function goToGetExpenses() {
    navigate('/get_expenses');
  }

  const [formData, setFormData] = useState({
    responsible_name: '',
    article: '',
    category: '',
    unit_of_measurement: '',
    previous_inventory: '',
    entry: '',
    date: '',
    quantity: '',
    foods_used: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedDate = getSelectedDate(weekDays.indexOf(formData.date) + 1);
      const formattedFormData = {
        ...formData,
        date: selectedDate
      };
  
      const response = await fetch('http://localhost:3001/expense_records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ expense_record: formattedFormData })
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('ExpenseRecord creado:', data);
        window.location.reload();
      } else {
        console.error('Error al crear ExpenseRecord');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  

  return (

    <div>
    <form className='Holiwiiiii' onSubmit={handleSubmit}>
      <label htmlFor="responsible_name">Nombre del responsable:</label><br />
      <input type="text" id="responsible_name" name="responsible_name" value={formData.responsible_name} onChange={handleChange} /><br />

      <label htmlFor="article">Nombre del artículo:</label><br />
      <input type="text" id="article" name="article" value={formData.article} onChange={handleChange} /><br />

      <label htmlFor="article">Categoría:</label><br />
      <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} /><br />

      <label htmlFor="unit_of_measurement">Unidad de medida:</label><br />
      <input type="text" id="unit_of_measurement" name="unit_of_measurement" value={formData.unit_of_measurement} onChange={handleChange} /><br />

      <label htmlFor="previous_inventory">Inventario previo:</label><br />
      <input type="number" id="previous_inventory" name="previous_inventory" value={formData.previous_inventory} onChange={handleChange} /><br />

      <label htmlFor="entry">Entrada:</label><br />
      <input type="number" id="entry" name="entry" value={formData.entry} onChange={handleChange} /><br />

      <label htmlFor="date">Día de la semana:</label><br />
      <select id="date" name="date" value={formData.date} onChange={handleChange}>
        <option value="">Selecciona un día</option>
        {weekDays.map((day, index) => (
          <option key={index} value={day}>{day}</option>
        ))}
      </select>
      
      <label htmlFor="quantity">Cantidad:</label><br />
      <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} /><br />

      <label htmlFor="foods_used">Alimentos utilizados:</label><br />
      <input type="text" id="foods_used" name="foods_used" value={formData.foods_used} onChange={handleChange} /><br />

      <button type="submit">Enviar</button>
      <div className="Vamos" onClick={() => goToGetExpenses('/get_expenses')}>
        Vamos
      </div>
    </form>

    </div>
  );
};

export default FoodExpenseForm;
