import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

const CustomTextInput = ({ title, type, value, onChange, placeholder }) => {
  return (
    <View style={styles.view}>
      {title && <Text style={styles.itemTitleText}>{title}</Text>}
      <TextInput
        style={styles.textInput}
        onChangeText={onChange}
        value={value}
        keyboardType={type}
        placeholder={placeholder}
        underlineColorAndroid={"#365EEB"}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  view: {
    display: "flex",
    //width: "100%",
    flexGrow: 1,
    marginLeft: 5,
  },
  itemTitleText: {
    textAlign: "left", // Alinea el texto a la izquierda
    fontSize: 16,
    marginVertical: 5,
  },
  textInput: {
    paddingVertical: 10,
    // paddingHorizontal: 5,
  },
});
