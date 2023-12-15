import React, { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../SideBar/SideBar';
import Swal from 'sweetalert2';

const FoodExpenseForm = () => {
  // State for form and navigation
  const [formData, setFormData] = useState({
    responsible_name: '',
    article: '',
    category: '',
    unit_of_measurement: '',
    previous_inventory: '',
    entry: '',
    quantity: '',
    foods_used: ''
  });

  const [errors, setErrors] = useState({
    responsible_name: '',
    article: '',
    category: '',
    unit_of_measurement: '',
    previous_inventory: '',
    entry: '',
    quantity: '',
    foods_used: ''
  });

  // Predefined options for categories and units of measure
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

  // Navigation
  const navigate = useNavigate();
  function goToGetExpenses() {
    navigate('/get_expenses');
  }

  //Function to handle changes to the form 
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Expresión regular para permitir solo letras y espacios
    const regex = /^[A-Za-z\s]+$/;
  
    if (name === 'article' || name === 'responsible_name') {
      // Verificar si el valor contiene solo letras y espacios
      if (value === '' || regex.test(value)) {
        // Actualizar el estado solo si el valor es vacío o contiene letras y espacios
        setFormData({
          ...formData,
          [name]: value
        });
      }
      return; // Detener la ejecución del resto del código
    }
  
    // Actualizar el estado para otros campos
    setFormData({
      ...formData,
      [name]: value
    });
  };
  

  //Function to submit the form 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Error validation
    const newErrors = {
      responsible_name: formData.responsible_name.trim() === '' ? 'Completa el campo Nombre del responsable.' : '',
      article: formData.article.trim() === '' ? 'Completa el campo Nombre del artículo.' : '',
      category: formData.category.trim() === '' ? 'Completa el campo Categoría.' : '',
      unit_of_measurement: formData.unit_of_measurement.trim() === '' ? 'Completa el campo Unidad de medida.' : '',
      previous_inventory: formData.previous_inventory.trim() === '' ? 'Completa el campo Inventario previo.' : '',
      entry: formData.entry.trim() === '' ? 'Completa el campo Entrada.' : '',
      quantity: formData.quantity.trim() === '' ? 'Completa el campo Cantidad.' : '',
      foods_used: formData.foods_used.trim() === '' ? 'Completa el campo Alimentos utilizados.' : ''
    };

    setErrors(newErrors);

    const errorValues = Object.values(newErrors).filter((error) => error !== '');

    if (errorValues.length > 0) {
      // show error message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorValues.join('\n')
      });
      return;
    }

    try {
      // Get current date
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      const dataToSend = { ...formData, date: formattedDate };

      // Send data to server
      const response = await fetch('http://localhost:3001/expense_records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ expense_record: dataToSend })
      });

      if (response.ok) {
        // Show success message
        const data = await response.json();
        console.log('ExpenseRecord creado:', data);
        Swal.fire({
          icon: 'success',
          title: '¡Enviado!',
          text: 'Los datos han sido enviados correctamente.'
        });
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
      <div class="page-header3">
        <div class="container">
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="page-caption">
                <h1 class="page-title2">Gastos Semanales</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="card-section">
        <div class="container">
          <div class="card-block bg-white mb30">
            <div class="row">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="section-title mb-0">
                    <div className="Vamos" onClick={() => goToGetExpenses('/get_expenses')}>
                      Ver Gastos
                    </div>
                  <form className='Expenses' onSubmit={handleSubmit}>
                    <label htmlFor="responsible_name">Nombre del responsable:</label><br />
                    <input autoComplete='off' type="text" id="responsible_name" name="responsible_name" value={formData.responsible_name} onChange={handleChange} /><br />
  
                    <label htmlFor="article">Nombre del artículo:</label><br />
                    <input autoComplete='off' type="text" id="article" name="article" value={formData.article} onChange={handleChange} /><br />
  
                    <label htmlFor="article">Categoría:</label><br />
                    <select className='Select-inventory'id="category" name="category" value={formData.category} onChange={handleChange}>
                      <option value="">Seleccione una categoría</option>
                      {predefinedCategories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>  
                    <label htmlFor="unit_of_measurement">Unidad de medida:</label><br />
                    <select className='Select-inventory'id="unit_of_measurement" name="unit_of_measurement" value={formData.unit_of_measurement} onChange={handleChange}>
                      <option value="">Seleccione una unidad</option>
                      {predefinedUnit.map((unit, index) => (
                        <option key={index} value={unit}>{unit}</option>
                      ))}
                    </select>  
                    <label htmlFor="previous_inventory">Inventario previo:</label><br />
                    <input autoComplete='off' type="number" id="previous_inventory" name="previous_inventory" value={formData.previous_inventory} onChange={handleChange} /><br />
  
                    <label htmlFor="entry">Entrada:</label><br />
                    <input autoComplete='off' type="number" id="entry" name="entry" value={formData.entry} onChange={handleChange} /><br />
                    
                    <label htmlFor="quantity">Cantidad:</label><br />
                    <input autoComplete='off' type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} /><br />
  
                    <label htmlFor="foods_used">Alimentos utilizados:</label><br />
                    <input autoComplete='off' type="text" id="foods_used" name="foods_used" value={formData.foods_used} onChange={handleChange} /><br />
  
                    <button type="submit">Enviar</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <SideBar></SideBar>
      <footer>
        <footer></footer>
      </footer>
    </div>
  );
  
};

export default FoodExpenseForm;
