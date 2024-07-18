import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { database } from '../config/Firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

// Función para eliminar un documento de Firestore
const handleDelete = async (id) => {
    try {
        await deleteDoc(doc(database, 'productos', id));
        console.log('Se eliminó el documento con id: ', id);
    } catch (e) {
        console.error('Error removing document: ', e);
    }
};

// Función para actualizar el estado de 'vendido' de un documento en Firestore
const handleUpdate = async (id, vendido) => {
    try {
        await updateDoc(doc(database, 'productos', id), {
            vendido: !vendido
        });
        console.log('Se actualizó el documento con id: ', id);
    } catch (e) {
        console.error('Error updating document: ', e);
    }
};

// Componente funcional CardProductos
const CardProductos = ({ id, nombre, precio, vendido }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.nombre}>{nombre}</Text>
            <Text style={styles.precio}>${precio}</Text>
            <Text style={[styles.estado, vendido ? styles.vendido : styles.disponible]}>
                {vendido ? "Vendido" : "Disponible"}
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(id)}>
                    <Text style={styles.deleteButtonText}>Eliminar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.updateButton, vendido ? styles.regresarButton : styles.venderButton]}
                    onPress={() => handleUpdate(id, vendido)}>
                    <Text style={styles.updateButtonText}>
                        {vendido ? "Devolver" : "Vender"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Estilos del componente
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f9f9f9',
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    nombre: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    precio: {
        fontSize: 18,
        color: '#555',
        marginBottom: 10,
    },
    estado: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    vendido: {
        color: '#e74c3c',
    },
    disponible: {
        color: '#2ecc71',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginRight: 10,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    updateButton: {
        backgroundColor: '#3498db',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    updateButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    venderButton: {
        backgroundColor: '#2ecc71',
    },
    regresarButton: {
        backgroundColor: '#f39c12',
    },
});

export default CardProductos;
