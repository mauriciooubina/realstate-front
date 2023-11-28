import React, {useState} from "react";
import { StyleSheet, Modal, Text, View, TouchableOpacity, Image } from "react-native";
import Theme from "../ui/styles/Theme";
import Mail from '../../assets/images/mail.png';
import NavigatorConstants from "../navigation/NavigatorConstants";
import { useNavigation } from '@react-navigation/native';

export default SendModal = ({ closeSend }) => {
  const navigation = useNavigation();

  const handleHome = async () => {
    closeSend;
    navigation.navigate(NavigatorConstants.REALSTATE_STACK.HOME);
  };

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.modalBackGround}>
        <View style={[styles.modalContainer]}>
          <Text style={styles.title}>
            Consulta enviada con éxito!
          </Text>
          <View style={{alignItems:'center', marginTop:10}}>
                <Image source={Mail}  style={styles.imageMail}></Image>
            </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.blueButton]}
              onPress={handleHome}>
              <Text style={[styles.noText]}> INICIO </Text>
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
    marginTop: 30,
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
