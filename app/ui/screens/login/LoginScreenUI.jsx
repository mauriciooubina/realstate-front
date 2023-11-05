import { ImageBackground, Text, View, StyleSheet, TouchableOpacity, Image, Modal, ActivityIndicator} from 'react-native';
import Login from '../../../../assets/images/login.png';
import Theme from '../../styles/Theme';
import Google from '../../../../assets/images/google.png';
import NavigatorConstants from '../../../navigation/NavigatorConstants';
import {useNavigation} from '@react-navigation/native';
import aliveWS from '../../../networking/api/endpoints/aliveWS';
import React, {useEffect, useState} from 'react';

export default LoginScreenUI = () => {
    const navigation = useNavigation();
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        const getBackendUp = async () => {
            try {
                const response = await aliveWS.alive();
            } catch (error) {
                console.log(error);
            } finally {
                setShowLoading(false);
            }
        };

        getBackendUp();
    }, []);
    
    return (
        <ImageBackground source={Login} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.graySquare}>
                    <Text style={styles.title}>Bienvenido</Text>
                    <TouchableOpacity style={styles.googleButton} onPress={() => navigation.push(NavigatorConstants.LOGIN_STACK.GOOGLE_LOGIN)}>
                        <Image source={Google} style={styles.googleImage} />
                        <Text style={styles.googleText}>Iniciar sesión con Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.realStateButton, styles.blueButton]} onPress={() => navigation.push(NavigatorConstants.LOGIN_STACK.REALSTATE_LOGIN)}>
                        <Text style={[styles.realStateText]}>Soy Inmobiliario</Text>
                    </TouchableOpacity>
                </View>
                <Modal transparent={true} animationType="slide" visible={showLoading}>
                    <View style={styles.modalBackGround}>
                        <View style={[styles.modalContainer]}>
                            <Text style={styles.titleModal}>En busca de tu propiedad ideal... aguarda un momento por favor!</Text>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    </View>
                </Modal>
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
        width: 23,
        height: 20,
        marginRight: 20,
    },
    graySquare: {
        backgroundColor: '#D9D9D9F2',
        width: '85%',
        height: '37%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.95
    },
    title: {
        fontWeight: '400',
        fontSize: 40,
        marginTop: 20,
        color: '#47A7FF',
        marginBottom: 20,
    },
    googleButton: {
        backgroundColor: '#F6F6F6',
        padding: 10,
        borderRadius: 5,
        margin: 20,
        width: '75%',
        borderRadius: 10,
        flexDirection: 'row',
    },
    googleText: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 15
    },
    realStateButton: {
        backgroundColor: '#F6F6F6',
        padding: 10,
        margin: 20,
        backgroundColor: Theme.colors.clear.PRIMARY,
        borderRadius: 40,
    },
    realStateText: {
        color: 'white',
        fontSize: 14,
    },
    modalBackGround: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
      },
    
      modalContainer: {
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 10,
        eleation: 20,
      },
      titleModal: {
        fontWeight: '300',
        fontSize: 24,
        marginVertical: 17,
        color: '#47A7FF',
    },
  });
