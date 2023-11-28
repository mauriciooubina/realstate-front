import {
  Text, View, StyleSheet, TouchableOpacity, Image, Pressable, ScrollView, ActivityIndicator, SafeAreaView, Switch, TextInput, Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import CustomTextInput from "../../../components/TextInputComponent";
import CustomSwitchComponent from "../../../components/SwitchComponent";
import DropdownComponent from "../../../components/DropdownComponent";
import { Formik } from "formik";
import Theme from '../../styles/Theme';
import georefWS from "../../../networking/api/endpoints/georefWS";
import propertiesWS from '../../../networking/api/endpoints/propertiesWS';
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigatorConstants from "../../../navigation/NavigatorConstants";

const UserSearchScreenUI = () => {
  const navigation = useNavigation();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const propertyData = {};
  const moneda = [{ label: '$', value: '$' }, { label: 'u$d', value: 'u$d' },];
  const tipoPropiedad = [{ label: 'Casa', value: 'Casa' }, { label: 'Departamento', value: 'Departamento' }, { label: 'Ph', value: 'Ph' },];
  const contador = [{ label: '0', value: '0' }, { label: '1', value: '1' }, { label: '2', value: '2' },
  { label: '3', value: '3' }, { label: '4', value: '4' }, { label: '5', value: '5' },];
  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [barrios, setBarrios] = useState([]);
  const [comprarBtn, setComprarBtn] = useState(true);
  const [alquilarBtn, setAlquilarBtn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await georefWS.getProvincias();
        const newData = response.provincias.map((p) => {
          return { label: p.nombre, value: p.nombre };
        });
        setProvincias(newData);
        const response1 = await georefWS.getLocalidades();
        const newData1 = response1.departamentos.map((p) => {
          return { label: p.nombre, value: p.nombre };
        });
        setLocalidades(newData1);
        const response2 = await georefWS.getBarrios();
        const newData2 = response2.localidades.map((p) => {
          return { label: p.nombre, value: p.nombre };
        });
        setBarrios(newData2);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (values) => {
    setIsLoggingIn(true);
    try {
      const amenities = ["quincho", "pileta", "jacuzzi", "sum", "sauna", "gym", "mas"];
      for (const val of amenities) {
        if (values.hasOwnProperty(val) && values[val] === true) {
          values.amenities.push(val);
          delete values.val;
        }
      }
      console.log('values: ', values);
      const response = await propertiesWS.search(values);
      console.log('responseMedia: ', responseMedia);
      navigation.navigate(NavigatorConstants.REALSTATE_STACK.HOME);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoggingIn(false);
    }
  }

  const handleSelectedButton = (type) => {
    if(type === 'Comprar'){
      setComprarBtn(true);
      setAlquilarBtn(false);
    } else{
      setComprarBtn(false);
      setAlquilarBtn(true);
    }
  };

  return (
    <Formik initialValues={propertyData} onSubmit={values => handleSearch(values)}>
      {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>

            <View style={styles.buttonsProperty}>
            <TouchableOpacity
                style={comprarBtn ? styles.selectedButton : styles.unselectedButton}
                onPress={() => handleSelectedButton('Comprar')}>
                  <Text style={comprarBtn ? styles.selectedText : styles.unselectedText}> Comprar</Text>
                </TouchableOpacity>
                <View style={{ marginHorizontal: 30 }}></View>
                <TouchableOpacity
                style={alquilarBtn ? styles.selectedButton : styles.unselectedButton}
                onPress={() => handleSelectedButton('Alquilar')}>
                  <Text style={alquilarBtn ? styles.selectedText : styles.unselectedText}> Alquilar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>CATEGORÍA</Text>
              </View>
              <DropdownComponent title="Tipo de propiedad" data={tipoPropiedad} name="propertyType" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>DIRECCIÓN</Text>
              </View>
              <DropdownComponent title="Provincia" data={provincias} name="provincia" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
              <DropdownComponent title="Localidad" data={localidades} name="localidad" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
              <DropdownComponent title="Barrio" data={barrios} name="barrio" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
            </View>

            <View style={styles.itemTitleView}>
                  <Text style={styles.titleText}>PRECIO</Text>
                </View>
            <View style={styles.horizontalContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <CustomTextInput
                      title="PrecioMin"
                      name="lowerPriceRange"
                      placeholder="Ingrese precio mínimo"
                      onChange={(text) => {
                        handleChange("lowerPriceRange", text);
                        setFieldValue("lowerPriceRange", text);
                      }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                  <CustomTextInput
                      title="PrecioMax"
                      name="topPriceRange"
                      placeholder="Ingrese precio máximo"
                      onChange={(text) => {
                        handleChange("topPriceRange", text);
                        setFieldValue("topPriceRange", text);
                      }}
                    />
                  </View>
                </View>
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>AMBIENTES</Text>
              </View>
              <View style={styles.horizontalContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <DropdownComponent title="Minimo" data={contador} name="rooms" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <DropdownComponent title="Maximo" data={contador} name="rooms" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
                  </View>
                </View>
              </View>
              <View style={styles.horizontalContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <DropdownComponent title="Cuartos" data={contador} name="rooms" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />

                  </View>
                  <View style={{ flex: 1 }}>
                    <DropdownComponent title="Baños" data={contador} name="bathrooms" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.itemTitleView}>
                  <Text style={styles.titleText}>ANTIGUEDAD</Text>
            </View>
            <View style={styles.horizontalContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <DropdownComponent title="Minimo" data={contador} name="antigmin" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <DropdownComponent title="Maximo" data={contador} name="antigmax" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
                  </View>
                </View>
              </View>
            
            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>AMENITIES</Text>
              </View>
              <CustomSwitchComponent
                title="Quincho"
                value={values.quincho}
                setFieldValue={setFieldValue}
                name="quincho"

              />
              <CustomSwitchComponent
                title="Pileta"
                value={values.pileta}
                setFieldValue={setFieldValue}
                name="pileta"

              />
              <CustomSwitchComponent
                title="Jacuzzi"
                value={values.jacuzzi}
                setFieldValue={setFieldValue}
                name="jacuzzi"

              />
              <CustomSwitchComponent
                title="Sauna"
                value={values.sauna}
                setFieldValue={setFieldValue}
                name="sauna"

              />
              <CustomSwitchComponent
                title="SUM"
                value={values.sum}
                setFieldValue={setFieldValue}
                name="sum"

              />
              <CustomSwitchComponent
                title="Gym"
                value={values.gym}
                setFieldValue={setFieldValue}
                name="gym"

              />
              <CustomSwitchComponent
                title="Mas+"
                value={values.mas}
                setFieldValue={setFieldValue}
                name="mas"

              />
            </View>
            
            <View style={styles.buttons}>
              <TouchableOpacity style={[styles.blueButton]} onPress={handleSubmit}>
                {isLoggingIn ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={[styles.realStateText]}> Buscar</Text>
                )}
              </TouchableOpacity>
            </View>

          </ScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default UserSearchScreenUI;

const styles = StyleSheet.create({
  picBotBar: {
    height: 50,
    backgroundColor: "#47A7FF",
    opacity: 0.7,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: "98%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  scrollView: {
    width: "90%",
    paddingLeft: "2%",
    paddingTop: "5%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pictureView: {
    backgroundColor: "#c4c4c4",
    height: 225,
    width: "98%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  picture: {
    objectFit: 'cover',
    height: 225,
    width: "98%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  addIcon: {
    width: "30%",
    objectFit: "contain",
    opacity: 0.5,
  },
  contentContainer: {
    display: "flex",
    width: "100%",
    marginBottom: 10,
  },
  horizontalContainer: {
    display: "flex",
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    color: "#365EEB",
    margin: 5,
    textAlign: "left",
    fontSize: 20,
  },
  itemTitleView: {
    alignItems: "flex-start",
    marginTop:10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    paddingBottom: 20,
  },
  blueButton: {
    backgroundColor: '#F6F6F6',
    padding: 10,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    backgroundColor: Theme.colors.clear.PRIMARY,
    borderRadius: 40,
    width: 120
  },
  button: {
    backgroundColor: "#365EEB",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 3,
    marginRight: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttons: {
    alignItems: 'center',
    marginBottom: 100,
    marginTop: 20,
    marginLeft: 20,
  },
  buttonsProperty: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 20,
    alignItems: 'center',
  },
  selectedButton: {
    alignItems: 'center',
    backgroundColor: Theme.colors.clear.PRIMARY,
    borderRadius: 40,
    width: 120,
    height: 25,
  },
  unselectedButton: {
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 40,
    width: 120,
    height: 25,
    borderColor: Theme.colors.clear.PRIMARY,
    borderWidth: 2,
  },
  realStateText: {
    color: 'white',
    fontSize: 14,
  },
  selectedText: {
    color: 'white',
    fontSize: 14,
  },
  unselectedText: {
    color: Theme.colors.clear.PRIMARY,
    fontSize: 14,
  },
  dot: {
    fontSize: 40,
    color: 'white',
    opacity: .5,
    paddingHorizontal: 10
  },
  selectedDot: {
    fontSize: 40,
    color: 'white',
    paddingHorizontal: 10,
    // opacity: 0
  },
  arrowRight: {
    fontSize: 20,
    position: 'absolute',
    top: '50%',
    right: '5%',
    color: 'white',
    backgroundColor: '#47A7FF',
    borderRadius: 10,
    paddingHorizontal: 5
  },
  arrowLeft: {
    fontSize: 20,
    position: 'absolute',
    top: '50%',
    left: '5%',
    color: 'white',
    backgroundColor: '#47A7FF',
    borderRadius: 10,
    paddingHorizontal: 5,
    transform: [{ scaleX: -1 }]
  },
  selectedPictureView: {
    display: 'flex',
  }
});
