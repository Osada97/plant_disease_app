import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PredictPlantDetails from "../screens/Admin/PredictPlantDetails";

const Stack = createNativeStackNavigator();

const EditPlantDetailsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="editPlantMenu" component={PredictPlantDetails} />
    </Stack.Navigator>
  );
};

export default EditPlantDetailsNavigation;
