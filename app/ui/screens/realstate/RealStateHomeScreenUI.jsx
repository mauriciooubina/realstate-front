import Theme from '../../styles/Theme';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native'
import casa2 from '../../../../assets/images/casa2.webp';
import casa3 from '../../../../assets/images/casa3.png';
import edificio1 from '../../../../assets/images/edificio1.jpeg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NavigatorConstants from '../../../navigation/NavigatorConstants';

const propertyData = [
    {
        image: edificio1,
        address: 'Av. Cramer 2589, 12C',
        saleType: 'Venta - Belgrano',
        rooms: '4 Amb',
        price: 'u$d 385.000',
    },
    {
        image: casa3,
        address: 'Av. Cramer 2589, 12C',
        saleType: 'Venta - Belgrano',
        rooms: '4 Amb',
        price: 'u$d 385.000',
    },
    {
        image: casa2,
        address: 'Av. Cabildo 1789, 3A',
        saleType: 'Venta - Belgrano',
        rooms: '3 Amb',
        price: 'u$d 476.000',
    },
];

export default RealStateHomeScreenUI = () => {
    const navigation = useNavigation();
    const handleEditProperty = () => {
        navigation.navigate(NavigatorConstants.REALSTATE_STACK.EDIT);
    };

    return (
        <View style={styles.container}>
            {propertyData.map((property, index) => (
                <View key={index} style={styles.box}>
                    <Image source={property.image} style={styles.imageContainer} />
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{property.address}</Text>
                        <Text style={styles.subtext}>{property.saleType}</Text>
                        <Text style={styles.subtext}>{property.rooms}</Text>
                        <Text style={styles.subtext}>{property.price}</Text>
                    </View>
                    <View style={styles.wrenchbox}>
                        <TouchableOpacity onPress={handleEditProperty}>
                            <MaterialCommunityIcons name="wrench" size={15} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    },
    box: {
        width: '88%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c2c2c2',
        borderRadius: 8,
        flexDirection: 'row',
        marginTop: '5%',
        height: '15%',

    },
    wrenchbox: {
        display: 'flex',
        width: '7%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.colors.clear.PRIMARY,
        borderRadius: 13,
        flexDirection: 'row',
        marginRight: '3%',

    },
    text: {
        color: Theme.colors.clear.PRIMARY,
        fontSize: 16,
        fontWeight: '400',
    },
    subtext: {
        color: 'black',
        fontSize: 15,
        fontWeight: '400',
    },
    textContainer: {
        flex: 1,
        display: 'flex',
    },
    prueba: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        backgroundColor: '#0553',
    },
    modal: {
        backfaceVisibility: '5%',
    },
    blueButton: {
        flex: 1,
        backgroundColor: '#F6FF6',
        padding: 5,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        backgroundColor: Theme.colors.clear.PRIMARY,
        borderRadius: 30,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    whiteButton: {
        flex: 1,
        padding: 5,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 30,
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: Theme.colors.clear.PRIMARY,
        borderWidth: 2.5,
    },
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',

    },
    modalContainer: {
        width: '90%',
        height: '60%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 10,
        eleation: 20,
    },
    modal2Container: {
        width: '60%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        eleation: 20,
    },
    modal2BackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'left',

    },
    inmobTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 15,
    },
    inmobTitleBox: {
        borderColor: 'grey',
        borderWidth: 0.5,
        width: '100%',
        marginLeft: 0,
        marginTop: 40,

    },
    editTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 15,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        color: Theme.colors.clear.PRIMARY,

    },
    editCerrarSesion: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 15,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        color: Theme.colors.clear.PRIMARY,

    },
    editBorrarCuenta: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 15,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red',

    },
    editBox: {
        borderColor: 'grey',
        borderWidth: 0.5,
        width: '100%',
        marginLeft: 0,
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
    },
    editBox2: {
        borderColor: 'grey',
        borderWidth: 0.5,
        width: '100%',
        marginLeft: 0,
        marginTop: 355,
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
    },
    imageContainer: {
        backgroundColor: 'red',
        width: '30%',
        height: '80%',
        marginLeft: '3%',
        marginRight: '3%',
    },
    title: {
        fontWeight: '400',
        fontSize: 35,
        color: Theme.colors.clear.PRIMARY,
        textAlign: 'center',
        lineHeight: 50,
    },
    subtitle: {
        fontWeight: '400',
        fontSize: 15,
        marginTop: '10%',
        textAlign: 'center',
        lineHeight: 25,
    },
    buttons: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 60,
    },
    noText: {
        color: 'white',
        fontSize: 14,
    },
    siText: {
        color: Theme.colors.clear.PRIMARY,
        fontSize: 14,
    },
});