import { Image, Text, View, StyleSheet } from 'react-native';
import MyHome from '../../../../assets/images/myhome.jpeg'
import Theme from '../../styles/Theme';
import { LinearGradient } from 'expo-linear-gradient';

export default SplashScreenUI = () => {
    return (

        <LinearGradient
            colors={['#365EEB', '#47A7FF']} // Colores de degradado
            style={styles.container}
        >
            <Image source={MyHome} style={styles.image}/>
            <Text style={styles.title}>My Home</Text>
        </LinearGradient>

    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#365EEB',
        justifyContent: 'center',
        alignItems: 'center', 
    },
    title: {
        color: '#FFF',
        fontFamily: 'Roboto',
        fontSize: 50,
        fontWeight: '500',
        marginTop: 30,
    },
    image: {
        display: 'flex',
        width: 230,
        height: 221,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 120,
    },

  });
