import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import AllPostsScreen from "../screens/AllPostsScreen";
import CommunityPostDetails from "../screens/CommunityPostDetails";
import CommunityPostSetting from "../screens/CommunityPostSetting";
import UserStatus from "../utils/hook/UserStatus";

const Stack = createNativeStackNavigator();

const CommunityScreenNavigation = ({ navigation }) => {
  const { loadUserDetails } = UserStatus();

  useEffect(() => {
    navigation.addListener("focus", () => {
      loadUserDetails();
    });
  }, [navigation]);

  return (
    <Stack.Navigator
      initialRouteName="All Posts"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="All Posts" component={AllPostsScreen} />
      <Stack.Screen name="Post_Setting" component={CommunityPostSetting} />
      <Stack.Screen name="post_details" component={CommunityPostDetails} />
    </Stack.Navigator>
  );
};

export default CommunityScreenNavigation;
