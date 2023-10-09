import { ImageBackground, Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Image, TextInput } from 'react-native';
import Theme from '../../styles/Theme';

export default ForgotPasswordScreenUI = () => {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>¿Olvido Contraseña?</Text>

            <View style={styles.subtitleContainer}>
                <Text style={styles.subtitle}>Te enviaremos un mail para restableceer la contraseña</Text>
            </View>

            <View style={styles.input_container}>
                <Text style={styles.inputText}>Email</Text>
                <TextInput style={styles.input}></TextInput>
            </View>

            <View style={styles.buttons}>
                <TouchableOpacity style={[styles.blueButton]}>
                    <Text style={[styles.realStateText]}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const handleLogin = () => {
    
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: '400',
        fontSize: 30,
        color: Theme.colors.clear.PRIMARY,
        marginBottom: 20,
    },
    inputText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '400',
    },
    blueButton: {
        backgroundColor: '#F6F6F6',
        padding: 10,
        paddingHorizontal: 60,
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
        borderRadius: 5,
        marginBottom: 100,
        borderRadius: 10,
        borderWidth: 0.5,

    },
    input_container: {
        marginBottom: 5,
        width: '80%',
        marginTop: 20,
    },
    buttons: {
        marginBottom: 20,
    },
    subtitleContainer: {
        margin: 30,
    },
    subtitle: {
        color: '#000',
        fontSize: 20,
        fontWeight: '400',
        justifyContent: 'center',
    },
});
