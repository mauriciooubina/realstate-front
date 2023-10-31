import { Text, View,StyleSheet,TouchableOpacity,Image,Pressable,ScrollView,SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import CustomTextInput from "../../../components/TextInputComponent";
import CustomSwitchComponent from "../../../components/SwitchComponent";
import DropdownComponent from "../../../components/DropdownComponent";
import { Formik } from "formik";
import Theme from '../../styles/Theme';
import * as ImagePicker from "expo-image-picker";
import propertiesWS from '../../../networking/api/endpoints/propertiesWS';

const EditRealstateScreenUI = () => {
  const navigation = useNavigation();
  const [pictures, setPictures] = useState([]);
  const [initialValues, setInitialValues] = useState({});

  //Switch
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  //TextInput
  const [number, onChangeNumber] = useState("");

  // Select image from library or camera
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

    // Save image if not cancelled
    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setPictures([...pictures, result.assets[0].uri]);
    }
  };

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await propertiesWS.get(id);
        setProperties(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPropertyData();
  }, []);

  const handleDelete = () => {
    console.log('delete property');
  }

  return (
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
              <DropdownComponent title="País" />
              <DropdownComponent title="Provincia" />
              <DropdownComponent title="Localidad" />
              <DropdownComponent title="Barrio" />
              <CustomTextInput title="Calle" placeholder="Ingrese la calle" />
              <CustomTextInput
                title="Altura"
                type="numeric"
                placeholder="Ingrese la altura"
              />
              <View style={styles.horizontalContainer}>
                <CustomTextInput
                  title="Piso"
                  type="numeric"
                  placeholder="Ingrese el piso"
                />
                <CustomTextInput
                  title="Departamento"
                  placeholder="Ingrese el depto."
                />
              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>CATEGORÍA</Text>
              </View>
              <DropdownComponent title="Tipo de propiedad" />
              <CustomTextInput
                title="Antiguedad"
                type="numeric"
                placeholder="Ingrese la antiguedad de la propiedad."
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
              />
              <CustomTextInput
                title="M2 Semicubiertos"
                type="numeric"
                placeholder="Ingrese los m2 semicubiertos."
              />
              <CustomTextInput
                title="M2 Descubiertos"
                placeholder="Ingrese los m2 descubiertos."
              />
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>AMBIENTES</Text>
              </View>
              <View style={styles.horizontalContainer}>
                <DropdownComponent title="Totales" />
                <DropdownComponent title="Habitaciones" />
              </View>
              <DropdownComponent title="Baños" />
              <View style={styles.horizontalContainer}>
                <DropdownComponent title="Cocheras" />
                <DropdownComponent title="Bauleras" />
              </View>
              <CustomSwitchComponent title="Terraza" />

              <CustomSwitchComponent title="Balcon" />
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>ORIENTACION</Text>
              </View>
              <View style={styles.horizontalContainer}>
                <DropdownComponent title="Ortientación" />
                <DropdownComponent title="Vista" />
              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>AMENITIES</Text>
              </View>
              <CustomSwitchComponent title="Quincho" />
              <CustomSwitchComponent title="Pileta" />
              <CustomSwitchComponent title="Jacuzzi" />
              <CustomSwitchComponent title="Sauna" />
              <CustomSwitchComponent title="SUM" />
              <CustomSwitchComponent title="Gym" />
              <CustomSwitchComponent title="Mas+" />
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.itemTitleView}>
                <Text style={styles.titleText}>PRECIO</Text>
              </View>
              <DropdownComponent title="Estado" />
              <View style={styles.horizontalContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <CustomTextInput
                      title="Valor"
                      placeholder="Ingrese el Valor"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <DropdownComponent title="Moneda" />
                  </View>
                </View>
              </View>
              <View style={styles.horizontalContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <CustomTextInput
                      title="Expensas"
                      placeholder="Ingrese las Expensas"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <DropdownComponent title="Moneda" />
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
                placeholder="Ingrese la Descripcion"
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
              <TouchableOpacity style={[styles.redButton]} onPress={handleDelete}>
                <Text style={[styles.realStateText]}>Eliminar publicacion</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default EditRealstateScreenUI;

const styles = StyleSheet.create({
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
    marginBottom: 10, // Alinea a la izquierda
  },
  horizontalContainer: {
    display: "flex",
    flex: 2,
    flexDirection: "row",
    alignItems: "center", // Alinea a la izquierda,
    justifyContent: "space-between",
    // width: "100%",
  },
  titleText: {
    color: "#365EEB",
    margin: 5,
    textAlign: "left", // Alinea el texto a la izquierda
    fontSize: 20,
  },
  itemTitleView: {
    alignItems: "flex-start", // Alinea a la izquierda
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Centra los botones horizontalmente
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
