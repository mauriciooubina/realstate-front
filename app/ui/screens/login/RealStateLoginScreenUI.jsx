import { ImageBackground, Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import Login from '../../../../assets/images/login.png';
import Theme from '../../styles/Theme';
import {useNavigation} from '@react-navigation/native';
import NavigatorConstants from '../../../navigation/NavigatorConstants';

export default RealStateLoginScreenUI = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={Login} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.graySquare}>

                    <Text style={styles.title}>Iniciar sesion</Text>

                    <View style={styles.input_container}> 
                        <Text style={styles.inputText}>Email</Text>
                        <TextInput style={styles.input}></TextInput>
                    </View>

                    <View style={styles.input_container}> 
                        <Text style={styles.inputText}>Contraseña</Text>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                    <View style={styles.forgotPasswordContainer}>
                        <TouchableOpacity onPress={() => navigation.push(NavigatorConstants.LOGIN_STACK.PASSWORD_RECOVERY)}>
                            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={[styles.blueButton]} onPress={() => navigation.goBack()}>
                            <Text style={[styles.realStateText]}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.blueButton]} onPress={() => navigation.push(NavigatorConstants.NAVIGATOR.USER)}>
                            <Text style={[styles.realStateText]}>Iniciar Sesion</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.accountContainer}>
                        <Text style={styles.accountText}>¿No tienes una cuenta?</Text>
                        <TouchableOpacity onPress={() => navigation.push(NavigatorConstants.LOGIN_STACK.REGISTER)}>
                            <Text style={styles.registerButton}>REGISTRATE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
};

const handleLogin = () => {
    // Implementa la lógica para iniciar sesión con Google aquí
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
        marginBottom: 20,
        marginTop: 50,
    },
    inputText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '400',
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
        padding: 3,
        borderRadius: 10,
        borderWidth: 0.5,
    },
    input_container: {
        marginBottom: 5,
        width: '80%',
        marginTop: 20,
    },
    buttons: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 20,
    },
    forgotPasswordText: {
        color: '#6D6D6D',
        fontSize: 10,
        fontWeight: '400',
    },
    accountContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    accountText: {
        color: '#5C5C5C',
        fontSize: 14,
        fontWeight: '400',
        marginRight: 30,
    },
    registerButton: {
        color: '#47A7FF',
        fontSize: 16,
        fontWeight: '400',
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginRight: 35,
    },
  });
