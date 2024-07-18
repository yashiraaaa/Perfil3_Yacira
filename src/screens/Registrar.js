import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { auth, createUserWithEmailAndPassword } from '../config/Firebase';
import CustomTextInput from '../components/customTextInput';
import CustomButton from '../components/customButton';
import CustomFlecha from '../components/customFlecha';

const Registro = ({ navigation }) => {
    const [correo, setCorreo] = useState("");
    const [contra, setContra] = useState("");

    const handleRegistro = () => {
        if (correo.trim() === "" || contra.trim() === "") {
            alert("Asegúrese de ingresar todos los campos");
        } else {
            createUserWithEmailAndPassword(auth, correo, contra)
                .then((userCredential) => {
                    alert("Usuario registrado correctamente");
                })
                .catch((error) => {
                    console.log(error);
                    alert(`Error: ${error.message}`);
                });
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.innerContainer}>
                <CustomFlecha />
                <Text style={styles.title}>Registro</Text>
                <View style={styles.inputContainer}>
                    <CustomTextInput
                        placeholder="Correo"
                        keyboardType="email-address"
                        onChangeText={text => setCorreo(text)}
                        value={correo}
                    />
                    <CustomTextInput
                        placeholder="Contraseña"
                        secureTextEntry
                        value={contra}
                        onChangeText={text => setContra(text)}
                    />
                </View>
                <CustomButton text="Registrarse" onPress={handleRegistro} />
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.register}>¿Ya tienes una cuenta? <Text style={styles.registerLink}>Inicia sesión</Text></Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

export default Registro;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
        marginLeft: -10, // Mover ligeramente a la izquierda
    },
    register: {
        marginTop: 20,
        fontSize: 16,
        color: '#333',
    },
    registerLink: {
        color: '#0066cc',
        fontWeight: 'bold',
    },
});
