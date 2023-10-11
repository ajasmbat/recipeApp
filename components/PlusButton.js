import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../config/Colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";

function PlusButton({ onPress, color = "primary" }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: Colors[color] }]}
      onPress={onPress}
    >
      <MaterialCommunityIcons name="plus" size={70} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.danger,
    position: "absolute",
    right: 10,
    bottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});

export default PlusButton;
