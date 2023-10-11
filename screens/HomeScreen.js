import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";

import { getCategories, getIngredients } from "../api/getRequests";
import { postIngredients } from "../api/postRequest";

import IngredientCard from "../components/IngredientCard";
import Colors from "../config/Colors";
import IngredientCardSelected from "../components/IngredientCardSelected";
import IngredientCategoryizer from "../components/IngredientCategoryizer";
import useApi from "../hooks/useApi";
import PlusButton from "../components/PlusButton";
import AppModal from "../components/AppModal";

function HomeScreen(props) {
  const [filterDate, setfilterData] = useState(null);
  const [selectedData, setselectedData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const getIngredientsApi = useApi(getIngredients);
  const getCategoriesApi = useApi(getCategories);
  const postIngredientsApi = useApi(postIngredients);

  useEffect(() => {
    getIngredientsApi.request();
    getCategoriesApi.request();
  }, []);

  const handlePressSelection = (item) => {
    const isSelected = selectedData.includes(item);
    if (isSelected) {
      const updatedData = selectedData.filter(
        (selectedItem) => selectedItem !== item
      );
      setselectedData(updatedData);
    } else {
      setselectedData([...selectedData, item]);
    }
  };

  const handlePressCategories = (id) => {
    if (id !== 0) {
      const filtered = getIngredientsApi.data.filter(
        (item) => item.subCategory === id
      );
      setfilterData(filtered);
    } else {
      setfilterData(null);
    }
  };

  return (
    <View style={styles.screen}>
      <IngredientCategoryizer
        data={getCategoriesApi.data}
        onPress={handlePressCategories}
      />
      <FlatList
        style={styles.list}
        data={filterDate ? filterDate : getIngredientsApi.data}
        keyExtractor={(data) => data.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              handlePressSelection(item);
            }}
          >
            {selectedData.includes(item) ? <IngredientCardSelected /> : null}
            <IngredientCard Ingredient={item} key={item.id} />
          </TouchableOpacity>
        )}
      />
      <PlusButton
        onPress={() => {
          setIsVisible(true);
        }}
      />
      <AppModal
        isVisible={isVisible}
        onClose={() => {
          setIsVisible(false);
        }}
        selectedItems={selectedData}
        style={styles.modal}
        setItems={setselectedData}
        postIngredientsApi={postIngredientsApi}
        onSubmit={() =>
          postIngredientsApi.request(JSON.stringify(selectedData))
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    flex: 1,
  },
  modal: {
    position: "absolute",
    bottom: 0, // Adjust this value to control the vertical position
    left: 0,
    right: 0,
    height: 200, // Adjust the height of the modal as needed
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    zIndex: 10, // Ensure the modal appears above other content
  },
});

export default HomeScreen;
