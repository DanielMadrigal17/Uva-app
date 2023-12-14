// PDFGenerator.jsx

import React from 'react';
import { PDFViewer, Document, Page, View, Text } from '@react-pdf/renderer';

const PDFGenerator = ({ expenseRecords }) => {
    return (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
        <Document>
            <Page size="A4">
            <View>
                <Text>Reporte de Gasto de Alimentos</Text>
                <View>
                {expenseRecords.map((record) => (
                    <View key={record.id}>
                    <Text>{`Responsable: ${record.responsible_name}`}</Text>
                    <Text>{`Artículo: ${record.article}`}</Text>
                    </View>
                ))}
                </View>
            </View>
            </Page>
        </Document>
        </PDFViewer>
    );
};

export default PDFGenerator;
