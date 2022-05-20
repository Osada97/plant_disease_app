import React, { useEffect, useLayoutEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import UserProfile from "../screens/UserProfile";
import UserStatus from "../utils/hook/UserStatus";
import UserPostsScreen from "../screens/UserPostsScreen";
import ProfileSettingsScreen from "../screens/ProfileSettingsScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import PostScreen from "../screens/PostScreen";
import PostSettingScreen from "../screens/PostSettingScreen";
import AddPostScreen from "../screens/AddPostScreen";
import AdminProfileScreen from "../screens/Admin/AdminProfileScreen";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const ProfileScreenNavigation = ({ route, navigation }) => {
  const { loadUserDetails } = UserStatus();
  const userStatus = useSelector((state) => state.userIsLoggedIn);
  const adminStatus = useSelector((state) => state.adminIsLoggedIn);

  useEffect(() => {
    navigation.addListener("focus", async () => {
      await loadUserDetails(); //load details
    });
  }, [navigation]);

  useLayoutEffect(() => {
    if (route.name !== "post") {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [route]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!userStatus && adminStatus ? (
        <>
          {/* admin */}
          <Stack.Screen name="adminProfile" component={AdminProfileScreen} />
        </>
      ) : !userStatus ? (
        <>
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="signUp" component={SignUpScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="profile" component={UserProfile} />
          <Stack.Screen name="userPosts" component={UserPostsScreen} />
          <Stack.Screen name="post" component={PostScreen} />
          <Stack.Screen name="postSetting" component={PostSettingScreen} />
          <Stack.Screen name="postAdd" component={AddPostScreen} />
          <Stack.Screen name="userSettings" component={ProfileSettingsScreen} />
          <Stack.Screen
            name="changePassword"
            component={ChangePasswordScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ProfileScreenNavigation;
