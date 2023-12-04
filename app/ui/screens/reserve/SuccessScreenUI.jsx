import Theme from '../../styles/Theme';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NavigatorConstants from '../../../navigation/NavigatorConstants';
import realstateWS from '../../../networking/api/endpoints/realstateWS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Rating from 'react-native-ratings';

export default EditProfileRealstateScreenUI = () => {
    const navigation = useNavigation();
    const [realEstateData, setRealEstateData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchRealEstateData = async () => {
            try {
                const id = await AsyncStorage.getItem('realstateId');
                const response = await realstateWS.get(id);
                setRealEstateData(response.data[0]);
            } catch (error) {
                console.log(error);
            }
        };

        fetchRealEstateData();
    }, []);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const sendRatingToBackend = async () => {
        try {
            const id = await AsyncStorage.getItem('realstateId');
            const requestBody = {
                rating,
                comment,
            };
            await realstateWS.rate(id, requestBody);
            console.log('Calificación y comentario enviados exitosamente al backend.');
            toggleModal();
        } catch (error) {
            console.log('Error al enviar la calificación y comentario al backend:', error);
        }
    };

    const handleStarPress = (selectedRating) => {
        setRating(selectedRating);
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>¡Felicitaciones!</Text>
                <Text style={styles.title}>La propiedad fue reservada exitosamente</Text>
            </View>
            <Text style={styles.subtitle}> Clasifica la inmobiliaria</Text>
            <View style={styles.stars}>
                <Rating
                    maxStars={5}
                    rating={rating}
                    selectedStar={(rating) => handleStarPress(rating)}
                    fullStarColor="gold"
                />
            </View>
            <Text style={styles.subText}> Dejar comentario</Text>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setComment(text)}
                    value={comment}
                />
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={[styles.blueButton]}onPress={() => navigation.push(NavigatorConstants.LOGIN_STACK.REALSTATE_LOGIN)} >
                    <Text style={[styles.realStateText]}>  Inicio  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.blueButton]} onPress={sendRatingToBackend}>
                    <Text style={[styles.realStateText]}>  Enviar  </Text>
                </TouchableOpacity>
            </View>
            <Modal visible={isModalVisible} transparent={true} onRequestClose={toggleModal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.reserva}>Su reserva se realizó con éxito</Text>
                        <View style={styles.checkBox}>
                            <MaterialCommunityIcons name="check-decagram" size={110} style={styles.check} />
                        </View>
                        <TouchableOpacity style={[styles.blueButton2]} onPress={() => navigation.push(NavigatorConstants.LOGIN_STACK.REALSTATE_LOGIN)} >
                            <Text style={[styles.realStateText]}>  Inicio  </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    checkBox: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    check: {
        marginTop: 30,
        color: Theme.colors.clear.PRIMARY,
        marginBottom:20,

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalContent: {
        width: 328,
        height: 407,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    container: {
        flex: 1,
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontWeight: '400',
        fontSize: 30,
        color: Theme.colors.clear.PRIMARY,
        marginBottom: '',
        textAlign: 'center',
    },
    reserva: {
        fontSize: 30,
        color: Theme.colors.clear.PRIMARY,
        marginBottom: '',
        textAlign: 'center',
        marginTop: 30,
    },
    inputText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '400',
    },
    subText: {
        color: '#000',
        fontSize: 20,
        justifyContent: 'center',
        marginTop: 30,



    },

    blueButton: {
        marginTop: 40,
        padding: 5,
        paddingHorizontal: 45,
        marginHorizontal: 20,
        backgroundColor: Theme.colors.clear.PRIMARY,
        borderRadius: 30,
    },
    blueButton2: {
        marginTop: 40,
        padding: 5,
        paddingHorizontal: 45,
        marginHorizontal: 45,
        backgroundColor: Theme.colors.clear.PRIMARY,
        borderRadius: 30,
    },
    stars: {
        marginLeft: 15,
        marginTop: 10,
    },
    realStateText: {
        color: 'white',
        fontSize: 14,
        justifyContent: 'center',
        textAlign: 'center',
    },

    buttons: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',


    },
    subtitleContainer: {
        margin: 30,
    },
    subtitle: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        marginTop: 30,

    },
    inputText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '400',
    },

    input: {
        width: '80%',
        height: 150,
        backgroundColor: '#F6F6F6',
        padding: 3,
        borderColor: Theme.colors.clear.PRIMARY,

        borderWidth: 3,
        marginTop: 20,
    },


});




