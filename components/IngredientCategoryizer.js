import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import AppText from "./AppText";
import AppButton from "./AppButton";

function IngredientCategoryizer({ data, onPress }) {
  const allCategory = {
    id: 0,
    name: "All",
  };
  data = [...data, allCategory];
  data.sort((a, b) => a.id - b.id);
  return (
    <View style={styles.cont}>
      <FlatList
        data={data}
        horizontal={true}
        keyExtractor={(data) => data.id.toString()}
        renderItem={({ item }) => (
          <AppButton title={item.name} onPress={() => onPress(item.id)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cont: { marginBottom: 10, height: 80, marginLeft: 10 },
});

export default IngredientCategoryizer;
