import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PredictPlantScreen from "../screens/PredictPlantScreen";

const Stack = createNativeStackNavigator();

const HomeScreenNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PredictPlant" component={PredictPlantScreen} />
    </Stack.Navigator>
  );
};

export default HomeScreenNavigation;
