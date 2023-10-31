import React from "react";
import { StyleSheet, Modal, Text, View, TouchableOpacity } from "react-native";
import Theme from "../ui/styles/Theme";
import realstateWS from '../networking/api/endpoints/realstateWS';

export default DeleteAccount = ({ closeDeleteAccount }) => {
  
  const handleDeleteAccount = async () => {
    console.log('Delete account');
    try {
      const response = await realstateWS.delete(id);
      navigation.navigate(NavigatorConstants.NAVIGATOR.REALSTATE);
    } catch (error) {
      console.log(error);
    }
  }

  return (
  <Modal
    animationType="slide"
    transparent={true}
  >
    <View style={styles.modalBackGround}>
      <View style={[styles.modalContainer]}>
        <Text style={styles.title}>
          ¿Está seguro que desea borrar su cuenta?
        </Text>
        <Text style={styles.subtitle}>
          Recuerde que se perderá toda información vinculada a dicha cuenta
        </Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.blueButton]} onPress={closeDeleteAccount}  >
            <Text style={[styles.noText]}> NO </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.whiteButton]} onPress={handleDeleteAccount} >
            <Text style={[styles.siText]}> SI </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
  );
};

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
