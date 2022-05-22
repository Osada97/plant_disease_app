import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useLayoutEffect } from "react";
import AddCommunityPost from "../screens/AddCommunityPost";
import AllPostsScreen from "../screens/AllPostsScreen";
import CommunityPostDetails from "../screens/CommunityPostDetails";
import CommunityPostSetting from "../screens/CommunityPostSetting";
import UserStatus from "../utils/hook/UserStatus";

const Stack = createNativeStackNavigator();

const CommunityScreenNavigation = ({ navigation, route }) => {
  const { loadUserDetails, loadAdminDetails } = UserStatus();

  useEffect(() => {
    navigation.addListener("focus", async () => {
      await loadUserDetails();
    });
  }, [navigation]);

  useLayoutEffect(() => {
    if (route.name !== "post_details") {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [route]);

  return (
    <Stack.Navigator
      initialRouteName="All Posts"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="All Posts" component={AllPostsScreen} />
      <Stack.Screen name="Post_Setting" component={CommunityPostSetting} />
      <Stack.Screen name="post_details" component={CommunityPostDetails} />
      <Stack.Screen name="add_post" component={AddCommunityPost} />
    </Stack.Navigator>
  );
};

export default CommunityScreenNavigation;
