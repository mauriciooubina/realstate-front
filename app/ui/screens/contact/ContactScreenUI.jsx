import Theme from '../../styles/Theme';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NavigatorConstants from '../../../navigation/NavigatorConstants';
import realstateWS from '../../../networking/api/endpoints/realstateWS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from '../../../../assets/images/photo.png';
import { Rating } from "react-native-stock-star-rating";
import CustomTextInput from "../../../components/TextInputComponent";
import { FontAwesome } from '@expo/vector-icons';

export default ContactScreenUI = () => {
    const navigation = useNavigation();
    //const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saveEdit, setSaveEdit] = useState(false);

    useEffect(() => {
        const fetchRealEstateData = async () => {
            try {
                {/*
                const id = await AsyncStorage.getItem('realstateId');
                const response = await realstateWS.get(id);
                setRealEstateData(response.data[0]);
                */}
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRealEstateData();
    }, []);

    const handleSaveProfile = async () => {
        setSaveEdit(true);
        try {
            {/*}
            await realstateWS.put(realEstateData);
            const id = await AsyncStorage.getItem('realstateId');
            navigation.navigate(NavigatorConstants.USER_STACK.HOME);
            */}
        } catch (error) {
            console.log(error);
        } finally {
            setSaveEdit(false);
        }
    }
    const realstateData = {
        fantasyName: 'Inmobiliaria Prueba',
        qualification: 4,
    };

    const handleSendQuestion = () => {

    };

    const handleVisit = () => {

    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color={Theme.colors.clear.PRIMARY} />
            ) : (
                <View style={{ width: '90%', height: '90%' }}>
                    <View style={{ alignItems: 'left' }}>
                        <Text style={styles.title}>{realstateData.fantasyName}</Text>
                    </View>
                    <View style={styles.stars}>
                        <Rating maxStars={5} size={35} stars={realstateData.qualification} />
                    </View>

                    <View style={styles.contentContainer}>
                        <View style={styles.itemTitleView}>
                            <Text style={styles.titleText}>Dejanos tu consulta</Text>
                        </View>
                        <View >
                            <CustomTextInput
                                customHeight={125}
                                title=""
                                isDescription={true}
                            />
                        </View>
                    </View>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={[styles.blueButton]} onPress={handleSendQuestion} >
                            {saveEdit ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={[styles.realStateText]}>  Enviar  </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={[styles.whiteButton]} onPress={handleVisit} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome name="home" size={20} color={Theme.colors.clear.PRIMARY} />
                            <Text style={[styles.whiteText]}>  Visitar Propiedad  </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            }
        </View >
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