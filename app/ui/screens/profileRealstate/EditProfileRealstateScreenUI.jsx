import Theme from '../../styles/Theme';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NavigatorConstants from '../../../navigation/NavigatorConstants';
import realstateWS from '../../../networking/api/endpoints/realstateWS';
import passwordRecoveryWS from '../../../networking/api/endpoints/passwordRecoveryWS';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default EditProfileRealstateScreenUI = () => {
    const navigation = useNavigation();
    const [realEstateData, setRealEstateData] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saveEdit, setSaveEdit] = useState(false);

    useEffect(() => {
        const fetchRealEstateData = async () => {
            try {
                const id = await AsyncStorage.getItem('realstateId');
                const response = await realstateWS.get(id);
                setRealEstateData(response.data[0]);
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
            console.log(password);
            await realstateWS.put(realEstateData);
            const id = await AsyncStorage.getItem('realstateId');
            if (password !== null) {
                await passwordRecoveryWS.passwordChange(id, password);
            }
            navigation.navigate(NavigatorConstants.REALSTATE_STACK.HOME);
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
                    <View style={{ width: '100%', height: '10%' }}>
                    </View>
                    <View>
                        <Text style={styles.title}>Editar Perfil</Text>
                    </View>
                    <View style={{ width: '100%', height: '8%' }}>
                    </View>
                    <View style={{ height: '60%', width: '80%', alignContent: 'center' }}>
                        <Text style={styles.inputText}>Email</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <TextInput style={styles.input}
                                value={realEstateData.realStateEmail}
                                onChangeText={(text) => setRealEstateData((prevData) => ({
                                    ...prevData,
                                    realStateEmail: text,
                                }))}>
                            </TextInput>
                            <MaterialCommunityIcons name="wrench" size={24} color={Theme.colors.clear.PRIMARY} />
                        </View>
                        <Text style={styles.inputText}>Contraseña</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={true}
                                placeholder={'Ingrese una nueva contraseña, si desea cambiarla'}
                                onChangeText={(text) => setPassword(text)}>
                            </TextInput>
                            <MaterialCommunityIcons name="wrench" size={24} color={Theme.colors.clear.PRIMARY} />
                        </View>
                        <Text style={styles.inputText}>Nombre de la Inmobiliaria</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <TextInput
                                style={styles.input}
                                value={realEstateData.fantasyName}
                                onChangeText={(text) => setRealEstateData((prevData) => ({
                                    ...prevData,
                                    fantasyName: text,
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


});