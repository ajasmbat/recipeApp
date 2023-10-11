import React, { useState, useEffect } from "react";
import { Image } from "expo-image";
import { View, StyleSheet, Animated } from "react-native";
import AppText from "./AppText";

import baseURL from "../config/Networking";

import Colors from "../config/Colors";

function IngredientCard({ Ingredient }) {
  //onLoadEnd prop for load affect
  const [isImageLoading, setImageLoading] = useState(false);

  return (
    <View style={styles.card}>
      <>
        <Image source={baseURL + Ingredient.image} style={styles.image} />
        <AppText moreStyles={styles.text}>{Ingredient.name}</AppText>
      </>
    </View>
  );
}

const borderRadius = 20;

const styles = StyleSheet.create({
  card: {
    width: 190,
    height: 190,
    gap: 10,
    margin: 10,
    backgroundColor: Colors.medium,
    textAlign: "center",
    alignItems: "center",
    borderRadius: borderRadius,
  },
  image: {
    width: "100%",
    height: "80%",
    overflow: "hidden",
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
  },
  text: {
    paddingBottom: 20,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  load: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    borderRadius: borderRadius,
  },
});

export default IngredientCard;
