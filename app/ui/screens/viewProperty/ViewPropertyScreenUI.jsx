import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Share,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import CustomTextInput from "../../../components/TextInputComponent";
import CustomSwitchComponent from "../../../components/SwitchComponent";
import DropdownComponent from "../../../components/DropdownComponent";
import { Formik } from "formik";
import Theme from "../../styles/Theme";
import * as ImagePicker from "expo-image-picker";
import propertiesWS from "../../../networking/api/endpoints/propertiesWS";
import realstateWS from "../../../networking/api/endpoints/realstateWS";
import DeleteProperty from "../../../components/DeleteProperty";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigatorConstants from "../../../navigation/NavigatorConstants";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
  FontAwesome,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";

const ViewPropertyScreenUI = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [pictureIndex, setPictureIndex] = useState(0);
  const [property, setProperty] = useState();
  const [realStateId, setRealStateId] = useState();
  const [realStateData, setRealStateData] = useState();
  const { additionaldetails, address, details } = property || {};

  const [pictures, setPictures] = useState([]);

  const fetchPropertyData = async () => {
    try {
      const id = await AsyncStorage.getItem("propertyId");
      const realStateId = await AsyncStorage.getItem("realstateId");
      setRealStateId(realStateId);
      const response = await propertiesWS.get(id);
      setProperty(response.data[0]);
      const contactId = response.data[0].realStateId.id;
      await AsyncStorage.setItem('contactId', `${contactId}`);
      const res = await realstateWS.get(response.data[0].realStateId.id);
      setRealStateData(res.data[0])
      setPictures([
        response.data[0].additionaldetails?.urlPhoto1,
        response.data[0].additionaldetails?.urlPhoto2,
        response.data[0].additionaldetails?.urlPhoto3,
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchPropertyData();
  }, []);

  const handleContact = async () => {
    await AsyncStorage.setItem('contactId', `${property.realStateId.id}`);
    navigation.navigate(NavigatorConstants.USER_STACK.CONTACT);
  };

  const handleReserve = () => {
    navigation.navigate(NavigatorConstants.USER_STACK.RESERVE);
  };

  const handleExperience = () => {
    if(realStateId){
      navigation.navigate(NavigatorConstants.REALSTATE_STACK.EXPERIENCE);
    } else{
      navigation.navigate(NavigatorConstants.USER_STACK.EXPERIENCE);
    }
  };

  const handleFavs = () => {
    navigation.navigate(NavigatorConstants.USER_STACK.HOME_FAV);
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Theme.colors.clear.BLACK} />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {!realStateId && (
          <View
            style={[
              styles.horizontalContainer,
              {
                justifyContent: "flex-start",
              },
            ]}
          >
            <Pressable
              style={{
                borderRadius: 20,
                backgroundColor: Theme.colors.clear.SECONDARY,
                padding: 5,
                marginBottom: 5,
              }}
              onPress={handleShare}
            >
              <AntDesign
                name="sharealt"
                size={24}
                color={Theme.colors.clear.BLACK}
              />
            </Pressable>
            <Pressable
              style={{
                borderRadius: 20,
                backgroundColor: Theme.colors.clear.SECONDARY,
                padding: 5,
                marginBottom: 5,
                marginLeft: 5,
              }}
              onPress={handleFavs}
            >
              <MaterialCommunityIcons name="star" size={24} color={"#F6BE00"} />
            </Pressable>
          </View>
        )}
        {!pictures[pictureIndex] ? (
          <View style={styles.pictureView}>
            <Image
              style={styles.addIcon}
              source={require("../../../../assets/images/add_image.png")}
            />
            {pictureIndex > 0 && pictures.length > 0 && (
              <Pressable
                onPress={() => setPictureIndex(pictureIndex - 1)}
                style={styles.arrowLeft}
              >
                <Text style={{ color: "white" }}>➜</Text>
              </Pressable>
            )}
            {pictureIndex < 2 && pictures.length > 0 && (
              <Pressable
                onPress={() => setPictureIndex(pictureIndex + 1)}
                style={styles.arrowRight}
              >
                <Text style={{ color: "white" }}>➜</Text>
              </Pressable>
            )}
          </View>
        ) : (
          <View style={styles.selectedPictureView}>
            <Image
              style={styles.picture}
              source={{ uri: pictures[pictureIndex] }}
            />
            {pictureIndex > 0 && (
              <Pressable
                onPress={() => setPictureIndex(pictureIndex - 1)}
                style={styles.arrowLeft}
              >
                <Text style={{ color: "white" }}>➜</Text>
              </Pressable>
            )}
            {pictureIndex < 2 && (
              <Pressable
                onPress={() => setPictureIndex(pictureIndex + 1)}
                style={styles.arrowRight}
              >
                <Text style={{ color: "white" }}>➜</Text>
              </Pressable>
            )}
          </View>
        )}
        <View style={styles.picBotBar}>
          {pictures.map((picture, index) => {
            return (
              <Text
                key={index}
                style={index === pictureIndex ? styles.selectedDot : styles.dot}
              >
                •
              </Text>
            );
          })}
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.itemTitleView}>
            <Text style={styles.titleText}>ALQUILER - DEPARTAMENTO</Text>
          </View>

          <View
            style={[
              styles.horizontalContainer,
              { justifyContent: "flex-start", paddingVertical: 10,marginLeft:7 },
            ]}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{`$${
              additionaldetails ? additionaldetails?.price : "0"
            } + `}</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{`$${
              additionaldetails ? additionaldetails?.expensePrice : "0"
            } `}</Text>
          </View>

          <View
            style={[
              styles.horizontalContainer,
              {
                justifyContent: "flex-start",
                flexWrap: "wrap",
                alignContent: "space-between",
                marginLeft:7,
              },
            ]}
          >
            {/* Metros totales */}
            {details && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingRight: 20,
                }}
              >
                <MaterialCommunityIcons
                  name="ruler"
                  size={24}
                  color={Theme.colors.clear.BLACK}
                />
                <Text>
                  M2 Total{" "}
                  {parseInt(details?.coveredMeters) +
                    parseInt(details?.semiUncoveredMeters) / 2}
                </Text>
              </View>
            )}

            {/* cubiertos */}
            {details?.coveredMeters > "0" && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingRight: 20,
                }}
              >
                <MaterialCommunityIcons
                  name="resize"
                  size={24}
                  color={Theme.colors.clear.BLACK}
                />
                <Text style={{ paddingLeft: 5 }}>
                  M2 Cubiertos: {details?.coveredMeters}
                </Text>
              </View>
            )}

            {/* Descubiertos */}
            {details?.uncoveredMeters > "0" && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingRight: 20,
                }}
              >
                <Feather
                  name="sun"
                  size={24}
                  color={Theme.colors.clear.BLACK}
                />
                <Text style={{ paddingLeft: 5 }} t>
                  M2 Descubiertos: {details?.uncoveredMeters}
                </Text>
              </View>
            )}

            {/* Semicubiertos */}
            {details?.semiUncoveredMeters > "0" && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingRight: 20,
                }}
              >
                <FontAwesome5
                  name="umbrella-beach"
                  size={24}
                  color={Theme.colors.clear.BLACK}
                />
                <Text style={{ paddingLeft: 5 }}>
                  M2 Semicubiertos: {details?.semiUncoveredMeters}
                </Text>
              </View>
            )}

            {/* Ambientes */}
            {details?.rooms > "0" && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingRight: 20,
                }}
              >
                <MaterialCommunityIcons
                  name="door-open"
                  size={24}
                  color={Theme.colors.clear.BLACK}
                />
                <Text style={{ paddingLeft: 5 }}>
                  Ambientes: {details?.rooms}
                </Text>
              </View>
            )}

            {/* Baños*/}
            {details?.bathrooms > "0" && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingRight: 20,
                }}
              >
                <MaterialCommunityIcons
                  name="bathtub"
                  size={24}
                  color={Theme.colors.clear.BLACK}
                />
                <Text style={{ paddingLeft: 5 }}>
                  Baños: {details?.bathrooms}
                </Text>
              </View>
            )}
            {/* Dormitorios*/}
            {details?.rooms > "0" && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingRight: 20,
                }}
              >
                <MaterialCommunityIcons
                  name="bed-outline"
                  size={24}
                  color={Theme.colors.clear.BLACK}
                />
                <Text style={{ paddingLeft: 5 }}>
                  Dormitorios: {details?.rooms - details?.bathrooms}
                </Text>
              </View>
            )}
            {/* Antiguedad*/}
            {details?.howOld > "0" && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingRight: 20,
                }}
              >
                <MaterialCommunityIcons
                  name="calendar"
                  size={24}
                  color={Theme.colors.clear.BLACK}
                />
                <Text style={{ paddingLeft: 5 }}>
                  Antiguedad: {details?.howOld}
                </Text>
              </View>
            )}
            {/* Balcon */}
            {details?.balcony === "Yes" && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingRight: 20,
                }}
              >
                <MaterialCommunityIcons
                  name="balcony"
                  size={24}
                  color={Theme.colors.clear.BLACK}
                />
                <Text style={{ paddingLeft: 5 }}>Balcon</Text>
              </View>
            )}
            {/* Terraza */}
            {details?.terrace === "Yes" && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingRight: 20,
                }}
              >
                <AntDesign
                  name="totop"
                  size={24}
                  color={Theme.colors.clear.BLACK}
                />
                <Text style={{ paddingLeft: 5 }}>Terraza</Text>
              </View>
            )}
            {/* Trunk*/}
            {details?.trunk === "Yes" && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingRight: 20,
                }}
              >
                <MaterialCommunityIcons
                  name="treasure-chest"
                  size={24}
                  color={Theme.colors.clear.BLACK}
                />
                <Text style={{ paddingLeft: 5 }}>
                  Baulera: {details?.trunk}
                </Text>
              </View>
            )}
            {/*garage*/}
            {details?.garage > "0" && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingRight: 20,
                }}
              >
                <MaterialCommunityIcons
                  name="car"
                  size={24}
                  color={Theme.colors.clear.BLACK}
                />
                <Text style={{ paddingLeft: 5 }}>
                  Garage: {details?.garage}
                </Text>
              </View>
            )}
            {/*Orientacion*/}
            {details?.orientation !== "" && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingRight: 20,
                }}
              >
                <Entypo
                  name="compass"
                  size={24}
                  color={Theme.colors.clear.BLACK}
                />
                <Text style={{ paddingLeft: 5 }}>
                  Orientacion: {details?.orientation}
                </Text>
              </View>
            )}
            {/*Tipo de propiedad*/}
            {details?.propertyType !== "" && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingRight: 20,
                }}
              >
                <MaterialIcons
                  name="house"
                  size={24}
                  color={Theme.colors.clear.BLACK}
                />
                <Text style={{ paddingLeft: 5 }}>
                  Tipo: {details?.propertyType}
                </Text>
              </View>
            )}
            {/*Frente*/}
            {details?.front !== "" && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingRight: 20,
                }}
              >
                <FontAwesome5
                  name="tree"
                  size={24}
                  color={Theme.colors.clear.BLACK}
                />
                <Text style={{ paddingLeft: 5 }}>Frente: {details?.front}</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.itemTitleView}>
            <Text style={styles.titleText}>DESCRIPCION</Text>
          </View>
          <View style={{marginLeft:7}}>
            <Text>{additionaldetails?.description}</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.itemTitleView}>
            <Text style={styles.titleText}>AMENITIES</Text>
          </View>
          <View style={{marginLeft:7}}>
            {additionaldetails?.amenities.map((amenity, index) => {
              return (
                <View
                  style={{ flexDirection: "row", alignItems: "center" }}
                  key={index}
                >
                  <FontAwesome
                    name="check-circle-o"
                    size={24}
                    color={Theme.colors.clear.SECONDARY}
                  />
                  <Text style={{ paddingLeft: 5 }}>{amenity}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={[styles.contentContainer, { marginBottom: 30 }]}>
          <View style={styles.itemTitleView}>
            <Text style={styles.titleText}>INMOBILIARIA</Text>
          </View>
          <View style={[styles.horizontalContainer]}>
            <Text style={{marginLeft:7}}>{realStateData.fantasyName}</Text>
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons name="star" size={22} color="#F6BE00" />
              <Text style={{fontSize: 16}}> {!realStateData.qualification ? 0 : realStateData.qualification}</Text>
              <TouchableOpacity style={{marginLeft:4}} onPress={handleExperience}>
                <MaterialIcons
                  name="info"
                  size={22}
                  color={Theme.colors.clear.PRIMARY}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {!realStateId && (
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.blueButton]}
              onPress={handleContact}>
              <Text style={[styles.realStateText]}>Contactar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.blueButton]}
              onPress={handleReserve}>
              <Text style={[styles.realStateText]}>Reservar </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
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
    objectFit: "cover",
    height: 225,
    width: "98%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  selectedPictureView: {
    display: "flex",
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 20,
    paddingBottom: 10,
  },
  blueButton: {
    backgroundColor: "#F6F6F6",
    padding: 10,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    backgroundColor: Theme.colors.clear.PRIMARY,
    borderRadius: 40,
  },
  arrowRight: {
    fontSize: 20,
    position: "absolute",
    top: "50%",
    right: "5%",
    color: "white",
    backgroundColor: "#47A7FF",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  dot: {
    fontSize: 40,
    color: "white",
    opacity: 0.5,
    paddingHorizontal: 10,
  },
  selectedDot: {
    fontSize: 40,
    color: "white",
    paddingHorizontal: 10,
    // opacity: 0
  },
  arrowLeft: {
    fontSize: 20,
    position: "absolute",
    top: "50%",
    left: "5%",
    color: "white",
    backgroundColor: "#47A7FF",
    borderRadius: 10,
    paddingHorizontal: 5,
    transform: [{ scaleX: -1 }],
  },
  deleteButton: {
    flexDirection: "row",
    marginBottom: 200,
    marginTop: 20,
    justifyContent: "center",
  },
  redButton: {
    backgroundColor: "#F6F6F6",
    padding: 10,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    backgroundColor: Theme.colors.clear.ALERT,
    borderRadius: 40,
  },
  realStateText: {
    color: "white",
    fontSize: 14,
  },
});
