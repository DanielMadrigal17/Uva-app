import React, { useState } from 'react';
import './styles.css';

function StudentRegistrationForm() {
    const [formData, setFormData] = useState({
        entry_hour_date: '',
        departure_hour_date: '',
        date: '',
        absent: false,
        present: false,
        carrier_name: '',
        official_name: '',
        name: ''
    });

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


    const handleSubmit = async (e) => {
        const url = "http://localhost:3001/register_estudents";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) {throw data.error};
            console.log(data, "si llega")
        } catch (error) {
            console.error("Error:", error);
        
        }
    
    };

    return  (
        <div className="form-container">
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
            <label htmlFor="date">Fecha:</label>
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
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
          
            <input type="submit" value="Enviar" />
          </form>
        </div>
    );
}

export default StudentRegistrationForm;
