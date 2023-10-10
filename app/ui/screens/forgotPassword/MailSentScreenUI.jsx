import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Theme from '../../styles/Theme';
import Mail from '../../../../assets/images/mail.png';
import {useNavigation} from '@react-navigation/native';
import NavigatorConstants from '../../../navigation/NavigatorConstants';

export default MailSentScreenUI = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Se envio el mail correctamente</Text>

            <View style={styles.imageContainer}>
                <Image source={Mail}  style={styles.imageMail}></Image>
            </View>

            <View style={styles.buttons}>
                <TouchableOpacity style={[styles.blueButton]} onPress={() => navigation.push(NavigatorConstants.LOGIN_STACK.REALSTATE_LOGIN)}>
                    <Text style={[styles.realStateText]}>Inicio</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
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
    buttons: {
        marginBottom: 20,
    },
    imageContainer: {
        margin: 40,
    },
    subtitle: {
        color: '#000',
        fontSize: 20,
        fontWeight: '400',
        justifyContent: 'center',
    },
    imageMail: {
    }
});
