import Theme from '../../styles/Theme';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import NavigatorConstants from '../../../navigation/NavigatorConstants';

export default PaymentScreenUI = () => {
    const navigation = useNavigation();

    const handlePay = () => {
        navigation.navigate(NavigatorConstants.USER_STACK.PAY_SUCCESS);
    };

    return (

        <View style={styles.container}>

            <View>
                <Text style={styles.title}>Agregue metodo de pago</Text>
            </View>

            <View style={{ width: '100%', height: '8%' }}>
            </View>
            <View style={{ height: '60%', width: '80%', alignContent: 'center' }}>
                <Text style={styles.inputText}>Numero de tarjeta</Text>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <TextInput style={styles.input} >
                    </TextInput>
                </View>
                <Text style={styles.inputText}>Nombre del titular</Text>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <TextInput style={styles.input} >
                    </TextInput>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.inputText}>Fecha de vencim.</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <TextInput style={styles.subinput} >
                            </TextInput>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputText}>CVV</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <TextInput style={styles.subinput} >
                            </TextInput>
                        </View>
                    </View>
                </View>

                <Text style={styles.inputText}>Documento</Text>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <TextInput style={styles.input} >
                    </TextInput>
                </View>
            </View>

            <View style={styles.buttons}>
                <TouchableOpacity style={[styles.blueButton]} onPress={() => navigation.goBack()}>
                    <Text style={[styles.realStateText]}>  Cancelar  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.blueButton]} onPress={handlePay} >
                    <Text style={[styles.realStateText]}>  Pagar  </Text>
                </TouchableOpacity>
            </View>


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
        //   fontSize: 30,
        fontSize: 40,
        color: Theme.colors.clear.PRIMARY,
        marginBottom: '',
        textAlign: 'center',
    },
    inputText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '400',
    },
    subText: {
        fontSize: 13,

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
    subinput: {
        width: '60%',
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


});

