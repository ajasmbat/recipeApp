import { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import AppButton from "./AppButton";
import AppText from "./AppText";
import CrossButton from "./CrossButton";
import uuid from "react-native-uuid";
import { storeData } from "../storage/MyRecipe";
import { BlurView } from "expo-blur";
function AppModal({
  isVisible,
  onClose,
  selectedItems,
  setItems,
  onSubmit,
  postIngredientsApi,
}) {
  const [isImageVisible, setImageVisible] = useState(false);
  const [isImageLoading, setImageLoading] = useState(false);

  const scrollViewRef = useRef(null);

  return (
    <>
      <Modal visible={isVisible} animationType="fade" transparent={true}>
        {isImageVisible ? (
          <TouchableWithoutFeedback onPress={() => setImageVisible(false)}>
            <BlurView
              blurType="dark"
              intensity={50}
              style={{
                position: "absolute",
                zIndex: 10,
                flex: 1,
                alignItems: "center",
                justifyContent: "center",

                width: "100%",
                height: "100%",
              }}
            >
              {isImageLoading ? (
                <ActivityIndicator
                  size="large"
                  color="black"
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    width: 300,
                    height: 300,
                  }}
                />
              ) : null}
              <Image
                source={{ uri: postIngredientsApi.data.image }}
                style={{ width: 300, height: 300 }}
                onLoadStart={() => setImageLoading(true)}
                onLoad={() => setImageLoading(false)}
              />
            </BlurView>
          </TouchableWithoutFeedback>
        ) : null}

        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {postIngredientsApi.data.length !== 0 ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 20,
                }}
              >
                <AppButton
                  title={"Close"}
                  onPress={() => {
                    postIngredientsApi.setData([]);
                  }}
                />
                <AppButton
                  title={"Save"}
                  onPress={() => {
                    storeData(postIngredientsApi.data);
                  }}
                />
                <ScrollView style={{ maxHeight: 400 }}>
                  <AppText>{postIngredientsApi.data.message}</AppText>
                </ScrollView>
                <TouchableOpacity
                  onPress={(onPress = () => setImageVisible(true))}
                >
                  <Image
                    source={{ uri: postIngredientsApi.data.image }}
                    style={styles.image}
                  />
                </TouchableOpacity>
              </View>
            ) : postIngredientsApi.loading ? (
              <ActivityIndicator
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                }}
                size="large"
                color="black"
              />
            ) : (
              <>
                <AppButton onPress={onClose} title="Go Back" />
                <ScrollView ref={scrollViewRef} style={{ maxHeight: 300 }}>
                  {selectedItems.map((item) => (
                    <View style={styles.textContainer} key={item.id}>
                      <AppText>{item.name}</AppText>
                      <CrossButton
                        onPress={() => {
                          const updatedData = selectedItems.filter(
                            (selectedItems) => selectedItems !== item
                          );
                          setItems(updatedData);
                        }}
                      />
                    </View>
                  ))}
                </ScrollView>
                <AppText moreStyles={{ fontSize: 16 }}>
                  Don't See Your Ingredient Add It Here
                </AppText>
                <TextInput
                  style={{
                    height: 40,
                    width: "80%",
                    borderColor: "gray",
                    borderWidth: 1,
                    marginBottom: 20,
                  }}
                  returnKeyType="done"
                  onSubmitEditing={(event) => {
                    if (event.nativeEvent.text) {
                      const newItem = {
                        id: uuid.v4(),
                        name: event.nativeEvent.text,
                      };
                      setItems([...selectedItems, newItem]);
                      event.target.clear();
                    }
                    setTimeout(() => {
                      if (scrollViewRef.current) {
                        const maxScrollOffset = 1000;
                        scrollViewRef.current.scrollTo({
                          x: 0,
                          y: maxScrollOffset,
                          animated: true,
                        });
                        console.log("done");
                      }
                    }, 100);
                  }}
                />

                <AppButton title={"Get Recipe"} onPress={onSubmit} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row", // Horizontal arrangement
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
    margin: 5, // Add some margin between items
    gap: 10,
  },
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

    borderRadius: 30,
    alignItems: "center",
  },
  image: {
    width: 190,
    height: 190,
    overflow: "hidden",
  },
});

export default AppModal;
