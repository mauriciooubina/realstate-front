import Theme from '../../styles/Theme';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NavigatorConstants from '../../../navigation/NavigatorConstants';
import realstateWS from '../../../networking/api/endpoints/realstateWS';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ReserveScreenUI = () => {
    const navigation = useNavigation();
    const [propertyData, setPropertyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saveEdit, setSaveEdit] = useState(false);

    useEffect(() => {
        const fetchRealEstateData = async () => {
            try {
                const id = await AsyncStorage.getItem("propertyId");
                const response = await propertiesWS.get(id);
                setPropertyData(response.data[0]);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchRealEstateData();
    }, []);

    const handlePay = () => {
        navigation.navigate(NavigatorConstants.USER_STACK.PAY);
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color={Theme.colors.clear.PRIMARY} />
            ) : (
                <View style={{ width: '90%', height: '90%' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.title}>Realizar reserva</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Image source={{ uri: propertyData.additionaldetails.urlPhoto1 }} style={{ marginVertical: 15, width: '80%', aspectRatio:1 }} />
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.itemTitleView}>
                            <Text style={styles.titleText}>Recuerda que para realizar una reserva deber depositar el 50% del total</Text>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.title}>Monto a depostiar</Text>
                        <Text style={styles.subtitle}>{` $${parseInt(propertyData.additionaldetails.price)/2}`}</Text>
                    </View>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={[styles.blueButton]} onPress={() => navigation.goBack()} >
                            <Text style={[styles.realStateText]}>  Cancelar  </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.blueButton]} onPress={handlePay} >
                            {saveEdit ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={[styles.realStateText]}>  Pagar  </Text>
                            )}
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
});