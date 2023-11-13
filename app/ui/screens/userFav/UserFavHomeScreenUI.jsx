import Theme from '../../styles/Theme';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Text, View, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NavigatorConstants from '../../../navigation/NavigatorConstants';
import React, { useState, useEffect } from 'react';
import userWS from '../../../networking/api/endpoints/userWS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from "react-native-stock-star-rating";

export default UserFavHomeScreenUI = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    //const [favProperties, setFavProperties] = useState(null);

    const fetchProperties = async () => {
        setLoading(true);
        try {
            {/*
            const id = await AsyncStorage.getItem('realstateId');
            const response = await userWS.getProperties(id);
            setFavProperties(response.data);
            */}
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchProperties();
        }, [])
    );

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleViewProperty = async ({ property }) => {
        //await AsyncStorage.setItem('propertyId', `${property.id}`);
        navigation.navigate(NavigatorConstants.USER_STACK.VIEW);
    };

    const favProperties = [
        {
            id: 4,
            address: {
                street: 'Avenida Favorita',
                streetNumber: '101',
                floor: null,
                department: null,
                locality: 'Ciudad de Ensueño',
            },
            additionaldetails: {
                urlPhoto1: 'https://example.com/photo4.jpg',
                state: 'Excelente',
                price: 400000,
            },
            details: {
                rooms: 5,
            },
        },
        {
            id: 5,
            address: {
                street: 'Calle de Sueños',
                streetNumber: '202',
                floor: '3',
                department: 'C',
                locality: 'Ciudad de Ensueño',
            },
            additionaldetails: {
                urlPhoto1: 'https://example.com/photo5.jpg',
                state: 'Impecable',
                price: 250000,
            },
            details: {
                rooms: 3,
            },
        },
    ];


    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={Theme.colors.clear.PRIMARY} />
                </View>
            ) : favProperties ? (
                favProperties.length > 0 ? (
                    favProperties.map((property, index) => (
                        <View key={index} style={styles.box} onPress={() => handleViewProperty({ property })}>
                            <Image source={{ uri: property?.additionaldetails?.urlPhoto1 }} style={styles.imageContainer} />
                            <View style={styles.textContainer}>
                                {
                                    <Text style={styles.text}>
                                        {property.address.floor === null && property.address.department === null
                                            ? `${property.address.street} ${property.address.streetNumber}`
                                            : `${property.address.street} ${property.address.streetNumber}, ${property.address.floor} ${property.address.department}`}
                                    </Text>
                                }

                                <Text style={styles.subtext}>{`${property.additionaldetails.state} - ${property.address.locality}`}</Text>
                                <Text style={styles.subtext}>{`${property.details.rooms} Amb`}</Text>
                                <Text style={styles.subtext}>{`$ ${property.additionaldetails.price}`}</Text>
                            </View>
                            <View style={styles.wrenchbox}>
                                <TouchableOpacity>
                                    <MaterialCommunityIcons name="star" size={15} color="yellow" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : (
                    <View style={styles.loadingContainer}>
                        <View style={styles.noPropertiesBox}>
                            <View style={styles.noProperties}>
                                <Text style={styles.title}>Actualmente no tienes propiedades asociadas ¡Comienza creando una!</Text>
                            </View>
                        </View>
                    </View>
                )
            ) : null}
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    scrollView: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: '88%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c2c2c2',
        borderRadius: 8,
        flexDirection: 'row',
        marginTop: '5%',
        height: '20%',
    },
    wrenchbox: {
        display: 'flex',
        width: '8%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.colors.clear.SECONDARY,
        borderRadius: 16,
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
    image: {
        flex: 1,
        width: '100%',
        backgroundColor: '#0553',
    },
    inmobTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 15,
    },
    imageContainer: {
        backgroundColor: 'white',
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
    noPropertiesBox: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c2c2c2',
        borderRadius: 8,
        flexDirection: 'row',
        marginTop: '5%',
    },
    noProperties: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});