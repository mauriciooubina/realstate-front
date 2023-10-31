import React, { useState } from "react";
import Theme from "../../app/ui/styles/Theme";
import {
  StyleSheet,
  Modal,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Rating } from "react-native-stock-star-rating";
import DeleteAccount from "./DeleteAccount";
import loginWS from "../networking/api/endpoints/loginWS";
import NavigatorConstants from "../navigation/NavigatorConstants";
import { useNavigation } from '@react-navigation/native';

export default function BurgerModal({ onClose }) {
  const navigation = useNavigation();
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const openDeleteAccount = () => {
    setShowDeleteAccount(true);
  };

  const closeDeleteAccount = () => {
    setShowDeleteAccount(false);
  };

  const handleLogout = async () => {
    try {
      const response = await loginWS.logout();
      navigation.navigate(NavigatorConstants.NAVIGATOR.LOGIN);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProfile = () => {
    navigation.navigate(NavigatorConstants.REALSTATE_STACK.EDIT_PROFILE);
  };

  return (
    <Modal animationType="slide-from-left" transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modal2BackGround}>
          <View style={[styles.modal2Container]}>
            <View style={styles.inmobTitleBox}>
              <Text style={styles.inmobTitle}>Inmobiliaria Atilio</Text>
              <View style={styles.stars}>
                <Rating maxStars={5} size={30} stars={3} />
              </View>
            </View>
            <TouchableOpacity onPress={handleEditProfile}>
              <View style={styles.editBox}>
                <View>
                  <SimpleLineIcons name="note" size={20} color={Theme.colors.clear.PRIMARY} marginLeft={17} />
                </View>
                <Text style={styles.editTitle}>Editar datos</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.editBox2}>
                <MaterialCommunityIcons
                  name="logout"
                  size={24}
                  color={Theme.colors.clear.PRIMARY}
                  marginLeft={15}/>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.editCerrarSesion}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={openDeleteAccount}>
              <View style={styles.editBox}>
                <View>
                  <Ionicons
                    name="md-trash-sharp"
                    size={24}
                    color="red"
                    marginLeft={15}
                  />
                </View>
                <Text style={styles.editBorrarCuenta}> Borrar cuenta </Text>
              </View>
            </TouchableOpacity>
          </View>
          {showDeleteAccount && (
            <DeleteAccount closeDeleteAccount={closeDeleteAccount} />
          )}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  blueContainer: {
    width: "100%",
    height: "40%",

    justifyContent: "left",
    alignItems: "center",
    backgroundColor: "#47A7FF",
    flexDirection: "row",
    marginTop: "0%",
    marginBottom: "0%",
  },

  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  homeText: {
    color: "white",
    fontSize: 25,
    marginLeft: 100,
  },

  burger: {
    marginLeft: 20,
  },

  plus: {
    marginLeft: 110,
  },

  stars: {
    marginBottom: 20,
    marginLeft: 15,
  },
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
    height: "60%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    eleation: 20,
  },

  modal2Container: {
    width: "60%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    eleation: 20,
  },

  modal2BackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "left",
  },

  inmobTitle: {
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 15,
  },

  inmobTitleBox: {
    borderColor: "grey",
    borderWidth: 0.5,
    width: "100%",
    marginLeft: 0,
    marginTop: 40,
  },

  editTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    color: Theme.colors.clear.PRIMARY,
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

  editBorrarCuenta: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    color: "red",
  },

  editBox: {
    borderColor: "grey",
    borderWidth: 0.5,
    width: "100%",
    marginLeft: 0,
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
  },

  editBox2: {
    borderColor: "grey",
    borderWidth: 0.5,
    width: "100%",
    marginLeft: 0,
    marginTop: 315,
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
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
