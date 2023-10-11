import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../config/Colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";

function CrossButton({ onPress, color = "danger" }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: Colors[color] }]}
      onPress={onPress}
    >
      <MaterialCommunityIcons name="delete" size={40} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.danger,
    borderRadius: 10,
  },
});

export default CrossButton;
