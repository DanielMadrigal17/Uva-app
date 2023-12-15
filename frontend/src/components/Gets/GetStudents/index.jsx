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
        const establishmentInfo = [
            ['DIRECCIÓN NACIONAL DE CEN-CINAI DIRECCIÓN TÉCNICA - UNAT Versión: 01'],
            ['Procedimiento | Procedimiento para el traslado de niños y niñas mediante contratación de Servicios de Transporte para ser Atendidos en API | CÓDIGO: API-N01-P01-03'],
            ['CONTROL DE ENTRADA Y SALIDA DEL ESTABLECIMIENTO DE LA NIÑA Y EL NIÑO QUE UTILIZA TRANSPORTE'],
            [`Semana del ${weekDates.start} al ${weekDates.end}, Mes: ${weekDates.month}, Año: ${weekDates.year}`],
        ];

        const studentTableData = estudiantes.map((estudiante) => [
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
                    table: {
                        headerRows: 1,
                        widths: ['*'],
                        body: establishmentInfo,
                    },
                    layout: {
                        hLineWidth: function (i, node) {
                            return i === 0 || i === node.table.body.length ? 2 : 1;
                        },
                        vLineWidth: function (i, node) {
                            return 0;
                        },
                        hLineColor: function (i, node) {
                            return i === 0 || i === node.table.body.length ? 'black' : 'gray';
                        },
                        vLineColor: function (i, node) {
                            return 'white';
                        },
                    },
                },
                { text: '\n\n' }, // Add some space between establishment info and student table
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
                            ...studentTableData.map((row) =>
                                row.map((cell) => ({
                                    text: cell,
                                    style: 'tableBody', // Apply table style to the body
                                }))
                            ),
                        ],
                    },
                },
            ],

            footer: function (currentPage, pageCount) {
                return {
                    margin: [40, 10],
                    columns: [
                        {
                            text: 'Logo', // Reemplaza <TU_LOGO_ENCODED> por la imagen en base64
                            width: 50,
                            height: 50,
                            alignment: 'left',
                        },
                        {
                            text: `Página ${currentPage.toString()} de ${pageCount}`,
                            alignment: 'right',
                        },
                    ],
                };
            },
            
            styles: {
                header: {
                    fontSize: 24,
                    bold: true,
                    color: '#333',
                    alignment: 'center',
                    margin: [0, 0, 0, 10],
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
                    height: 20,
                },
            },
        };

        pdfMake.createPdf(docDefinition).download('estudiantes.pdf');
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
            <table className="header-table">
                <tbody>
                    <tr>
                        <td>
                            DIRECCIÓN NACIONAL DE CEN-CINAI DIRECCIÓN TÉCNICA - UNAT
                        </td>
                        <td>
                            Versión: 01
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            Procedimiento | Procedimiento para el traslado de niños y niñas mediante contratación de Servicios de Transporte para ser Atendidos en API | CÓDIGO: API-N01-P01-03
                        </td>
                        
                    </tr>
                </tbody>
            </table>
            <h2 className='h1-students'>CONTROL DE ENTRADA Y SALIDA DEL ESTABLECIMIENTO DE LA NIÑA Y EL NIÑO QUE UTILIZA TRANSPORTE</h2>
            <div>
                <h2 className='h2-students'>
                    Semana del {weekDates.start} al {weekDates.end} , Mes: {weekDates.month}, Año: {weekDates.year}
                </h2>
            </div>
            {estudiantes.length === 0 ? (
                <h3>No hay estudiantes registrados en este momento.</h3>
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

                    <div className="Button-Get-students" onClick={() => goBack('/list_assistance')}>Volver </div>

        </div>
    );
};
 
export default Estudiantes;
