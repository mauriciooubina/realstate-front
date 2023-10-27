import { Text, View, StyleSheet, TouchableOpacity, Image, Pressable, ScrollView, SafeAreaView, Switch, TextInput } from 'react-native';
import Mail from '../../../../assets/images/mail.png';
import { useNavigation } from '@react-navigation/native';
import NavigatorConstants from '../../../navigation/NavigatorConstants';
import SelectDropdown from 'react-native-select-dropdown';
import { useState } from 'react';

import DropdownComponent from '../../../components/DropdownPicker'

import * as ImagePicker from 'expo-image-picker';

const RealstateHomeScreenUI = () => {

    const navigation = useNavigation();
    const [pictures, setPictures] = useState([]);

    //Switch
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    //TextInput
    const [number, onChangeNumber] = useState('');

    // Select image from library or camera
    const selectImage = async (useLibrary) => {
        let result;
        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.75
        };

        if (useLibrary) {
            result = await ImagePicker.launchImageLibraryAsync(options);
        } else {
            await ImagePicker.requestCameraPermissionsAsync();
            result = await ImagePicker.launchCameraAsync(options);
        }

        // Save image if not cancelled
        if (!result.canceled) {
            console.log(result.assets[0].uri);
            setPictures([...pictures, result.assets[0].uri]);
        }
    };


    //pais
    //provincia
    //localidad
    //barrio
    //calle
    const [calle, setCalle] = useState('');
    //altura
    const [altura, setAltura] = useState('');
    //piso
    const [piso, setPiso] = useState('');
    //depto
    const [depto, setDepto] = useState('');
    //tipo de propiedad
    //Antiguedad
    //m2 cubiertos
    const [m2Cubiertos, setM2Cubiertos] = useState('');
    //m2 semicubiertos
    const [m2SemiCubiertos, setM2SemiCubiertos] = useState('');
    //m2 descubiertos
    const [m2Desubiertos, setM2Desubiertos] = useState('');
    //ambientes yotales
    //cuartos
    //baños
    //cochera
    //baulera
    //terraza
    const [terraza, setTerraza] = useState(false);
    const switchTerraza = () => setTerraza(terraza => !terraza)
    
    //balcon
    const [balcon, setBalcon] = useState(false);
    //orientacion
    //vista
    //quincho
    const [quincho, setQuincho] = useState(false);
    //pileta
    const [pileta, setPileta] = useState(false);
    //jacuzzi
    const [jacuzzi, setJacuzzi] = useState(false);
    //sauna
    const [sauna, setSauna] = useState(false);
    //sum
    const [sum, setSum] = useState(false);
    //gym
    const [gym, setGym] = useState(false);
    //mas+
    const [mas, setMas] = useState(false);
    //estado
    //valor
    //moneda 1
    //Expensas
    //moneda 2
    //descripcion
    const [descripcion, setDescripcion] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Pressable onPress={() => selectImage(true)}>
                    <View style={styles.picture}>
                        <Image
                            style={styles.addIcon}
                            source={require('../../../../assets/images/add_image.png')}
                        />
                    </View>
                </Pressable>
                <View style={styles.contentContainer}>
                    <View style={styles.itemTitleView}>
                        <Text style={styles.titleText}>DIRECCIÓN</Text>
                    </View>
                    <View style={styles.itemTitleView}>
                        <Text style={styles.itemTitleText}>País</Text>
                    </View>
                    <View style={styles.dropdownView}>
                        <DropdownComponent />
                    </View>
                    <View style={styles.itemTitleView}>
                        <Text style={styles.itemTitleText}>Provincia</Text>
                    </View>
                    <View style={styles.dropdownView}>
                        <DropdownComponent />
                    </View>
                    <View style={styles.itemTitleView}>
                        <Text style={styles.itemTitleText}>Localidad</Text>
                    </View>
                    <View style={styles.dropdownView}>
                        <DropdownComponent />
                    </View>
                    <View style={styles.itemTitleView}>
                        <Text style={styles.itemTitleText}>Barrio</Text>
                    </View>
                    <View style={styles.dropdownView}>
                        <DropdownComponent />
                    </View>
                    <View style={styles.itemTitleView}>
                        <Text style={styles.itemTitleText}>Calle</Text>
                    </View>

                    <View style={styles.numericTextInputView}>
                        <TextInput
                            style={styles.numericTextInput}
                            onChangeText={onChangeNumber}
                            value={number}
                            placeholder="Ingresá la altura si te dan los huevos"
                        />
                    </View>
                    <View style={styles.itemTitleView}>
                        <Text style={styles.itemTitleText}>Altura</Text>
                    </View>

                    <View style={styles.numericTextInputView}>
                        <TextInput
                            style={styles.numericTextInput}
                            onChangeText={onChangeNumber}
                            value={number}
                            keyboardType="numeric"
                            placeholder="Ingresá la altura si te dan los huevos"
                        />
                    </View>





                    <View style={styles.switchContainer}>
                        <View style={styles.contentContainer2}>
                            <View style={styles.itemTitleView}>
                                <Text style={styles.itemTitleText}>Piso</Text>
                            </View>
                            <View style={styles.numericTextInputView}>
                                <TextInput
                                    style={styles.numericTextInput}
                                    onChangeText={onChangeNumber}
                                    value={number}
                                    placeholder="Type"
                                />
                            </View>
                        </View>

                        <View style={styles.contentContainer2}>
                            <View style={styles.itemTitleView}>
                                <Text style={styles.itemTitleText}>Departamento</Text>
                            </View>
                            <View style={styles.switchView}>

                                <View style={styles.numericTextInputView}>
                                    <TextInput
                                        style={styles.numericTextInput}
                                        onChangeText={onChangeNumber}
                                        value={number}
                                        placeholder="Type"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.itemTitleView}>
                        <Text style={styles.titleText}>CATEGORÍA</Text>
                    </View>
                    <View style={styles.itemTitleView}>
                        <Text style={styles.itemTitleText}>Tipo de Propiedad</Text>
                    </View>
                    <View style={styles.dropdownView}>
                        <DropdownComponent />
                    </View>
                    <View style={styles.itemTitleView}>
                        <Text style={styles.itemTitleText}>Antiguedad</Text>
                    </View>
                    <View style={styles.numericTextInputView}>
                        <TextInput
                            style={styles.numericTextInput}
                            onChangeText={onChangeNumber}
                            value={number}
                            keyboardType='numeric'
                            placeholder="Ingrese la antiguedad de la propiedad, a ver si te da"
                        />
                    </View>
                    <View style={styles.itemTitleView}>
                        <Text style={styles.titleText}>METRAJES</Text>
                    </View>
                    <View style={styles.switchContainer}>
                        <View style={styles.contentContainer2}>
                            <View style={styles.itemTitleView}>
                                <Text style={styles.itemTitleText}>M2 Cubiertos</Text>
                            </View>
                            <View style={styles.numericTextInputView}>
                                <TextInput
                                    style={styles.numericTextInput}
                                    onChangeText={onChangeNumber}
                                    value={number}
                                    keyboardType='numeric'
                                    placeholder="Type"
                                />
                            </View>
                        </View>

                        <View style={styles.contentContainer2}>
                            <View style={styles.itemTitleView}>
                                <Text style={styles.itemTitleText}>M2 Semicubiertos</Text>
                            </View>
                            <View style={styles.switchView}>

                                <View style={styles.numericTextInputView}>
                                    <TextInput
                                        style={styles.numericTextInput}
                                        onChangeText={onChangeNumber}
                                        value={number}
                                        keyboardType='numeric'
                                        placeholder="Type"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.itemTitleView}>
                        <Text style={styles.itemTitleText}>M2 Descubiertos</Text>
                    </View>
                    <View style={styles.switchView}>

                        <View style={styles.numericTextInputView}>
                            <TextInput
                                style={styles.numericTextInput}
                                onChangeText={onChangeNumber}
                                value={number}
                                keyboardType='numeric'
                                placeholder="Type"
                            />
                        </View>
                    </View>
                    <View style={styles.itemTitleView}>
                        <Text style={styles.titleText}>AMBIENTES</Text>
                    </View>
                    <View style={styles.switchContainer}>
                        <View style={styles.contentContainer2}>
                            <View style={styles.itemTitleView}>
                                <Text style={styles.itemTitleText}>Totales</Text>
                            </View>
                            <View style={styles.dropdownView}>
                                <DropdownComponent />
                            </View>
                        </View>

                        <View style={styles.contentContainer2}>
                            <View style={styles.itemTitleView}>
                                <Text style={styles.itemTitleText}>Habitaciones</Text>
                            </View>
                            <View style={styles.switchView}>

                                <View style={styles.dropdownView}>
                                    <DropdownComponent />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.itemTitleView}>
                        <Text style={styles.itemTitleText}>Baños</Text>
                    </View>
                    <View style={styles.dropdownView}>
                        <DropdownComponent />
                    </View>
                    <View style={styles.switchContainer}>
                        <View style={styles.contentContainer2}>
                            <View style={styles.itemTitleView}>
                                <Text style={styles.itemTitleText}>Cocheras</Text>
                            </View>
                            <View style={styles.dropdownView}>
                                <DropdownComponent />
                            </View>
                        </View>

                        <View style={styles.contentContainer2}>
                            <View style={styles.itemTitleView}>
                                <Text style={styles.itemTitleText}>Bauleras</Text>
                            </View>
                            <View style={styles.switchView}>

                                <View style={styles.dropdownView}>
                                    <DropdownComponent />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.switchContainer}>

                        <View style={styles.itemTitleView}>
                            <Text style={styles.itemTitleText}>Terraza</Text>
                        </View>

                            <Switch style={styles.switch}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={terraza ? '#365EEB' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={switchTerraza}
                            value={terraza}
                        />
                        { /*
    useEffect(() => {
    const toggle = setInterval(() => {
      setIsShowingText(!isShowingText);
    }, 1000);
    
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);*/}

                    </View>
                    <View style={styles.switchContainer}>

                        <View style={styles.itemTitleView}>
                            <Text style={styles.itemTitleText}>Balcon</Text>
                        </View>

                        <Switch style={styles.switch}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#365EEB' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />

                    </View>
                    <View style={styles.itemTitleView}>
                        <Text style={styles.titleText}>ORIENTACION</Text>
                    </View>
                    <View style={styles.switchContainer}>
                        <View style={styles.contentContainer2}>
                            <View style={styles.itemTitleView}>
                                <Text style={styles.itemTitleText}>Orientacion</Text>
                            </View>
                            <View style={styles.dropdownView}>
                                <DropdownComponent />
                            </View>
                        </View>

                        <View style={styles.contentContainer2}>
                            <View style={styles.itemTitleView}>
                                <Text style={styles.itemTitleText}>Vista</Text>
                            </View>
                            <View style={styles.switchView}>

                                <View style={styles.dropdownView}>
                                    <DropdownComponent />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.itemTitleView}>
                        <Text style={styles.titleText}>AMENITIES</Text>
                    </View>

                    <View style={styles.switchContainer}>

                        <View style={styles.itemTitleView}>
                            <Text style={styles.itemTitleText}>Quincho</Text>
                        </View>

                        <Switch style={styles.switch}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#365EEB' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />

                    </View>
                    <View style={styles.switchContainer}>

                        <View style={styles.itemTitleView}>
                            <Text style={styles.itemTitleText}>Pileta</Text>
                        </View>

                        <Switch style={styles.switch}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#365EEB' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />

                    </View>
                    <View style={styles.switchContainer}>

                        <View style={styles.itemTitleView}>
                            <Text style={styles.itemTitleText}>Jacuzzi</Text>
                        </View>

                        <Switch style={styles.switch}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#365EEB' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />

                    </View>
                    <View style={styles.switchContainer}>

                        <View style={styles.itemTitleView}>
                            <Text style={styles.itemTitleText}>Sauna</Text>
                        </View>

                        <Switch style={styles.switch}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#365EEB' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />

                    </View>
                    <View style={styles.switchContainer}>

                        <View style={styles.itemTitleView}>
                            <Text style={styles.itemTitleText}>SUM</Text>
                        </View>

                        <Switch style={styles.switch}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#365EEB' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />

                    </View>
                    <View style={styles.switchContainer}>

                        <View style={styles.itemTitleView}>
                            <Text style={styles.itemTitleText}>GYM</Text>
                        </View>

                        <Switch style={styles.switch}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#365EEB' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />

                    </View>
                    <View style={styles.switchContainer}>

                        <View style={styles.itemTitleView}>
                            <Text style={styles.itemTitleText}>Mas+</Text>
                        </View>

                        <Switch style={styles.switch}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#365EEB' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />

                    </View>
                    <View style={styles.itemTitleView}>
                        <Text style={styles.titleText}>PRECIO</Text>
                    </View>
                    <View style={styles.itemTitleView}>
                        <Text style={styles.itemTitleText}>Estado</Text>
                    </View>
                    <View style={styles.dropdownView}>
                        <DropdownComponent />
                    </View>

                    <View style={styles.switchContainer}>
                        <View style={styles.contentContainer2}>
                            <View style={[styles.itemTitleView,{marginBottom: 15}]}>
                                <Text style={styles.itemTitleText}>Valor</Text>
                            </View>
                            <View style={[styles.numericTextInputView,{height: 30, }]}>
                                <TextInput
                                    style={styles.numericTextInput}
                                    onChangeText={onChangeNumber}
                                    value={number}
                                    placeholder="Type"
                                />
                            </View>
                        </View>
                        <View style={styles.contentContainer2}>
                            <View style={[styles.itemTitleView,{marginTop: 5}]}>
                                <Text style={styles.itemTitleText}>Moneda</Text>
                            </View>
                            <View style={styles.dropdownView}>
                                <DropdownComponent 
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.switchContainer}>
                        <View style={styles.contentContainer2}>
                            <View style={[styles.itemTitleView,{marginBottom: 15}]}>
                                <Text style={styles.itemTitleText}>Expensas</Text>
                            </View>
                            <View style={[styles.numericTextInputView,{height:30}]}>
                                <TextInput
                                    style={styles.numericTextInput}
                                    onChangeText={onChangeNumber}
                                    value={number}
                                    placeholder="Type"
                                />
                            </View>
                        </View>
                        <View style={styles.contentContainer2}>
                            <View style={[styles.itemTitleView,{marginTop:5}]}>
                                <Text style={styles.itemTitleText}>Moneda</Text>
                            </View>
                            <View style={styles.dropdownView}>
                                <DropdownComponent />
                            </View>
                        </View>
                    </View>

                    <View style={styles.itemTitleView}>
                        <Text style={styles.titleText}>DESCRIPCION</Text>
                    </View>
                    <View style={styles.textInputView}>
                        <TextInput
                            style={styles.numericTextInput}
                            onChangeText={onChangeNumber}
                            value={number}
                            placeholder="useless placeholder"
                        />
                    </View>
                    {/* Botones Cancelar y Guardar */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default RealstateHomeScreenUI;

const styles = StyleSheet.create({
    scrollView: {
        width: '90%',
        paddingLeft: '2%',
        paddingTop: '5%'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    picture: {
        backgroundColor: '#c4c4c4',
        height: 225,
        width: '98%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    addIcon: {
        width: '30%',
        objectFit: 'contain',
        opacity: 0.7
    },
    contentContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start', // Alinea a la izquierda
    },
    contentContainer2: {
        flexDirection: 'column',
        alignItems: 'start', // Alinea a la izquierda,
        justifyContent: 'center',
        flex: 1
    },
    titleText: {
        color: '#365EEB',
        margin: 5,
        textAlign: 'left', // Alinea el texto a la izquierda
        fontSize: 20
    },
    itemTitleView: {
        alignItems: 'flex-start', // Alinea a la izquierda
    },
    itemTitleText: {
        textAlign: 'left', // Alinea el texto a la izquierda
        fontSize: 15,
        margin: 5
    },
    dropdownView: {
        width: '100%',
        paddingRight: '2%'
    },
    numericTextInputView: {
        height: 30,
        borderBottomColor: '#365EEB',
        borderBottomWidth: 0.7,
        borderRadius: 10,
        width: '100%',
        paddingLeft: '2%',
    },
    switchView: {
        flexDirection: 'row',
        alignItems: 'flex-end', // Alinea el Switch al centro verticalmente
        justifyContent: 'center', // Alinea el Switch a la derecha
    },
    textInputView: {
        height: 150,
        borderColor: '#3e3e3e',
        borderWidth: 0.7,
        borderRadius: 10,
        width: '100%',
        paddingLeft: '2%',
    },
    // Estilos para los botones
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Centra los botones horizontalmente
        margin: 10,

    },
    button: {
        backgroundColor: '#365EEB',
        padding: 10,
        borderRadius: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 3,
        marginRight: 3
        // Añade margen entre los botones

    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    switchContainer: {
        flexDirection: 'row', // Coloca el Switch en una fila
        //justifyContent: 'flex-end', // Alinea el contenido hacia la derecha
        alignItems: 'center', // Alinea verticalmente al centrovv
        justifyContent: 'space-between',
        width: '100%',
    }
});
