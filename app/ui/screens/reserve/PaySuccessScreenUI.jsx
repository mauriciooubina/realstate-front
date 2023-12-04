import Theme from '../../styles/Theme';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Image } from 'react-native';
import NavigatorConstants from '../../../navigation/NavigatorConstants';
import realstateWS from '../../../networking/api/endpoints/realstateWS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from 'react-native-ratings';
import CustomTextInput from "../../../components/TextInputComponent";
import ReserveModal from '../../../components/ReserveModal';

export default PaySuccessScreenUI = () => {
    const navigation = useNavigation();
    const [showSend, setShowSend] = useState(false);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const handleOpenModal = async () => {
        try {
            const userId = parseInt(await AsyncStorage.getItem('userId'));
            const realStateId = await AsyncStorage.getItem("contactId");
            console.log(realStateId);
            const response = await realstateWS.postComment(realStateId, comment, userId, rating);
        } catch (error) {
            console.log(error);
        } finally {
            setShowSend(true);
        }
    };

    const handleCloseModal = () => {
        setShowSend(false);
    };

    const handleHome = () => {
        navigation.navigate(NavigatorConstants.USER_STACK.HOME);
    };

    const ratingCompleted = (ratingValue) => {
        setRating(ratingValue);
    };

    return (
        <View style={styles.container}>
            <View style={{ width: '90%', height: '90%' }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.title}>Felicitaciones!</Text>
                    <Text style={styles.title}>La propiedad fue     reservada exitosamente</Text>
                </View>
                <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 50 }}>
                    <Text style={{ alignItems: 'center', fontSize: 15 }}>Clasifica la inmobiliaria</Text>
                </View>
                <View style={styles.stars}>
                    <Rating
                        showRating
                        onFinishRating={ratingCompleted}
                        ratingBackgroundColor='#c8c7c8'
                    />
                </View>

                <View style={styles.contentContainer}>
                    <View style={{ alignItems: 'center', marginBottom: 10 }}>
                        <Text style={{ alignItems: 'center', fontSize: 15 }}>Dejar comentario</Text>
                    </View>
                    <View>
                        <CustomTextInput
                            customHeight={125}
                            title=""
                            isDescription={true}
                            onChange={(text) => {
                                setComment(text);
                            }}
                        />
                    </View>
                </View>

                <View style={styles.buttons}>
                    <TouchableOpacity style={[styles.blueButton]} onPress={handleHome}>
                        <Text style={[styles.realStateText]}>Inicio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.blueButton]} onPress={handleOpenModal}>
                        <Text style={[styles.realStateText]}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {showSend && (
                <ReserveModal closeSend={handleCloseModal} />
            )}
        </View>

    );
};


const styles = StyleSheet.create({
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
    },
    inputText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '400',
    },
    input: {
        width: '95%',
        backgroundColor: '#F6F6F6',
        padding: 3,
        borderRadius: 5,
        marginBottom: 30,
        borderRadius: 10,
        borderWidth: 0.5,
    },
    blueButton: {
        display: 'flex',
        padding: 5,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        backgroundColor: Theme.colors.clear.PRIMARY,
        borderRadius: 30,
    },
    realStateText: {
        color: 'white',
        fontSize: 14,
    },

    buttons: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
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
    header: {
        backgroundColor: 'red',
        width: '100%',
        height: '13%'
    },
    stars: {
        marginBottom: 20,
        alignItems: 'center'
    },
    whiteButton: {
        display: 'flex',
        padding: 5,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        borderRadius: 30,
        borderColor: Theme.colors.clear.PRIMARY,
        borderWidth: 2,

    },
    whiteText: {
        color: Theme.colors.clear.PRIMARY,
        fontSize: 14,
    },
});