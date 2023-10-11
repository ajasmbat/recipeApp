import React from "react";
import { Modal, StyleSheet, View, ScrollView, Image } from "react-native";
import AppText from "./AppText";
import AppButton from "./AppButton";
import { deleteDataByKey } from "../storage/MyRecipe";

function RecipeModal({ isVisible, data, onClose }) {
  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{ flexDirection: "row" }}>
            <AppButton title={"Close"} onPress={onClose} />
            <AppButton
              title={"Delete"}
              onPress={() => {
                deleteDataByKey(data.key);
              }}
            />
          </View>

          <ScrollView style={{ maxHeight: 400 }}>
            <AppText>{data.message}</AppText>
          </ScrollView>
          <Image source={{ uri: data.image }} style={styles.image} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Translucent background
  },
  modalContent: {
    width: "90%", // Adjust the width as needed
    height: 700,
    backgroundColor: "white",
    padding: 20,
    gap: 20,
    borderRadius: 30,
    alignItems: "center",
  },
  image: {
    width: 190,
    height: 190,
    overflow: "hidden",
  },
});

export default RecipeModal;
