import React from "react";
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
    flexGrow: 1,
    marginLeft: 5,
  },
  itemTitleText: {
    textAlign: "left",
    fontSize: 16,
    marginVertical: 5,
  },
  textInput: {
    paddingVertical: 10,
  },
});
