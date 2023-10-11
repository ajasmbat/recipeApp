import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

const storeData = async (data) => {
  try {
    const jsonData = data;

    const existingDataString = await AsyncStorage.getItem("data");
    let existingData = [];

    if (existingDataString) {
      existingData = JSON.parse(existingDataString);
    }

    const newData = {
      ...jsonData,
      key: uuid.v4(),
    };

    existingData.push(newData);
    console.log(existingData);

    await AsyncStorage.setItem("data", JSON.stringify(existingData));
  } catch (error) {
    console.error("Error saving JSON data:", error);
  }
};

const getData = async () => {
  try {
    const dataString = await AsyncStorage.getItem("data");
    if (dataString) {
      const data = JSON.parse(dataString);
      return data;
    }
  } catch (error) {
    console.error("Error retrieving JSON data:", error);
    return null;
  }
};
const deleteDataByKey = async (keyToDelete) => {
  try {
    const existingDataString = await AsyncStorage.getItem("data");

    if (existingDataString) {
      let existingData = JSON.parse(existingDataString);

      // Filter out the item to delete by key
      existingData = existingData.filter((item) => item.key !== keyToDelete);

      await AsyncStorage.setItem("data", JSON.stringify(existingData));
    }
  } catch (error) {
    console.error("Error deleting JSON data:", error);
  }
};

export { storeData, getData, deleteDataByKey };
