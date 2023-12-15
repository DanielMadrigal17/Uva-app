import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import Swal from 'sweetalert2';
import axios from 'axios';

function StudentRegistrationForm() {
  /* The code `const [formData, setFormData] = useState({...})` is using the `useState` hook in React
  to create a state variable called `formData` and a corresponding function called `setFormData` to
  update the state. */
  const [formData, setFormData] = useState({
      entry_hour_date: '',
      departure_hour_date: '',
      absent: false,
      present: false,
      carrier_name: '',
      official_name: '',
      name: ''
  });

  /* The code `const [errors, setErrors] = useState({...})` is using the `useState` hook in React to
  create a state variable called `errors` and a corresponding function called `setErrors` to update
  the state. */
  const [errors, setErrors] = useState({
    entry_hour_date: '',
    departure_hour_date: '',
    date: '',
    carrier_name: '',
    official_name: '',
    name: ''
  });

  const navigate = useNavigate();

  /**
   * The handleChange function updates the formData state based on the changes in the input fields.
   */
  const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      const val = type === 'checkbox' ? checked : value;

      if ((name === 'absent' && val) && formData.present) {
      setFormData({
          ...formData,
          present: false,
          [name]: val
      });
      } else if ((name === 'present' && val) && formData.absent) {
      setFormData({
          ...formData,
          absent: false,
          [name]: val
      });
      } else {
      setFormData({
          ...formData,
          [name]: val
      });
      }
  };


  /**
   * The `handleSubmit` function is an asynchronous function that handles form submission, validates
   * form data, sends a POST request to a server, and displays success or error messages.
   * @returns The function does not explicitly return anything.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {
      entry_hour_date: formData.entry_hour_date.trim() === '' ? 'Por favor, completa la Hora de entrada.' : '',
      departure_hour_date: formData.departure_hour_date.trim() === '' ? 'Por favor, completa la Hora de salida.' : '',
      carrier_name: formData.carrier_name.trim() === '' ? 'Por favor, completa el Nombre del Transportista.' : '',
      official_name: formData.official_name.trim() === '' ? 'Por favor, completa el Nombre del Oficial.' : '',
      name: formData.name.trim() === '' ? 'Por favor, completa el Nombre del Estudiante.' : ''
    };

    setErrors(newErrors);

    const errorValues = Object.values(newErrors).filter((error) => error !== '');

    if (errorValues.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorValues.join('\n')
      });
      return;
    }

      const url = "http://localhost:3001/register_estudents";
      const currentDate = new Date().toISOString().split('T')[0]; // Obtiene la fecha en formato 'YYYY-MM-DD'
      try {
        const response = await axios.post('http://localhost:3001/register_estudents', {
          ...formData,
          date: currentDate // Agrega la fecha actual al objeto de datos a enviar
        });
  
        console.log(response.data, "si llega");
        Swal.fire({
          icon: 'success',
          title: '¡Enviado!',
          text: 'Los datos han sido enviados correctamente.'
        });
        window.location.reload()
      } catch (error) {
        console.error('Error:', error);
      }
    };
  

  return  (
    <div className="form-container2"> 
    
      <h1>Formulario de Registro </h1>
      <form onSubmit={handleSubmit}>

      <label htmlFor="name">Nombre del Estudiante:</label>
        <input
            type="text"
            name="name"
            id="name"
            autoComplete='off'
            value={formData.name}
            onChange={handleChange}
        />
        <label htmlFor="entry_hour_date">Hora de entrada:</label>
        <input
          type="time"
          name="entry_hour_date"
          id="entry_hour_date"
          value={formData.entry_hour_date}
          onChange={handleChange}
        />

        <label htmlFor="departure_hour_date">Hora de salida:</label>
        <input
          type="time"
          name="departure_hour_date"
          id="departure_hour_date"
          value={formData.departure_hour_date}
          onChange={handleChange}
        />
        <label htmlFor="carrier_name">Nombre del Transportista:</label>
        <input
          type="text"
          autoComplete='off'
          name="carrier_name"
          id="carrier_name"
          value={formData.carrier_name}
          onChange={handleChange}
        />

        <label htmlFor="official_name">Nombre del Oficial:</label>
        <input
          type="text"
          autoComplete='off'
          name="official_name"
          id="official_name"
          value={formData.official_name}
          onChange={handleChange}
        />
        <div className='Hola'>
        <label>
          <input
            type="checkbox"
            name="absent"
            checked={formData.absent}
            onChange={handleChange}
          />
          Ausente
        </label>

        <label>
          <input
            type="checkbox"
            name="present"
            checked={formData.present}
            onChange={handleChange}
          />
          Presente
        </label>
        </div>
        <input type="submit" value="Registrar" />
      </form>
    </div>
);
}

export default StudentRegistrationForm;

