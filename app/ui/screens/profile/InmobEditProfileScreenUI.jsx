
import Theme from '../../styles/Theme';
import NavigatorConstants from '../../../navigation/NavigatorConstants';

import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import { IconButton } from '@mui/material';

import { MaterialCommunityIcons } from '@expo/vector-icons';




export default InmobEditProfileScreenUI = () => {
    const navigation = useNavigation();


    // const handleProfile = () => {
    //     console.log(email);
    //     console.log(password);
    //     console.log(realstateName);
        
    // };


    return(

         <View style={styles.container}>


            <View style={{width:'100%', height:'25%'}}>  
            <Text>  </Text>
            </View> 

            <View>
                <Text style={styles.title}>Editar Perfil</Text>
            </View> 

            <View style={{width:'100%', height:'8%'}}>  
            <Text>  </Text>
            </View> 
    
            <View style={{height: '60%' , width: '80%', alignContent:'center' }}>  

                     <Text style={styles.inputText}>Email</Text>
                    <View style={{display:'flex', flexDirection:'row'}}>
                        <TextInput
                            style={styles.input}
                            //value={email}
                            //onChangeText={(text) => setEmail(text)}
                            >
                               <Text>atilioinmuebles@gmail.com.ar</Text>
                        </TextInput>
                        <Text>   </Text>
                        <MaterialCommunityIcons name="wrench" size={24} color={Theme.colors.clear.PRIMARY} />
                        
                        

                    </View>

                    
                    <Text style={styles.inputText}>Contraseña</Text>
                    <View style={{display:'flex', flexDirection:'row'}}>

                        <TextInput 
                            style={styles.input}
                            secureTextEntry={true}
                            //value={password}
                            //onChangeText={(text) => setPassword(text)}
                            >
                            <Text>**************</Text>
                        </TextInput>
                        <Text>   </Text>
                        <MaterialCommunityIcons name="wrench" size={24} color={Theme.colors.clear.PRIMARY} />
                    
                    </View>

                    

                    <Text style={styles.inputText}>Nombre de la Inmobiliaria</Text>
                    <View style={{display:'flex', flexDirection:'row'}}>

                        <TextInput 
                            style={styles.input}
                            //value={realstateName}
                            //onChangeText={(text) => setRealstateName(text)}
                            >
                            <Text>Inmobiliaria Atilio</Text>
                        </TextInput>
                        <Text>   </Text>
                        <MaterialCommunityIcons name="wrench" size={24} color={Theme.colors.clear.PRIMARY} />
                    </View>

                    <View style={styles.buttons}>
                    <TouchableOpacity style={[styles.blueButton]} onPress={() => navigation.goBack()}>
                        <Text style={[styles.realStateText]}>  Cancelar  </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.blueButton]} onPress={console.log()}>
                        <Text style={[styles.realStateText]}>  Guardar  </Text>
                    </TouchableOpacity>
                    </View>



                </View>



        </View>

        
    );

};


const styles = StyleSheet.create({
    container: { // esta
        flex: 1,
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor:'yellow',

    },
    title: {
        fontWeight: '400',
        fontSize: 30,
        color: Theme.colors.clear.PRIMARY,
        marginBottom: '',
    },
    inputText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '400',
        //backgroundColor:'green',
        
        
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
        display:'flex',
        //backgroundColor: '#F6FF6',
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
        display:'flex',
        width:'100%',
        justifyContent:'center', // esto esta ok
        //backgroundColor:'red', 
        flexDirection:'row',
        marginTop: 40,

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
    header:{
        backgroundColor:'red',
        width:'100%',
        height:'13%'
    },
  
    
});