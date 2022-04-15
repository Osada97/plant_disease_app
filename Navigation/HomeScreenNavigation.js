import React, { useLayoutEffect, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PredictPlantScreen from "../screens/PredictPlantScreen";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../actions/setUserDetails";

const Stack = createNativeStackNavigator();

const HomeScreenNavigation = ({ navigation, route }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserDetails());
  }, [route]);

  useLayoutEffect(() => {
    if (route.name !== "PlantDetails") {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [route]);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="PredictPlant"
        component={PredictPlantScreen}
        options={{
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreenNavigation;
