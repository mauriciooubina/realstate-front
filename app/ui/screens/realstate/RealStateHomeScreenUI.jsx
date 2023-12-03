import Theme from "../../styles/Theme";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NavigatorConstants from "../../../navigation/NavigatorConstants";
import React, { useState, useEffect } from "react";
import propertiesWS from "../../../networking/api/endpoints/propertiesWS";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default RealStateHomeScreenUI = () => {
  const navigation = useNavigation();
  const [properties, setProperties] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const id = await AsyncStorage.getItem("realstateId");
      const response = await propertiesWS.getFromRealstate(id);
      setProperties(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchProperties();
    }, [])
  );

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleEditProperty = async (id) => {
    await AsyncStorage.setItem("propertyId", `${id}`);
    navigation.navigate(NavigatorConstants.REALSTATE_STACK.EDIT);
  };

  const handleViewProperty = async (id) => {
    await AsyncStorage.setItem("propertyId", `${id}`);
    navigation.navigate(NavigatorConstants.REALSTATE_STACK.VIEW);
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Theme.colors.clear.PRIMARY} />
        </View>
      ) : properties ? (
        properties.length > 0 ? (
          properties.map((property, index) => (
            <View key={index} style={styles.box}>
              <Pressable
                onPress={() => handleViewProperty(property.id)}
                style={styles.imageContainer}
              >
                <Image
                  source={{ uri: property?.additionaldetails?.urlPhoto1 }}
                  style={{ width: "100%", height: "100%" }}
                />
              </Pressable>
              <View style={styles.textContainer}>
                {
                  <Text style={styles.text}>
                    {property.address.floor === null &&
                    property.address.department === null
                      ? `${property.address.street} ${property.address.streetNumber}`
                      : `${property.address.street} ${property.address.streetNumber}, ${property.address.floor} ${property.address.department}`}
                  </Text>
                }

                <Text
                  style={styles.subtext}
                >{`${property.additionaldetails.state} - ${property.address.locality}`}</Text>
                <Text
                  style={styles.subtext}
                >{`${property.details.rooms} Amb`}</Text>
                <Text
                  style={styles.subtext}
                >{`$ ${property.additionaldetails.price}`}</Text>
              </View>
              <View style={styles.wrenchbox}>
                <TouchableOpacity
                  onPress={() => handleEditProperty(property.id)}
                >
                  <MaterialCommunityIcons
                    name="wrench"
                    size={15}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.loadingContainer}>
            <View style={styles.noPropertiesBox}>
              <View style={styles.noProperties}>
                <Text style={styles.title}>
                  Actualmente no tienes propiedades asociadas ¡Comienza creando
                  una!
                </Text>
              </View>
            </View>
          </View>
        )
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: "88%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c2c2c2",
    borderRadius: 8,
    flexDirection: "row",
    marginTop: "5%",
    height: "16%",
  },
  wrenchbox: {
    display: "flex",
    width: "10%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.clear.PRIMARY,
    borderRadius: 16,
    flexDirection: "row",
    marginRight: "3%",
  },
  text: {
    color: Theme.colors.clear.PRIMARY,
    fontSize: 16,
    fontWeight: "400",
  },
  subtext: {
    color: "black",
    fontSize: 15,
    fontWeight: "400",
  },
  textContainer: {
    flex: 1,
    display: "flex",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
  inmobTitle: {
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 15,
  },
  imageContainer: {
    backgroundColor: "white",
    width: "30%",
    height: "80%",
    marginLeft: "3%",
    marginRight: "3%",
    objectFit: "cover",
  },
  title: {
    fontWeight: "400",
    fontSize: 35,
    color: Theme.colors.clear.PRIMARY,
    textAlign: "center",
    lineHeight: 50,
  },
  subtitle: {
    fontWeight: "400",
    fontSize: 15,
    marginTop: "10%",
    textAlign: "center",
    lineHeight: 25,
  },
  noPropertiesBox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c2c2c2",
    borderRadius: 8,
    flexDirection: "row",
    marginTop: "5%",
  },
  noProperties: {
    justifyContent: "center",
    alignItems: "center",
  },
});
