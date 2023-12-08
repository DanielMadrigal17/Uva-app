import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ExportPDFButton = ({ foodOrders }) => {
    const generatePDF = () => {
        if (!foodOrders || foodOrders.length === 0) {
            alert('No hay datos disponibles para exportar.');
            return;
        }

        const doc = new jsPDF();
        doc.text('Food Orders', 10, 10); 

        const tableData = foodOrders.map((item) => ({
            Article: item.article,
            'Unit of Measurement': item.unit_of_measurement,
            'Requested Amount': item.requested_amount,
            'Received Amount': item.received_amount,
            Week: item.week,
            Month: item.month,
            Year: item.year,
            Category: item.category,
        }));

        doc.autoTable({
            head: [Object.keys(tableData[0])],
            body: tableData.map((row) => Object.values(row)),
        });

        doc.save('food_orders.pdf'); 
    };

    return (
        <button onClick={generatePDF}>Exportar a PDF</button>
    );
};

export default ExportPDFButton;
