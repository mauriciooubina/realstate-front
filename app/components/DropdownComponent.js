import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const DropdownComponent = ({ title, value = null, onChange, name, data = [] }) => {
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
        placeholder={"Seleccione " + title}
        searchPlaceholder="Search..."
        value={value}
        name={name}
        onChange={(selectedValue) => {
          onChange(name, selectedValue);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "#F6F6F6",
    marginBottom: 5,
    borderRadius: 10,
    borderWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 13,
    marginLeft: 8,
  },
  selectedTextStyle: {
    fontSize: 13,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 13,
  },
  itemTitleView: {
    display: "flex",
    flexGrow: 1,
  },
  itemTitleText: {
    textAlign: "left",
    fontSize: 15,
    margin: 5,
  },
});
