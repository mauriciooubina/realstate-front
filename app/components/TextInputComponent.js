import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

const CustomTextInput = ({ title, type, value, onChange, placeholder, customHeight, isDescription, textAlignVertical='center' }) => {
  return (
    <View style={styles.view}>
      {title && <Text style={styles.itemTitleText}>{title}</Text>}
      <TextInput
        style={[
          styles.textInput,
          isDescription && styles.customTextInput, // Aplica el estilo personalizado si esDescription es verdadero
          customHeight && { height: customHeight },,
        ]}
        onChangeText={onChange}
        value={value}
        keyboardType={type}
        placeholder={placeholder}
        ellipsizeMode="tail"
        multiline={true}
        textAlignVertical={textAlignVertical}
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
    height: 33, // Altura predeterminada para otros campos
    paddingLeft: 8,
  },
  customTextInput: {
    height: 300, // Altura específica para la descripción
  },
});