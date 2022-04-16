import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import UserProfile from "../screens/UserProfile";
import UserStatus from "../utils/hook/UserStatus";
import { useDispatch, useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const ProfileScreenNavigation = ({ navigation }) => {
  const { loadUserDetails, checkIsLogged } = UserStatus();

  useEffect(() => {
    navigation.addListener("focus", () => {
      loadUserDetails();
    });
  }, [navigation]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile" component={UserProfile} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default ProfileScreenNavigation;
