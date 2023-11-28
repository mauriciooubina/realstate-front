import Theme from '../../styles/Theme';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NavigatorConstants from '../../../navigation/NavigatorConstants';
import realstateWS from '../../../networking/api/endpoints/realstateWS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from '../../../../assets/images/photo.png';

export default EditProfileUserScreenUI = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saveEdit, setSaveEdit] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            {
            const response = await loginWS.login(null,null, 'ya29.a0AfB_byBpP2wCB3ON5iqo_IyTpcqJcHNoRifDkQkf0i1QnUQbusK8nM4EPaxFoQ8rXG7St6zLNnfnUvn4lJHl_nyfVyh1kXqavbWplG54PDWGlv81-upXH2mIExzs1-1GU13_2bcRR0Ol_SbkDQo2jyyI7hNErQZLtlX0aCgYKAV4SARESFQHGX2MiaBlp22eaebvxxoX3r2k0YA0171');
            setUserData(response.data);
            }
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchUserData();
      }, []);

    const handleSaveProfile = async () => {
        setSaveEdit(true);
        try {
            {/*}
            console.log(password);
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

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color={Theme.colors.clear.PRIMARY} />
            ) : (
                <View>
                    <View style={{ width: '100%', height: '15%' }}>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.title}>Editar Perfil</Text>
                    </View>
                    <View style={{alignItems: 'center'} }>
                        <Image source={{uri:userData.profilePictureUrl}} style={styles.profilePic} />
                    </View>
                    <View style={{ width: '100%', height: '8%' }}>
                    </View>
                    <View style={{ height: '60%', width: '80%', alignContent: 'center' }}>
                        <Text style={styles.inputText}>Email</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <TextInput style={styles.input}
                                value={userData.email}
                                onChangeText={(text) => setRealEstateData((prevData) => ({
                                    ...prevData,
                                    email: text,
                                }))}>
                            </TextInput>
                            <MaterialCommunityIcons name="wrench" size={24} color={Theme.colors.clear.PRIMARY} />
                        </View>
                        <Text style={styles.inputText}>Nombre de usuario</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <TextInput
                                style={styles.input}
                                value={userData.fullName}
                                onChangeText={(text) => setRealEstateData((prevData) => ({
                                    ...prevData,
                                    name: text,
                                }))}>
                            </TextInput>
                            <MaterialCommunityIcons name="wrench" size={24} color={Theme.colors.clear.PRIMARY} />
                        </View>

                        <View style={styles.buttons}>
                            <TouchableOpacity style={[styles.blueButton]} onPress={() => navigation.goBack()}>
                                <Text style={[styles.realStateText]}>  Cancelar  </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.blueButton]} onPress={handleSaveProfile}>
                                {saveEdit ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={[styles.realStateText]}>  Guardar  </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
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
        marginBottom: '',
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
    header: {
        backgroundColor: 'red',
        width: '100%',
        height: '13%'
    },
    profilePic: { 
        width: '40%', 
        height: 140, 
        marginTop: 20,
        borderRadius: 100
    },
});