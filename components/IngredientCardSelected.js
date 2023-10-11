import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../config/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function IngredientCardSelected(props) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="check" color={Colors.white} size={100} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: 190,
    height: 190,
    margin: 10,
    backgroundColor: Colors.transparentGreen,
    zIndex: 3,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default IngredientCardSelected;
