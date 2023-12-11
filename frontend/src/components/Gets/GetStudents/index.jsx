import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css'
import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';

const Estudiantes = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);
    const navigation = useNavigate();

    function goBack() {
        navigation('/list_assistance');
    }

    const exportPDF = () => {
        const data = estudiantes.map((estudiante) => [
            estudiante.name,
            estudiante.entry_hour_date,
            estudiante.departure_hour_date,
            estudiante.date,
            estudiante.present,
            estudiante.absent,
            estudiante.carrier_name,
            estudiante.official_name,
        ]);
    
        const docDefinition = {
            content: [
                {
                    text: 'Lista de Niños',
                    style: 'header',
                    alignment: 'center',
                    margin: [0, 0, 0, 10],
                },
                {
                    table: {
                        headerRows: 1,
                        widths: [80, 50, 50, 50, 50, 50, 60, 60, 50],
                        body: [
                            [
                                { text: 'Nombre', style: 'tableHeader' },
                                { text: 'Hora de Entrada', style: 'tableHeader' },
                                { text: 'Hora de Salida', style: 'tableHeader' },
                                { text: 'Fecha', style: 'tableHeader' },
                                { text: 'P', style: 'tableHeader' },
                                { text: 'A', style: 'tableHeader' },
                                { text: 'Nombre del Transportista', style: 'tableHeader' },
                                { text: 'Nombre del Oficial', style: 'tableHeader' },
                            ],
                            ...data.map((row) =>
                                row.map((cell) => ({
                                    text: cell,
                                    style: 'tableBody', // Aplicar estilo de tabla al cuerpo
                                }))
                            ),
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
                    margin: [0, 5, 0, 5],
                },
                tableBody: {
                    fontSize: 10,
                    alignment: 'center',
                    margin: [0, 5, 0, 5],
                    height: 20, // Altura de las filas en el cuerpo de la tabla
                },
            },
        };
    
        pdfMake.createPdf(docDefinition).download('estudiantes.pdf');
    };
    

    useEffect(() => {
        obtenerEstudiantes();
    }, []);

    const handleEdit = (estudiante) => {
        setEstudianteSeleccionado(estudiante);
    };

    const obtenerEstudiantes = async () => {
        try {
        const response = await axios.get('http://localhost:3001/register_estudents');
        setEstudiantes(response.data);
        } catch (error) {
        console.error('Hubo un error al obtener los estudiantes:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const url = `http://localhost:3001/register_estudents/${estudianteSeleccionado.id}`;
            const response = await axios.patch(url, estudianteSeleccionado);
            console.log('Estudiante editado correctamente:', response.data);
            setEstudianteSeleccionado(null); // Limpiar el estudiante seleccionado después de la actualización
            obtenerEstudiantes(); // Actualizar la lista de estudiantes después de la edición
            window.location.reload(); // Recargar la página
        } catch (error) {
            console.error('Error al editar el estudiante:', error);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEstudianteSeleccionado({
            ...estudianteSeleccionado,
            [name]: name === 'absent' || name === 'present' ? e.target.checked : value
        });
    };

    const eliminarEstudiante = async (id) => {
        const url = `http://localhost:3001/register_estudents/${id}`;
        try {
            await axios.delete(url);
            console.log('Estudiante eliminado correctamente');
            obtenerEstudiantes(); // Actualizar la lista después de la eliminación
        } catch (error) {
            console.error('Error al eliminar el estudiante:', error);
        }
    };


    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este estudiante?')) {
            await eliminarEstudiante(id);
            window.location.reload();
        }
    };

    return (
        <div className="estudiantes-wrapper">
            <h1>Lista de Estudiantes</h1>
            {estudiantes.length === 0 ? (
                <p>No hay estudiantes en este momento.</p>
                ) : (

            <table className="estudiantes-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Hora de Entrada </th>
                        <th>Hora de Salida</th>
                        <th>Fecha</th>
                        <th>P</th>
                        <th>A</th>
                        <th>Nombre Transportista</th>
                        <th>Nombre Encargado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {estudiantes.map(estudiante => (
                        <tr className="estudiante-item" key={estudiante.id}>
                            <td>{estudiante.name}</td>
                            <td>{estudiante.entry_hour_date}</td>
                            <td>{estudiante.departure_hour_date}</td>
                            <td>{estudiante.date}</td>
                            <td>{estudiante.present}</td>
                            <td>{estudiante.absent}</td>
                            <td>{estudiante.carrier_name}</td>
                            <td>{estudiante.official_name}</td>
                            <td>
                                <button onClick={() => handleEdit(estudiante)}>
                                    Editar
                                </button>
                                <button onClick={() => handleDelete(estudiante.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
            {estudianteSeleccionado && (
                <div className="formulario-editar">
                    <h2>Editar Estudiante</h2>
                    <input
                        type="time"
                        name="entry_hour_date"
                        value={estudianteSeleccionado.entry_hour_date}
                        onChange={handleChange}
                    />

                    <label htmlFor="departure_hour_date">Hora de salida:</label>
                    <input
                    type="text"
                    name="name"
                    id="name"
                    value={estudianteSeleccionado.name}
                    onChange={handleChange}
                    />

                    <label htmlFor="departure_hour_date">Hora de salida:</label>
                    <input
                    type="time"
                    name="departure_hour_date"
                    id="departure_hour_date"
                    value={estudianteSeleccionado.departure_hour_date}
                    onChange={handleChange}
                    />
            
                    <label htmlFor="date">Fecha:</label>
                    <input
                    type="date"
                    name="date"
                    id="date"
                    value={estudianteSeleccionado.date}
                    onChange={handleChange}
                    />
            
                    <label>
                    <input
                        type="checkbox"
                        name="absent"
                        checked={estudianteSeleccionado.absent}
                        onChange={handleChange}
                    />
                    Ausente
                    </label>
            
                    <label>
                    <input
                        type="checkbox"
                        name="present"
                        checked={estudianteSeleccionado.present}
                        onChange={handleChange}
                    />
                    Presente
                    </label>
            
                    <label htmlFor="carrier_name">Nombre del Transportista:</label>
                    <input
                    type="text"
                    name="carrier_name"
                    id="carrier_name"
                    value={estudianteSeleccionado.carrier_name}
                    onChange={handleChange}
                    />
            
                    <label htmlFor="official_name">Nombre del Oficial:</label>
                    <input
                    type="text"
                    name="official_name"
                    id="official_name"
                    value={estudianteSeleccionado.official_name}
                    onChange={handleChange}
                    />
            
                    <label htmlFor="children_id">ID del Estudiante:</label>
                    <input
                    type="text"
                    name="children_id"
                    id="children_id"
                    value={estudianteSeleccionado.children_id}
                    onChange={handleChange}
                    />
                
                    <button onClick={() => {
                        handleUpdate();
                        window.location.reload(); 
                    }}>
                        Actualizar
                    </button>
                </div>
                
            )}

                {estudiantes.length > 0 && (
                    <button onClick={exportPDF}>Exportar a PDF</button>
                )}  

                    <div className="Button-Get-Inventory" onClick={() => goBack('/list_assistance')}>Volver </div>

        </div>
    );
};

export default Estudiantes;
