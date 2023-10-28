import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const DropdownComponent = ({ title }) => {
  const [value, setValue] = useState(null);
  console.log({ title });
  return (
    <View style={styles.itemTitleView}>
      {title && <Text style={styles.itemTitleText}>{title}</Text>}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Item"
        searchPlaceholder="Search..."
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 5,
    borderBottomColor: "#365EEB",
    borderBottomWidth: 0.6,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  itemTitleView: {
    display: "flex",
    // alignItems: "flex-start", // Alinea a la izquierda
    // width: "100%",
    flexGrow: 1,
    //width: "100%",
  },
  itemTitleText: {
    textAlign: "left", // Alinea el texto a la izquierda
    fontSize: 15,
    margin: 5,
  },
});