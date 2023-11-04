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
import DeleteAccount from "../../../components/DeleteAccount";
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditRealstateScreenUI = () => {
  const navigation = useNavigation();
  const [pictures, setPictures] = useState([]);
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [number, onChangeNumber] = useState("");
  const [showDeleteProperty, setShowDeleteProperty] = useState(false);

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
      console.log(result.assets[0].uri);
      setPictures([...pictures, result.assets[0].uri]);
    }
  };

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const id = await AsyncStorage.getItem('realstateId');
        const response = await propertiesWS.get(id);
        setInitialValues(response.data[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, []);

  const openDeleteProperty = () => {
    setShowDeleteProperty(true);
  };

  const closeDeleteProperty = () => {
    setShowDeleteProperty(false);
  };

  return (
    loading ? (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Theme.colors.clear.PRIMARY} />
      </View>
    ) :(
    <Formik initialValues={initialValues} onSubmit={values => console.log({ values })}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <Pressable onPress={() => selectImage(true)}>
              <View style={styles.picture}>
                <Image
                  style={styles.addIcon}
                  source={require("../../../../assets/images/add_image.png")}
                />
              </View>
            </Pressable>
            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>DIRECCIÓN</Text>
              </View>
              <DropdownComponent title="País" val={initialValues.address.country}/>
              <DropdownComponent title="Provincia" val={initialValues.address.province}/>
              <DropdownComponent title="Localidad" val={initialValues.address.locality}/>
              <DropdownComponent title="Barrio" val={initialValues.address.district}/>
              <CustomTextInput title="Calle" value={initialValues.address.street} />
              <CustomTextInput
                title="Altura"
                type="numeric"
                value={initialValues.address.streetNumber}
              />
              <View style={styles.horizontalContainer}>
                <CustomTextInput
                  title="Piso"
                  type="numeric"
                  value={initialValues.address.floor}
                />
                <CustomTextInput
                  title="Departamento"
                  value={initialValues.address.department}
                />
              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>CATEGORÍA</Text>
              </View>
              <DropdownComponent title="Tipo de propiedad" val={initialValues.details.propertyType}/>
              <CustomTextInput
                title="Antiguedad"
                type="numeric"
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
                value={initialValues.details.coveredMeters}
              />
              <CustomTextInput
                title="M2 Semicubiertos"
                type="numeric"
                value={initialValues.details.semiUncoveredMeters}
              />
              <CustomTextInput
                title="M2 Descubiertos"
                value={initialValues.details.uncoveredMeters}
              />
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>AMBIENTES</Text>
              </View>
              <View style={styles.horizontalContainer}>
                <DropdownComponent title="Totales" val={initialValues.details.propertyType}/>
                <DropdownComponent title="Habitaciones" val={initialValues.details.propertyType}/>
              </View>
              <DropdownComponent title="Baños" val={initialValues.details.bathrooms}/>
              <View style={styles.horizontalContainer}>
                <DropdownComponent title="Cocheras" val={initialValues.details.garage}/>
                <DropdownComponent title="Bauleras" val={initialValues.details.trunk}/>
              </View>
              <CustomSwitchComponent title="Terraza" val={initialValues.details.terrace}/>

              <CustomSwitchComponent title="Balcon" val={initialValues.details.balcony}/>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>ORIENTACION</Text>
              </View>
              <View style={styles.horizontalContainer}>
                <DropdownComponent title="Ortientación" val={initialValues.details.orientation}/>
                <DropdownComponent title="Vista" val={initialValues.details.front}/>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>AMENITIES</Text>
              </View>
              <CustomSwitchComponent title="Quincho" value={initialValues.additionaldetails.amenities.includes("Quincho")}/>
              <CustomSwitchComponent title="Pileta" value={initialValues.additionaldetails.amenities.includes("Swimming Pool")}/>
              <CustomSwitchComponent title="Jacuzzi" value={initialValues.additionaldetails.amenities.includes("Jacuzzi")}/>
              <CustomSwitchComponent title="Sauna" value={initialValues.additionaldetails.amenities.includes("Sauna")}/>
              <CustomSwitchComponent title="SUM" value={initialValues.additionaldetails.amenities.includes("SUM")}/>
              <CustomSwitchComponent title="Gym" value={initialValues.additionaldetails.amenities.includes("Gym")}/>
              <CustomSwitchComponent title="Mas+" value={initialValues.additionaldetails.amenities.includes("More")}/>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>PRECIO</Text>
              </View>
              <DropdownComponent title="Estado" val='Venta'/>
              <View style={styles.horizontalContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <CustomTextInput
                      title="Valor"
                      value={initialValues.additionaldetails.price}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <DropdownComponent title="Moneda" val='$'/>
                  </View>
                </View>
              </View>
              <View style={styles.horizontalContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <CustomTextInput
                      title="Expensas"
                      value={initialValues.additionaldetails.expensePrice}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <DropdownComponent title="Moneda" val='$'/>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>DESCRIPCION</Text>
              </View>
              <CustomTextInput
                title="Descripcion"
                value={initialValues.additionaldetails.description}
              />
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity style={[styles.blueButton]} onPress={() => navigation.goBack()}>
                <Text style={[styles.realStateText]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.blueButton]} onPress={handleSubmit}>
                <Text style={[styles.realStateText]}>Guardar</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.deleteButton}>
              <TouchableOpacity style={[styles.redButton]} onPress={openDeleteProperty}>
                <Text style={[styles.realStateText]}>Eliminar publicacion</Text>
              </TouchableOpacity>
            </View>
            {showDeleteProperty && (
              <DeleteAccount closeDeleteProperty={closeDeleteProperty} />
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
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: 20,
  },
  addIcon: {
    width: "30%",
    objectFit: "contain",
    opacity: 0.7,
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
    // Añade margen entre los botones
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
