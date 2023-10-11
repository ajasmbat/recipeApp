import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import MyRecipesScreen from "../screens/MyRecipesScreen";
import Colors from "../config/Colors";

function HomeNavigation(props) {
  const bottomTab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <bottomTab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 80,
          },
          tabBarBackground: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: Colors.black,
              }}
            ></View>
          ),
        }}
      >
        <bottomTab.Screen name="Home" component={HomeScreen} />
        <bottomTab.Screen
          name="My Recipes"
          component={MyRecipesScreen}
          options={({ navigation }) => ({
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={"red"}
                size={size}
              />
            ),
          })}
        />
      </bottomTab.Navigator>
    </NavigationContainer>
  );
}

export default HomeNavigation;
