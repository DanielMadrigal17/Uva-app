import React, { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';


const FoodExpenseForm = () => {
  const [selectedUnit, setSelectedUnit] = useState('');
  const getSelectedDate = (selectedDay) => {
    const today = new Date(); 
    const dayIndex = today.getDay();
    const difference = selectedDay - dayIndex;
    const selectedDate = new Date(today.setDate(today.getDate() + difference));
    return selectedDate.toISOString().split('T')[0]; // Formatear la fecha como 'YYYY-MM-DD'
  };

  const handleUnitChange = (e) => {
    setFormData({
      ...formData,
      unit_of_measurement: e.target.value
    });
  };

  const predefinedCategories = [
    'No perecedero ',
    'Lácteos',
    'Vegetales',
    'Frutas',
    'Carnes',
    'Pescado'
  ];

  const predefinedUnit = [
      'Kilogramos',
      'Litros',
      'Galón ',
      'Latas',
      'Paquete',
      'Rollos',
      'Unidades',
  ];

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
    // date: '',
    quantity: '',
    foods_used: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'previous_inventory' || name === 'entry' || name === 'quantity') {
      if (parseFloat(value) < 0) {
        return; // Si es menor que cero, no actualices el estado
      }
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      const dataToSend = { ...formData, date: formattedDate };
  
      const response = await fetch('http://localhost:3001/expense_records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ expense_record: dataToSend })
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
      <select
          className='Select-inventory'
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

      <label htmlFor="unit_of_measurement">Unidad de medida:</label><br />
      <select  id="unit_of_measurement" name="unit_of_measurement" value={formData.unit_of_measurement} onChange={handleUnitChange} className='Select-inventory'>
        <option value="">Selecciona una unidad</option>
        {predefinedUnit.map((unit, index) => (
          <option key={index} value={unit}>{unit}</option>
        ))}
      </select>

      <label htmlFor="previous_inventory">Inventario previo:</label><br />
      <input autoComplete='off' type="number" id="previous_inventory" name="previous_inventory" value={formData.previous_inventory} onChange={handleChange} /><br />

      <label htmlFor="entry">Entrada:</label><br />
      <input autoComplete='off' type="number" id="entry" name="entry" value={formData.entry} onChange={handleChange} /><br />

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
