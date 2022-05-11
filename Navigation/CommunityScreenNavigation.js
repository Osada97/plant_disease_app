import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPostsScreen from "../screens/AllPostsScreen";

const Stack = createNativeStackNavigator();

const CommunityScreenNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="All Posts"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="All Posts" component={AllPostsScreen} />
    </Stack.Navigator>
  );
};

export default CommunityScreenNavigation;
