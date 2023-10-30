// falta:
//      barra del costado ?
//      Agregar estrellas
//      hacer funcional los botones
//      coso azul de arriba



import React, { useState } from 'react';
import Theme from '../../styles/Theme';
import NavigatorConstants from '../../../navigation/NavigatorConstants';
import { useNavigation } from '@react-navigation/native';
import { Button, Modal, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { IconButton, Box } from '@mui/material';
// import {Image} from 'expo-image';
import { Image } from 'react-native'
import casa2 from '../../../../assets/images/casa2.webp';
import casa3 from '../../../../assets/images/casa3.png';
import edificio4 from '../../../../assets/images/edificio4.jpeg';
import edificio5 from '../../../../assets/images/edificio5.jpeg';
import edificio1 from '../../../../assets/images/edificio1.jpeg';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import InmobEditProfileScreen from '../profile/InmobEditProfileScreen';
import Component from '../component/Component';
import ComponentUI from '../component/ComponentUI';
import { MaterialCommunityIcons } from '@expo/vector-icons';







export default InmobHomeScreenUI = () => {

    const navigation = useNavigation();




    return (

        <View style={styles.container}>

            <View style={styles.box}>  
                <Image source={edificio1} style={styles.imageContainer}/>
           
                <View style={styles.textContainer}>  
                    <Text style={styles.text}>Av. Cramer 2589, 12C</Text>
                    <Text style={styles.subtext}>Venta - Belgrano</Text>
                    <Text style={styles.subtext}>4 Amb</Text>
                    <Text style={styles.subtext}>u$d 385.000</Text>
                </View>   
                <View style={styles.wrenchbox}>
                    <MaterialCommunityIcons name="wrench" size={15} color='white' />          
                </View>       
            </View>

            <View style={styles.box}>  
                <Image source={casa2} style={styles.imageContainer}/>
           
                <View style={styles.textContainer}>  
                    <Text style={styles.text}>Av. Cabildo 1789, 3A</Text>
                    <Text style={styles.subtext}>Venta - Belgrano</Text>
                    <Text style={styles.subtext}>3 Amb</Text>
                    <Text style={styles.subtext}>u$d 476.000</Text>
                </View>   
                <View style={styles.wrenchbox}>
                    <MaterialCommunityIcons name="wrench" size={15} color='white' />          
                </View>       
            </View>

        <View style={styles.box}>  
            <Image source={casa3} style={styles.imageContainer}/>
            <View style={styles.textContainer}> 
                <Text style={styles.text}>Country Abril</Text>
                <Text style={styles.subtext}>Alquilada - Hudson</Text>
                <Text style={styles.subtext}>5 Amb</Text>
                <Text style={styles.subtext}>u$d 773.000</Text>
            </View>   
            <View style={styles.wrenchbox}>
                <MaterialCommunityIcons name="wrench" size={15} color='white' />          
            </View>       
        </View>

        <View style={styles.box}>  
            <Image source={edificio4} style={styles.imageContainer}/>
            <View style={styles.textContainer}> 
                <Text style={styles.text}>AV. Independencia 45...</Text>
                <Text style={styles.subtext}>Venta - Belgrano</Text>
                <Text style={styles.subtext}>3 Amb</Text>
                <Text style={styles.subtext}>u$d 275.000</Text>
            </View>   
            <View style={styles.wrenchbox}>
                <MaterialCommunityIcons name="wrench" size={15} color='white' />          
            </View>       
        </View>

        <View style={styles.box}>  
            <Image source={edificio5} style={styles.imageContainer}/>   
            <View style={styles.textContainer}> 
                <Text style={styles.text}>AV. Corrientes 3823, 18A</Text>
                <Text style={styles.subtext}>Alquiler - Belgrano</Text>
                <Text style={styles.subtext}>3 Amb</Text>
                <Text style={styles.subtext}>$ 545.000</Text>
            </View>   
            <View style={styles.wrenchbox}>
                <MaterialCommunityIcons name="wrench" size={15} color='white' />          
            </View>       
        </View>






        </View>


    );

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        width: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
    },

    box: { // esta
        //flex: 1,
        //display: 'flex',
        width: '88%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c2c2c2',
        borderRadius: 8,
        flexDirection: 'row',
        marginTop: '5%',
        height: '12%',

    },

    wrenchbox: { // esta
        // marginLeft: '8%',
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
        //backgroundColor: Theme.colors.clear.PRIMARY,
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
imageContainer:{
        backgroundColor: 'red',
       // flex:1,
       //  display: 'flex',
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
        justifyContent: 'center', // esto esta ok
        //backgroundColor:'red', 
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








    // googleImage: {
    //     width: 16,
    //     height: 16,
    //     marginRight: 20,
    // },

    //    < title: {
    //         fontWeight: '400',
    //         fontSize: 30,
    //         color: Theme.colors.clear.PRIMARY,
    //         marginBottom: '',
    //     },
    //     inputText: {
    //         color: '#000',
    //         fontSize: 14,
    //         fontWeight: '400',
    //         //backgroundColor:'green',


    //     },    
    //     input: {
    //         width: '95%',
    //         backgroundColor: '#F6F6F6',
    //         padding: 3,
    //         borderRadius: 5,
    //         marginBottom: 30,
    //         borderRadius: 10,
    //         borderWidth: 0.5,
    //     },
    //     
    //     realStateText: {
    //         color: 'white',
    //         fontSize: 14,
    //     },


    //     subtitleContainer: {
    //         margin: 30,
    //     },
    //     subtitle: {
    //         color: '#000',
    //         fontSize: 20,
    //         fontWeight: '400',
    //         justifyContent: 'center',
    //     },
    //     header:{
    //         backgroundColor:'red',
    //         width:'100%',
    //         height:'13%'
    //     },>



});