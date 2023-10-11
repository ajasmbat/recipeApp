import React from "react";
import { Text, StyleSheet } from "react-native";
import colors from "../config/Colors";

function AppText({ moreStyles, children }) {
  return <Text style={[styles.text, moreStyles]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default AppText;
