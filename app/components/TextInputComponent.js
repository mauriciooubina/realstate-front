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
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexGrow: 1,
    marginLeft: 2,
  },
  itemTitleText: {
    textAlign: "left",
    fontSize: 16,
    marginVertical: 5,
    marginLeft: 1,
  },
  textInput: {
    backgroundColor: "#F6F6F6",
    marginBottom: 5,
    borderRadius: 10,
    borderWidth: 0.5,
    height: 33,
    paddingLeft: 8,
  },
});
