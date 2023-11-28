import { ImageBackground, Text, View, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native';
import Login from '../../../../assets/images/login.png';
import Theme from '../../styles/Theme';
import Google from '../../../../assets/images/google.png';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import NavigatorConstants  from '../../../navigation/NavigatorConstants';
import React, { useEffect, useState } from 'react';
import loginWS from '../../../networking/api/endpoints/loginWS';

export default LoginScreenUI = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
          setEmail('');
          setPassword('');
          setShowError(false);
        }, [])
      );

    const handleLogin = async () => {
        console.log(email);
        console.log(password);
        try {
            const response = await loginWS.login(email, password, 'token');
            navigation.navigate(NavigatorConstants.NAVIGATOR.REALSTATE);
        } catch (error) {
            alert('Email o contraseña incorrectas. Inténtalo de nuevo.');
        }
      };

    return (
        <ImageBackground source={Login} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.graySquare}>
                    <View style={styles.google}> 
                        <Image source={Google} style={styles.googleImage} />
                        <Text style={styles.googleText} >Iniciar sesión con Google</Text>
                    </View>

                    <View style={styles.lineSeparator} /> 

                    <Text style={styles.title}>Iniciar sesion</Text>

                    <View style={styles.input_container}> 
                        <Text style={styles.inputText}>Email</Text>
                        <TextInput 
                            style={styles.input}
                            value={email}
                            onChangeText={(text) => setEmail(text)}>
                        </TextInput>
                        {showError && (<Text style={styles.redText}>Email o contraseña incorrecto</Text>)}
                    </View>

                    <View style={styles.input_container}> 
                        <Text style={styles.inputText}>Contraseña</Text>
                        <TextInput 
                            style={styles.input}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => setPassword(text)}>
                        </TextInput>
                        {showError && (<Text style={styles.redText}>Email o contraseña incorrecto</Text>)}
                    </View>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={[styles.blueButton]} onPress={() => navigation.goBack()}>
                            <Text style={[styles.realStateText]}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.blueButton]} onPress={() => {handleLogin}}>
                            <Text style={[styles.realStateText]}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    googleImage: {
        width: 16,
        height: 16,
        marginRight: 20,
    },
    graySquare: {
        backgroundColor: '#D9D9D9F2',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.95,
        width: '85%',
    },
    title: {
        fontWeight: '400',
        fontSize: 30,
        color: '#47A7FF',
        marginBottom: 20,
    },
    google: {
        padding: 10,
        width: '75%',
        flexDirection: 'row',
    },
    inputText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '400',
    },
    googleText: {
        color: '#5F6368',
        fontSize: 16,
        fontWeight: '600',
    },
    blueButton: {
        backgroundColor: '#F6F6F6',
        padding: 10,
        paddingHorizontal: 30,
        marginHorizontal: 20,
        backgroundColor: Theme.colors.clear.PRIMARY,
        borderRadius: 40,
    },
    realStateText: {
        color: 'white',
        fontSize: 14,
    },
    input: {
        backgroundColor: '#F6F6F6',
        padding: 6,
        borderRadius: 5,
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 0.5,

    },
    input_container: {
        marginBottom: 5,
        width: '80%',
    },
    buttons: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    lineSeparator: {
        borderBottomColor: '##A1A1A1E5',
        borderBottomWidth: 1,
        marginBottom: 10,
        width: '100%',
        opacity: 0.3,
    },
    redText: {
        color: Theme.colors.clear.ALERT,
        fontWeight: 'bold',
        fontSize: 12,
    },
  });
