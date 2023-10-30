

import React, { useState } from 'react';
import Theme from '../../styles/Theme';
import NavigatorConstants from '../../../navigation/NavigatorConstants';
import { useNavigation, Lik } from '@react-navigation/native';
import { Button, Modal, Text, View, StyleSheet, TouchableOpacity, TextInput, Link } from 'react-native';
import { IconButton } from '@mui/material';
// import {Image} from 'expo-image';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import InmobEditProfileScreen from '../profile/InmobEditProfileScreen';
import {Rating} from 'react-native-stock-star-rating';
import InmobEditProfileScreenUI from '../profile/InmobEditProfileScreenUI';
import GoogleLoginScreenUI from '../login/GoogleLoginScreenUI';

export default InmobHomeScreenUI = () => {
    
    
    const navigation = useNavigation();
    const  [isModalVisible,setIsModalVisible] = useState(false);
    const  [burgerModalVisible, setburgerModalVisible] = useState(false);
    

    
   

    // const handleProfile = () => {
    //     console.log(email);
    //     console.log(password);
    //     console.log(realstateName);
        
    // };


    return(


    <View>

        <View style={styles.blueContainer}> 
               <View style={styles.textContainer}>
                    <View style={styles.burger} >
                        <Octicons name="three-bars" size={30} color="white" onPress={() => setburgerModalVisible(true)}/>
                    </View>
                    <View>
                        <Text style={styles.homeText}>
                            My Home
                        </Text>
                    </View>
                    <View style={styles.plus}>
                        <AntDesign name="plussquare" size={30} color="white" />
                    </View>
               </View>
        </View>

        <Modal 
            visible={burgerModalVisible}
            onRequestClose={() => setburgerModalVisible(false)}
            animationType="slide"
            presentationStyle="pageSheet"
            transparent={true}
            >
                <View style ={styles.modal2BackGround}>
                    <View style={[styles.modal2Container]}>
                        <View style={styles.inmobTitleBox}>
                            <Text style={styles.inmobTitle}>
                                Inmobiliaria Atilio
                            </Text>

                            <View style={styles.stars}>
                                <Rating maxStars={5} size={30} stars={3}/>
                            </View>
                            
                        </View>
                        <View style={styles.editBox}>
                            <View > 
                                <SimpleLineIcons name="note" size={20} color={Theme.colors.clear.PRIMARY} marginLeft={17}/>
                            </View>
                            <Text style={styles.editTitle}>
                                Editar datos
                            </Text>
                        </View>
                        <View style={styles.editBox2}>
                            <View>
                                <MaterialCommunityIcons name="logout" size={24} color={Theme.colors.clear.PRIMARY} marginLeft={15} />
                            </View>
                            
                            <Text style={styles.editCerrarSesion} >
                                
                                Cerrar sesión
                                
                            </Text>
                            
                        </View>
                        <View style={styles.editBox}>
                            <View>
                                <Ionicons name="md-trash-sharp" size={24} color="red" marginLeft={15} />
                            </View>
                            <Text style={styles.editBorrarCuenta} onPress={() => setIsModalVisible(true)}>
                                Borrar cuenta
                            </Text>

                        </View>
                    </View>
                </View>
        </Modal>



        <Modal 
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
            animationType="slide"
            presentationStyle="pageSheet"
            transparent={true}
            >
                <View style ={styles.modalBackGround}>
                    <View style={[styles.modalContainer]}>
                        <Text style={styles.title}>
                            ¿Está seguro que desea borrar su cuenta?
                        </Text>
                        <Text style={styles.subtitle}>
                            Recuerde que se perderá toda información vinculada a dicha cuenta
                        </Text>
                        <View style={styles.buttons}>
                            <TouchableOpacity style={[styles.blueButton]} onPress={() => setIsModalVisible(false)}>
                            <Text style={[styles.noText]}>  NO  </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.whiteButton]} onPress={console.log()}>
                            <Text style={[styles.siText]}>  SI  </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        </Modal>
    </View>

        
    );

};


const styles = StyleSheet.create({
  
   blueContainer: { // esta
        //flex: 1,
        //display: 'flex',
        width: '100%',
        height: '40%',

        justifyContent: 'left',
        alignItems: 'center',
        backgroundColor:'#47A7FF',
        flexDirection: 'row',
        marginTop: '0%',
        marginBottom: '0%',
      
    },

    textContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },

    homeText:{
        color: 'white',
        fontSize: 25,
        marginLeft: 100,
    },

    burger:{
        marginLeft: 20,
    },

    plus:{
        marginLeft:110,
    },

   stars:{
        marginBottom:20,
        marginLeft:15,
       
   },
  
  
   
   
      
    blueButton: {
        flex: 1,
        backgroundColor: '#F6FF6',
        padding: 5,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        backgroundColor: Theme.colors.clear.PRIMARY,
        borderRadius: 30,
        justifyContent:'center',
        flexDirection: 'row',
    },

    whiteButton: {
        flex: 1,
        padding: 5,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        backgroundColor:'white',
        borderRadius: 30,
        justifyContent:'center',
        flexDirection: 'row',
        borderColor: Theme.colors.clear.PRIMARY,
        borderWidth: 2.5,
    },

    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems:'center',
        
    },

    modalContainer:{
        width: '90%',
        height: '60%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 10,
        eleation: 20,
    },

    modal2Container:{
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
        alignItems:'left',
        
    },

    inmobTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 15,
    },

   

    inmobTitleBox:{
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
        marginLeft:15,
        marginBottom: 10,
        justifyContent:'center',
        alignItems:'center',
        color: Theme.colors.clear.PRIMARY,

    },

    editCerrarSesion: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft:15,
        marginBottom: 10,
        justifyContent:'center',
        alignItems:'center',
        color: Theme.colors.clear.PRIMARY,

    },

    editBorrarCuenta: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft:15,
        marginBottom: 10,
        justifyContent:'center',
        alignItems:'center',
        color:'red' ,

    },

    editBox:{
        borderColor: 'grey',
        borderWidth: 0.5, 
        width: '100%',
        marginLeft: 0,
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems:'center',
    },

    editBox2:{
        borderColor: 'grey',
        borderWidth: 0.5, 
        width: '100%',
        marginLeft: 0,
        marginTop: 315,
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems:'center',
    },

    

    title: {
        fontWeight: '400',
        fontSize: 35,
        color: Theme.colors.clear.PRIMARY,
        textAlign:'center',
        lineHeight: 50,
    },

    subtitle: {
        fontWeight: '400',
        fontSize: 15,
        marginTop: '10%',
        textAlign:'center',
        lineHeight: 25,
    },

    buttons: {
        display:'flex',
        width:'100%',
        justifyContent:'center', 
        flexDirection:'row',
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