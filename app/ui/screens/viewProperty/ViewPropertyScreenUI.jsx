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
import { MaterialIcons } from '@expo/vector-icons';

const ViewPropertyScreenUI = () => {
  const navigation = useNavigation();
  const [pictures, setPictures] = useState([]);
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [number, onChangeNumber] = useState("");
  const [showDeleteProperty, setShowDeleteProperty] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
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

  const fetchPropertyData = async () => {
    try {
      {/*}
      const id = await AsyncStorage.getItem('propertyId');
      const response = await propertiesWS.get(id);
      const am = response.data[0].additionaldetails.amenities;
      const res = { ...response.data[0] };
      am.forEach(valor => {
        res[valor] = true;
      });
    setInitialValues(res); */}
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
      console.log('newValues: ', newValues);
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

  const handleContact = () => {
    navigation.navigate(NavigatorConstants.USER_STACK.CONTACT);
  };

  const handleReserve = () => {
    navigation.navigate(NavigatorConstants.USER_STACK.RESERVE);
  };

  const handleExperience = () => {
    navigation.navigate(NavigatorConstants.USER_STACK.EXPERIENCE);
  };

  return (
    loading ? (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Theme.colors.clear.PRIMARY} />
      </View>
    ) : (
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
              <Text style={styles.titleText}>ALQUILER - DEPARTAMENTO</Text>
            </View>
            <View style={styles.horizontalContainer}>
              <View style={{ flexDirection: "row" }}>

              </View>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.itemTitleView}>
              <Text style={styles.titleText}>DESCRIPCION</Text>
            </View>
            <View>
              <Text>
                {/*{description}*/}
              </Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.itemTitleView}>
              <Text style={styles.titleText}>AMENITIES</Text>
            </View>

          </View>
          <View style={styles.contentContainer}>
            <View style={styles.itemTitleView}>
              <Text style={styles.titleText}>INMOBILIARIA</Text>
            </View>
            <View style={styles.horizontalContainer}>
              <View style={{ flexDirection: "row" }}>
                <Text>Inmobiliaria fantasia   </Text>
                <MaterialIcons name="star" size={20} color="yellow" />
                  <Text>   4.3   </Text>
                <TouchableOpacity onPress={handleExperience}>
                  <MaterialIcons name="info" size={24} color={Theme.colors.clear.PRIMARY} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={[styles.blueButton]} onPress={handleContact}>
              <Text style={[styles.realStateText]}>Contactar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.blueButton]} onPress={handleReserve}>
              <Text style={[styles.realStateText]}>Reservar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  );
};

export default ViewPropertyScreenUI;

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
