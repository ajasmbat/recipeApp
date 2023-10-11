import React from "react";
import { useEffect, useState } from "react";

import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getData, deleteDataByKey } from "../storage/MyRecipe";
import AppText from "../components/AppText";
import Colors from "../config/Colors";
import RecipeModal from "../components/RecipeModal";

function MyRecipesScreen(props) {
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedData, setselectedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.background,
      }}
    >
      <ScrollView style={styles.main}>
        {data.map((item) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => {
              setselectedData(item);
              setIsVisible(true);
            }}
          >
            <View style={styles.cont}>
              <AppText>{item.title}</AppText>
              <Image source={{ uri: item.image }} style={styles.image} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <RecipeModal
        isVisible={isVisible}
        data={selectedData}
        onClose={() => {
          setIsVisible(false);
          setselectedData([]);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: Colors.medium,
    padding: 10,
  },
  image: {
    width: 90,
    height: 90,
    overflow: "hidden",
  },
});

export default MyRecipesScreen;
