import React, {useState} from "react";
import { StyleSheet, Modal, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import Theme from "../ui/styles/Theme";
import propertiesWS from "../networking/api/endpoints/propertiesWS";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigatorConstants from "../navigation/NavigatorConstants";
import { useNavigation } from '@react-navigation/native';

export default DeleteProperty = ({ closeDeleteProperty }) => {
  const navigation = useNavigation();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleDeleteProperty = async () => {
    setIsLoggingIn(true);
    try {
      const id = await AsyncStorage.getItem("propertyId");
      await propertiesWS.delete(id);
      navigation.navigate(NavigatorConstants.NAVIGATOR.REALSTATE);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.modalBackGround}>
        <View style={[styles.modalContainer]}>
          <Text style={styles.title}>
            ¿Está seguro que desea borrar la publicacion?
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.blueButton]}
              onPress={closeDeleteProperty}
            >
              <Text style={[styles.noText]}> NO </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.whiteButton]}
              onPress={handleDeleteProperty}
            >
              {isLoggingIn ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={[styles.siText]}> SI </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  blueButton: {
    flex: 1,
    backgroundColor: "#F6FF6",
    padding: 5,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    backgroundColor: Theme.colors.clear.PRIMARY,
    borderRadius: 30,
    justifyContent: "center",
    flexDirection: "row",
  },
  whiteButton: {
    flex: 1,
    padding: 5,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 30,
    justifyContent: "center",
    flexDirection: "row",
    borderColor: Theme.colors.clear.PRIMARY,
    borderWidth: 2.5,
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    height: "50%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    eleation: 20,
  },
  editCerrarSesion: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    color: Theme.colors.clear.PRIMARY,
  },
  title: {
    fontWeight: "400",
    fontSize: 35,
    color: Theme.colors.clear.PRIMARY,
    textAlign: "center",
    lineHeight: 50,
  },
  buttons: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 60,
  },
  noText: {
    color: "white",
    fontSize: 14,
  },
  siText: {
    color: Theme.colors.clear.PRIMARY,
    fontSize: 14,
  },
});
