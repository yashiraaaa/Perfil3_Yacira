import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { auth, signInWithEmailAndPassword } from '../config/Firebase';
import CustomTextInput from '../components/customTextInput';
import CustomButton from '../components/customButton';

const Login = ({ navigation }) => {
    const [correo, setCorreo] = useState("");
    const [contra, setContra] = useState("");

    // Verificar si el usuario ya inició sesión
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("Home");
            }
        });
        return () => unsubscribe();
    }, [navigation]);

    // Función para iniciar sesión
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, correo, contra)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate("Home");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });
    }

    const goToRegistro = () => {
        navigation.navigate('Registrar');
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Login</Text>
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
                <CustomButton text="Iniciar sesión" onPress={handleLogin} />
                <TouchableOpacity onPress={goToRegistro}>
                    <Text style={styles.register}>No tienes una cuenta? <Text style={styles.registerLink}>Regístrate</Text></Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Login;

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
        marginLeft: -20,
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