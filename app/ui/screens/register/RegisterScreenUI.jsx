import { ImageBackground, Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import Login from '../../../../assets/images/login.png';
import Theme from '../../styles/Theme';
import NavigatorConstants from '../../../navigation/NavigatorConstants';
import {useNavigation} from '@react-navigation/native';
import React, { useState } from 'react';

export default RegisterScreenUI = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPass, setRepeatPass] = useState('');
    const [realstateName, setRealstateName] = useState('');

    const handleRegister = () => {
        console.log(email);
        console.log(password);
        console.log(repeatPass);
        console.log(realstateName);
        if(password === repeatPass){
            if (true){
                navigation.push(NavigatorConstants.LOGIN_STACK.REALSTATE_LOGIN);
            }else{
                alert('Hubo un error. Intente nuevamente mas tarde.');
            }
        } else{
            alert('Las contraseñas no coinciden.');
        }
    };
    

    return (
        <ImageBackground source={Login} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.graySquare}>

                    <Text style={styles.title}>Crear cuenta</Text>

                    <View style={styles.input_container}> 
                        <Text style={styles.inputText}>Email</Text>
                        <TextInput 
                            style={styles.input}
                            value={email}
                            onChangeText={(text) => setEmail(text)}>
                        </TextInput>
                    </View>

                    <View style={styles.input_container}> 
                        <Text style={styles.inputText}>Contraseña</Text>
                        <TextInput 
                            style={styles.input}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => setPassword(text)}>
                        </TextInput>
                    </View>

                    <View style={styles.input_container}> 
                        <Text style={styles.inputText}>Repetir Contraseña</Text>
                        <TextInput 
                            style={styles.input}
                            secureTextEntry={true}
                            value={repeatPass}
                            onChangeText={(text) => setRepeatPass(text)}>
                        </TextInput>
                    </View>

                    <View style={styles.input_container}> 
                        <Text style={styles.inputText}>Nombre de la Inmobiliaria</Text>
                        <TextInput 
                            style={styles.input}
                            value={realstateName}
                            onChangeText={(text) => setRealstateName(text)}>
                        </TextInput>
                    </View>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={[styles.blueButton]} onPress={() => navigation.goBack()}>
                            <Text style={[styles.realStateText]}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.blueButton]} onPress={handleRegister}>
                            <Text style={[styles.realStateText]}>Registrarse</Text>
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
        marginTop: 30,
    },
    inputText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 3,
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
        padding: 2,
        borderRadius: 10,
        borderWidth: 0.5,
    },
    input_container: {
        marginBottom: 5,
        width: '80%',
        marginTop: 10,
    },
    buttons: {
        flexDirection: 'row',
        marginBottom: 30,
        marginTop: 20,
    },
  });
