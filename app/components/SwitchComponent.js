import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Switch } from "react-native";

const CustomSwitchComponent = ({ title, value=false, setFieldValue, name  }) => {
  return (
    <View style={styles.view}>
      {title && <Text style={styles.itemTitleText}>{title}</Text>}
      <Switch
        style={styles.switch}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={value ? "#365EEB" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={(value) => {
          setFieldValue(name, value);
        }}
        value={value}
        name={name}
      />
    </View>
  );
};

export default CustomSwitchComponent;

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    margin: 5,
  },
  itemTitleText: {
    textAlign: "left", // Alinea el texto a la izquierda
    fontSize: 16,
    marginVertical: 5,
  },
  switch: {
    marginRight: 5,
  },
});
