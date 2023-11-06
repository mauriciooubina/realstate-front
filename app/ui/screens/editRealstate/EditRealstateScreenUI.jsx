import { Text, View, StyleSheet, TouchableOpacity, Image, Pressable, ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import CustomTextInput from "../../../components/TextInputComponent";
import CustomSwitchComponent from "../../../components/SwitchComponent";
import DropdownComponent from "../../../components/DropdownComponent";
import { Formik } from "formik";
import Theme from '../../styles/Theme';
import * as ImagePicker from "expo-image-picker";
import propertiesWS from '../../../networking/api/endpoints/propertiesWS';
import DeleteProperty from "../../../components/DeleteProperty";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigatorConstants from "../../../navigation/NavigatorConstants";

const EditRealstateScreenUI = () => {
  const navigation = useNavigation();
  const [pictures, setPictures] = useState([]);
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [number, onChangeNumber] = useState("");
  const [showDeleteProperty, setShowDeleteProperty] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const paises = [
    { label: 'Argentina', value: 'Argentina' },
  ];
  const moneda = [
    { label: '$', value: '$' },
    { label: 'u$d', value: 'u$d' },
  ];
  const tipoPropiedad = [
    { label: 'Casa', value: 'Casa' },
    { label: 'Departamento', value: 'Departamento' },
    { label: 'Ph', value: 'Ph' },
  ];
  const contador = [
    { label: '0', value: '0' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ];
  const orientacion = [
    { label: 'Norte', value: 'Norte' },
    { label: 'Sur', value: 'Sur' },
    { label: 'Este', value: 'Este' },
    { label: 'Oeste', value: 'Oeste' },
  ];
  const vista = [{ label: 'Frente', value: 'Frente' }, { label: 'Contrafrente', value: 'Contrafrente' },];
  const estados = [
    { label: 'Venta', value: 'Venta' },
    { label: 'Alquiler', value: 'Alquiler' },
    { label: 'Reservado', value: 'Reservado' },
    { label: 'Alquilado', value: 'Alquilado' },
    { label: 'Vendido', value: 'Vendido' },
  ]
  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [barrios, setBarrios] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [pictureIndex, setPictureIndex] = useState(0);


  const selectImage = async (useLibrary) => {
    let result;
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };
    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }
    if (!result.canceled) {
      setPictures([...pictures, result.assets[0].uri]);
    }
  };


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
  }

  const fetchPropertyData = async () => {
    try {
      const id = await AsyncStorage.getItem('propertyId');
      const response = await propertiesWS.get(id);
      const am = response.data[0].additionaldetails.amenities;
      const res = { ...response.data[0] };
      am.forEach(valor => {
        res[valor] = true; 
      });
      setInitialValues(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchPropertyData();
  }, []);

  const openDeleteProperty = () => {
    setShowDeleteProperty(true);
  };

  const closeDeleteProperty = () => {
    setShowDeleteProperty(false);
  };

  const handleEditProperty = async (values) => {
    console.log(values);
    setIsLoggingIn(true);
    const id = await AsyncStorage.getItem('realstateId');
    if ("money" in values) {
      delete values.money;
    }
    try {
      const newValues = {
        "propertyId": values.id,
        "calle": values.address.street,
        "altura": values.address.streetNumber,
        "piso": values.address.floor,
        "depto": values.address.department,
        "barrio": values.address.district,
        "localidad": values.address.locality,
        "provincia": values.address.province,
        "pais": values.address.country,
        "realStateId": id,
        "propertyType": values.details.propertyType,
        "coveredMeters": values.details.coveredMeters,
        "uncoveredMeters": values.details.uncoveredMeters,
        "semiUncoveredMeters": values.details.semiUncoveredMeters,
        "rooms": values.details.rooms,
        "environments": values.details.environments,
        "bathrooms": values.details.bathrooms,
        "terrace": values.details.terrace,
        "balcony": values.details.balcony,
        "garage": values.details.garage,
        "trunk": values.details.trunk,
        "front": values.details.front,
        "howOld": values.details.howOld,
        "orientation": values.details.orientation,
        "amenities": [],
        "description": values.additionaldetails.description,
        "state": values.additionaldetails.state,
        "price": values.additionaldetails.price,
        "expensePrice": values.additionaldetails.expensePrice,
        "rentalPrice": values.additionaldetails.rentalPrice,
        "salePrice": values.additionaldetails.salePrice,
        "urlPhoto1": values.additionaldetails.urlPhoto1,
        "urlPhoto2": values.additionaldetails.urlPhoto2,
        "urlPhoto3": values.additionaldetails.urlPhoto3,
        "urlVideo": values.additionaldetails.urlVideo
      };
      const amenities = ["quincho", "pileta", "jacuzzi", "sum", "sauna", "gym", "mas"];
      for (const val of amenities) {
        if (values.hasOwnProperty(val) && values[val] === true) {
          newValues.amenities.push(val);
        }
      }
      console.log('newValues: ',newValues);
      const response = await propertiesWS.put(newValues);
      //const responseMedia = await propertiesWS.postMedia(pictures, values.id); 
      //console.log('responseMedia: ',responseMedia);
      navigation.navigate(NavigatorConstants.REALSTATE_STACK.HOME);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    loading ? (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Theme.colors.clear.PRIMARY} />
      </View>
    ) : (
      <Formik initialValues={initialValues} onSubmit={values => handleEditProperty(values)}>
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
            {!pictures[pictureIndex] ?
              <Pressable onPress={() => selectImage(true)}>
                <View style={styles.pictureView}>
                  <Image
                    style={styles.addIcon}
                    source={require("../../../../assets/images/add_image.png")}
                  />
                  {pictureIndex > 0 && pictures.length > 0 && <Pressable onPress={() => setPictureIndex(pictureIndex - 1)} style={styles.arrowLeft}>
                  <Text style={{ color: 'white' }} >
                    ➜
                  </Text>
                </Pressable>}
                {pictureIndex < 2 && pictures.length > 0 && <Pressable onPress={() => setPictureIndex(pictureIndex + 1)} style={styles.arrowRight}>
                  <Text style={{ color: 'white' }} >
                    ➜
                  </Text>
                </Pressable>}
                </View>
              </Pressable>
              :
              <View style={styles.selectedPictureView}>
                <Image
                  style={styles.picture}
                  source={{ uri: pictures[pictureIndex] }}
                />
                {pictureIndex > 0 && <Pressable onPress={() => setPictureIndex(pictureIndex - 1)} style={styles.arrowLeft}>
                  <Text style={{ color: 'white' }} >
                    ➜
                  </Text>
                </Pressable>}
                {pictureIndex < 2 && <Pressable onPress={() => setPictureIndex(pictureIndex + 1)} style={styles.arrowRight}>
                  <Text style={{ color: 'white' }} >
                    ➜
                  </Text>
                </Pressable>}
              </View>
            }
            <View style={styles.picBotBar}>
              {pictures.map((picture, index) => {
                return <Text key={index} style={index === pictureIndex ? styles.selectedDot : styles.dot}>
                  •
                </Text>
              })
              }
            </View>
              <View style={styles.contentContainer}>
                <View style={styles.itemTitleView}>
                  <Text style={styles.titleText}>DIRECCIÓN</Text>
                </View>
                <DropdownComponent title="Pais" value={initialValues.address.country} data={paises} name="pais" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
                <DropdownComponent title="Provincia" value={initialValues.address.province} data={provincias} name="provincia" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
                <DropdownComponent title="Localidad" value={initialValues.address.locality} data={localidades} name="localidad" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
                <DropdownComponent title="Barrio" value={initialValues.address.district} data={barrios} name="barrio" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
                <CustomTextInput
                  title="Calle"
                  placeholder="Ingrese la calle"
                  onChange={(text) => {
                    handleChange("calle", text);
                    setFieldValue("calle", text);
                  }}
                  value={initialValues.address.street}
                />
                <CustomTextInput
                  title="Altura"
                  type="numeric"
                  placeholder="Ingrese la altura"
                  onChange={(text) => {
                    handleChange("altura", text);
                    setFieldValue("altura", text);
                  }}
                  value={initialValues.address.streetNumber}
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
                        value={initialValues.address.floor}
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
                        value={initialValues.address.department}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.itemTitleView}>
                  <Text style={styles.titleText}>CATEGORÍA</Text>
                </View>
                <DropdownComponent title="Tipo de propiedad" value={initialValues.details.propertyType} data={tipoPropiedad} name="propertyType" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
                <CustomTextInput
                  title="Antiguedad"
                  type="numeric"
                  placeholder="Ingrese la antiguedad de la propiedad."
                  onChange={(text) => {
                    handleChange("howOld", text);
                    setFieldValue("howOld", text);
                  }}
                  value={initialValues.details.howOld}
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
                  value={initialValues.details.coveredMeters}
                />
                <CustomTextInput
                  title="M2 Semicubiertos"
                  type="numeric"
                  placeholder="Ingrese los m2 semicubiertos."
                  onChange={(text) => {
                    handleChange("semiUncoveredMeters", text);
                    setFieldValue("semiUncoveredMeters", text);
                  }}
                  value={initialValues.details.semiUncoveredMeters}
                />
                <CustomTextInput
                  title="M2 Descubiertos"
                  placeholder="Ingrese los m2 descubiertos."
                  onChange={(text) => {
                    handleChange("uncoveredMeters", text);
                    setFieldValue("uncoveredMeters", text);
                  }}
                  value={initialValues.details.uncoveredMeters}
                />
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.itemTitleView}>
                  <Text style={styles.titleText}>AMBIENTES</Text>
                </View>
                <View style={styles.horizontalContainer}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, paddingRight: 10 }}>
                      <DropdownComponent title="Totales" value={initialValues.details.rooms} data={contador} name="rooms" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />

                    </View>
                    <View style={{ flex: 1 }}>
                      <DropdownComponent title="Habitaciones" value={initialValues.details.rooms} data={contador} name="rooms" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />

                    </View>
                  </View>

                </View>
                <DropdownComponent title="Baños" value={initialValues.details.bathrooms} data={contador} name="bathrooms" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
                <View style={styles.horizontalContainer}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, paddingRight: 10 }}>
                      <DropdownComponent title="Cocheras" value={initialValues.details.garage} data={contador} name="garage" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <DropdownComponent title="Bauleras" value={initialValues.details.trunk} data={contador} name="trunk" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
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
                      <DropdownComponent title="Ortientación" value={initialValues.details.orientation} data={orientacion} name="orientation" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <DropdownComponent title="Vista" value={initialValues.details.front} data={vista} name="front" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
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
                  value={values.sum}
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
                  value={initialValues.additionaldetails.state}
                />
                <View style={styles.horizontalContainer}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, paddingRight: 10 }}>
                      <CustomTextInput
                        title="Valor"
                        placeholder="Ingrese el Valor"
                        onChange={(text) => {
                          handleChange("price", text);
                          setFieldValue("price", text);
                        }}
                        value={initialValues.additionaldetails.price}
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
                        placeholder="Ingrese las Expensas"
                        onChange={(text) => {
                          handleChange("expensePrice", text);
                          setFieldValue("expensePrice", text);
                        }}
                        value={initialValues.additionaldetails.expensePrice}
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
                <CustomTextInput
                  title=""
                  placeholder="Ingrese la Descripcion"
                  customHeight={125}
                  isDescription={true}
                  textAlignVertical='top'
                  onChange={(text) => {
                    handleChange("description", text);
                    setFieldValue("description", text);
                  }}
                  value={initialValues.additionaldetails.description}
                />
              </View>
              <View style={styles.buttons}>
                <TouchableOpacity style={[styles.blueButton]} onPress={() => navigation.goBack()}>
                  <Text style={[styles.realStateText]}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.blueButton]} onPress={handleSubmit}>
                  {isLoggingIn ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={[styles.realStateText]}>Guardar</Text>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.deleteButton}>
                <TouchableOpacity style={[styles.redButton]} onPress={openDeleteProperty}>
                  <Text style={[styles.realStateText]}>Eliminar publicacion</Text>
                </TouchableOpacity>
              </View>
              {showDeleteProperty && (
                <DeleteProperty closeDeleteProperty={closeDeleteProperty} />
              )}
            </ScrollView>
          </SafeAreaView>
        )}
      </Formik>
    )
  );
};

export default EditRealstateScreenUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    width: "90%",
    paddingLeft: "2%",
    paddingTop: "5%",
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
  selectedPictureView: {
    display: 'flex',
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
  
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 20,
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
  deleteButton: {
    flexDirection: 'row',
    marginBottom: 200,
    marginTop: 20,
    justifyContent: "center",
  },
  redButton: {
    backgroundColor: '#F6F6F6',
    padding: 10,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    backgroundColor: Theme.colors.clear.ALERT,
    borderRadius: 40,
  },
  realStateText: {
    color: 'white',
    fontSize: 14,
  },
});
