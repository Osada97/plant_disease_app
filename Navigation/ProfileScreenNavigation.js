import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import UserProfile from "../screens/UserProfile";
import UserStatus from "../utils/hook/UserStatus";
import { useDispatch, useSelector } from "react-redux";
import UserPostsScreen from "../screens/UserPostsScreen";
import ProfileSettingsScreen from "../screens/ProfileSettingsScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import PostScreen from "../screens/PostScreen";

const Stack = createNativeStackNavigator();

const ProfileScreenNavigation = ({ navigation }) => {
  const { loadUserDetails } = UserStatus();

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
      <Stack.Screen name="userPosts" component={UserPostsScreen} />
      <Stack.Screen name="post" component={PostScreen} />
      <Stack.Screen name="userSettings" component={ProfileSettingsScreen} />
      <Stack.Screen name="changePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
};

export default ProfileScreenNavigation;
