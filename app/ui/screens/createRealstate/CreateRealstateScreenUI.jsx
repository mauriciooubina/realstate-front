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

const CreateRealstateScreenUI = () => {
  const navigation = useNavigation();
  const [pictures, setPictures] = useState([]);
  console.log({ pictures });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [realStateID, setRealStateID] = useState();


  const propertyData = {
    "calle": null,
    "altura": null,
    "piso": null,
    "depto": null,
    "barrio": null,
    "localidad": null,
    "provincia": null,
    "pais": null,
    "realStateId": realStateID,
    "propertyType": null,
    "coveredMeters": null,
    "uncoveredMeters": null,
    "semiUncoveredMeters": null,
    "rooms": null,
    "environments": null,
    "bathrooms": null,
    "terrace": false,
    "balcony": false,
    "garage": false,
    "trunk": false,
    "front": false,
    "howOld": null,
    "orientation": null,
    "amenities": [],
    "description": null,
    "state": null,
    "price": null,
    "expensePrice": null,
    "rentalPrice": null,
    "salePrice": null,
    "urlPhoto1": null,
    "urlPhoto2": null,
    "urlPhoto3": null,
    "urlVideo": null
  };

  const paises = [{ label: 'Argentina', value: 'Argentina' },];
  const moneda = [{ label: '$', value: '$' }, { label: 'u$d', value: 'u$d' },];
  const tipoPropiedad = [{ label: 'Casa', value: 'Casa' }, { label: 'Departamento', value: 'Departamento' }, { label: 'Ph', value: 'Ph' },];
  const contador = [{ label: '0', value: '0' }, { label: '1', value: '1' }, { label: '2', value: '2' },
  { label: '3', value: '3' }, { label: '4', value: '4' }, { label: '5', value: '5' },];
  const orientacion = [{ label: 'Norte', value: 'Norte' }, { label: 'Sur', value: 'Sur' },
  { label: 'Este', value: 'Este' }, { label: 'Oeste', value: 'Oeste' },];
  const vista = [{ label: 'Frente', value: 'Frente' }, { label: 'Contrafrente', value: 'Contrafrente' },];
  const estados = [{ label: 'Venta', value: 'Venta' }, { label: 'Alquiler', value: 'Alquiler' },
  { label: 'Reservado', value: 'Reservado' }, { label: 'Alquilado', value: 'Alquilado' },
  { label: 'Vendido', value: 'Vendido' },]
  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [barrios, setBarrios] = useState([]);

  const selectImage = async (useLibrary) => {
    let result;
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
    };
    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }
    if (!result.canceled) {
      console.log({ uri: result.assets[0].uri });
      setPictures([...pictures, result.assets[0].uri]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {

      const id = await AsyncStorage.getItem('realstateId');

      setRealStateID(id);

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

  const handleCreateProperty = async (values) => {
    console.log(values);
    setIsLoggingIn(true);
    if ("money" in values) {
      delete values.money;
    }
    try {
      const id = await AsyncStorage.getItem('realstateId');
      values.realStateId = id;
      const response = await propertiesWS.post(values);
      navigation.navigate(NavigatorConstants.REALSTATE_STACK.HOME);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <Formik initialValues={propertyData} onSubmit={values => handleCreateProperty(values)}>
      {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <Pressable onPress={() => selectImage(true)}>
              {pictures.length === 0 ?
                <View style={styles.picture}>
                  <Image
                    style={styles.addIcon}
                    source={"../../../../assets/images/add_image.png"}
                  />
                </View> :
                <View style={styles.picture}>
                  <Image
                    style={styles.addIcon}
                    source={{ uri: 'data:image/jpeg;base64,' + pictures[0] }}
                  />
                </View>
              }
              <View style={styles.picBotBar} />
            </Pressable>
            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>DIRECCIÓN</Text>
              </View>
              <DropdownComponent title="Pais" data={paises} name="pais" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
              <DropdownComponent title="Provincia" data={provincias} name="provincia" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
              <DropdownComponent title="Localidad" data={localidades} name="localidad" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
              <DropdownComponent title="Barrio" data={barrios} name="barrio" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
              <CustomTextInput
                title="Calle"
                placeholder="Ingrese la calle"
                onChange={(text) => {
                  handleChange("calle", text);
                  setFieldValue("calle", text);
                }}
              />
              <CustomTextInput
                title="Altura"
                type="numeric"
                placeholder="Ingrese la altura"
                onChange={(text) => {
                  handleChange("altura", text);
                  setFieldValue("altura", text);
                }}
              />
              <View style={styles.horizontalContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <CustomTextInput
                      title="Piso"
                      type="numeric"
                      placeholder="Ingrese el piso"
                      onChange={(text) => {
                        handleChange("piso", text);
                        setFieldValue("piso", text);
                      }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <CustomTextInput
                      title="Departamento"
                      placeholder="Ingrese el depto."
                      onChange={(text) => {
                        handleChange("depto", text);
                        setFieldValue("depto", text);
                      }}
                    />
                  </View>
                </View>


              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>CATEGORÍA</Text>
              </View>
              <DropdownComponent title="Tipo de propiedad" data={tipoPropiedad} name="propertyType" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
              <CustomTextInput
                title="Antiguedad"
                type="numeric"
                placeholder="Ingrese la antiguedad de la propiedad."
                onChange={(text) => {
                  handleChange("howOld", text);
                  setFieldValue("howOld", text);
                }}
              />
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>METRAJES</Text>
              </View>
              <CustomTextInput
                title="M2 Cubiertos"
                type="numeric"
                placeholder="Ingrese los m2 cubiertos."
                onChange={(text) => {
                  handleChange("coveredMeters", text);
                  setFieldValue("coveredMeters", text);
                }}
              />
              <CustomTextInput
                title="M2 Semicubiertos"
                type="numeric"
                placeholder="Ingrese los m2 semicubiertos."
                onChange={(text) => {
                  handleChange("semiUncoveredMeters", text);
                  setFieldValue("semiUncoveredMeters", text);
                }}
              />
              <CustomTextInput
                title="M2 Descubiertos"
                placeholder="Ingrese los m2 descubiertos."
                type="numeric"
                onChange={(text) => {
                  handleChange("uncoveredMeters", text);
                  setFieldValue("uncoveredMeters", text);
                }}
              />
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>AMBIENTES</Text>
              </View>
              <View style={styles.horizontalContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <DropdownComponent title="Totales" data={contador} name="rooms" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />

                  </View>
                  <View style={{ flex: 1 }}>
                    <DropdownComponent title="Habitaciones" data={contador} name="rooms" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />

                  </View>
                </View>

              </View>
              <DropdownComponent title="Baños" data={contador} name="bathrooms" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
              <View style={styles.horizontalContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <DropdownComponent
                      title="Cocheras"
                      data={contador}
                      name="garage"
                      onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <DropdownComponent
                      title="Bauleras"
                      data={contador}
                      name="trunk"
                      onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }}
                    />
                  </View>
                </View>
              </View>
              <CustomSwitchComponent
                title="Terraza"
                value={values.terrace}
                setFieldValue={setFieldValue}
                name="terrace"
              />
              <CustomSwitchComponent
                title="Balcon"
                value={values.balcony}
                setFieldValue={setFieldValue}
                name="balcony"
              />
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>ORIENTACION</Text>
              </View>
              <View style={styles.horizontalContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <DropdownComponent
                      title="Ortientación"
                      data={orientacion}
                      name="orientation"
                      onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <DropdownComponent
                      title="Vista"
                      data={vista}
                      name="front"
                      onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
                  </View>
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
            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>PRECIO</Text>
              </View>
              <DropdownComponent
                title="Estado"
                name="state"
                data={estados}
                onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }}
              />
              <View style={styles.horizontalContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <CustomTextInput
                      title="Valor"
                      placeholder="Ingrese el Valor"
                      type="numeric"
                      onChange={(text) => {
                        handleChange("price", text);
                        setFieldValue("price", text);
                      }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <DropdownComponent title="Moneda" data={moneda} name="money" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
                  </View>
                </View>
              </View>
              <View style={styles.horizontalContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <CustomTextInput
                      title="Expensas"
                      type="numeric"
                      placeholder="Ingrese las Expensas"
                      onChange={(text) => {
                        handleChange("expensePrice", text);
                        setFieldValue("expensePrice", text);
                      }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <DropdownComponent title="Moneda" data={moneda} name="money" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>DESCRIPCION</Text>
              </View>
              <View >
                <CustomTextInput
                  customHeight={125} // Establece la altura a 300
                  title="Descripcion"
                  isDescription={true}
                  placeholder="Ingrese la Descripcion"
                  onChange={(text) => {
                    handleChange("description", text);
                    setFieldValue("description", text);
                  }}
                />
              </View>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity style={[styles.blueButton]} onPress={() => navigation.goBack()}>
                <Text style={[styles.realStateText]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.blueButton]} onPress={handleSubmit}>
                {isLoggingIn ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={[styles.realStateText]}> Guardar</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default CreateRealstateScreenUI;

const styles = StyleSheet.create({
  picBotBar: {
    height: 50, // Ajusta la altura según tus preferencias
    backgroundColor: "#47A7FF", // Color y transparencia deseados
    opacity: 0.7,
    borderBottomLeftRadius: 20, // Radio en la esquina inferior izquierda
    borderBottomRightRadius: 20, // Radio en la esquina inferior derecha
    width: "98%"
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
  picture: {
    backgroundColor: "#c4c4c4",
    height: 225,
    width: "98%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 20, // Radio en la esquina superior izquierda
    borderTopRightRadius: 20, // Radio en la esquina superior derecha
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    paddingBottom: 20,
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
    flexDirection: 'row',
    marginBottom: 200,
    marginTop: 20,
    marginLeft: 20,
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
  realStateText: {
    color: 'white',
    fontSize: 14,
  },
});
