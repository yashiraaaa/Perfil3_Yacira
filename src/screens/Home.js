import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { database } from '../config/Firebase'; 
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'; 
import CardProductos from '../components/cardProductos'; 
import CustomButton from '../components/customButton';
import CustomFlecha from '../components/customFlecha';

const Home = ({ navigation }) => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const q = query(collection(database, 'productos'), orderBy('creado', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ id: doc.id, ...doc.data() });
            });
            setProductos(docs);
        });
        return () => unsubscribe();
    }, []);

    const goToAdd = () => { 
        navigation.navigate('Agregar');
    }

    const renderItem = ({ item }) => (
        <CardProductos
            id={item.id}
            nombre={item.nombre}
            precio={item.precio}
            vendido={item.vendido}
            imagen={item.imagen}
        />
    );

    return (
        <View style={styles.container}>
            <CustomFlecha />
            <Text style={styles.title}>Productos</Text>
            
            {productos.length !== 0 ? (
                <FlatList
                    data={productos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <Text style={styles.subtitle}>No hay productos disponibles </Text>
            )}

            <CustomButton text="Agregar productos" onPress={goToAdd} />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    subtitle: {
        alignSelf: 'center',
        fontSize: 18,
        marginTop: 20,
    },
    list: {
        flexGrow: 1,
    },
});
