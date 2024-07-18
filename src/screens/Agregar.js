import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { database } from '../config/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import CustomTextInput from '../components/customTextInput';
import CustomButton from '../components/customButton';
import CustomFlecha from '../components/customFlecha';

const Add = ({ navigation }) => {
    // Estado para guardar los datos del producto
    const [producto, setProducto] = useState({
        nombre: '',
        precio: '',
        vendido: false,
        creado: new Date()
    });
    // Función para navegar a la pantalla de Home
    const goToHome = () => {
        navigation.navigate('Home');
    };
    // Función para agregar un producto a Firestore
    const agregarProducto = async () => {
        if (producto.nombre.trim() === '' || producto.precio === '') {
            Alert.alert('Error', 'Por favor, complete todos los campos.');
            return;
        }

        try {
            // Agregar un documento a la colección 'productos'
            await addDoc(collection(database, 'productos'), {
                ...producto,
                precio: parseFloat(producto.precio)
            });
            console.log('Se guardó la colección');
            goToHome();
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    return (
        <View style={styles.container}>
            <CustomFlecha />
            <Text style={styles.title}>Agregar producto</Text>
            <CustomTextInput
                placeholder="Nombre del producto"
                keyboardType="default"
                onChangeText={text => setProducto({ ...producto, nombre: text })}
                value={producto.nombre}
            />
            <CustomTextInput
                placeholder="Precio"
                keyboardType="numeric"
                onChangeText={text => setProducto({ ...producto, precio: text })}
                value={producto.precio}
            />
            <CustomButton text="Agregar producto" onPress={agregarProducto} />
        </View>
    );
};

export default Add;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        marginTop: 95,
        alignSelf: 'flex-start',
        marginLeft: 10,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
});
