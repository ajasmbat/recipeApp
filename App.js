import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import HomeNavigation from "./navigation/HomeNavigation";
import Colors from "./config/Colors";

export default function App() {
  return (
    <View style={styles.container}>
      <HomeNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 80,
  },
});
