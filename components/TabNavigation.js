import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { faMessage, faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GlobalStyles from "../utils/GlobalStyles";
import HomeScreenNavigation from "../Navigation/HomeScreenNavigation";
import CommunityScreenNavigation from "../Navigation/CommunityScreenNavigation";
import ProfileScreenNavigation from "../Navigation/ProfileScreenNavigation";

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          size = focused ? 25 : 23;

          if (route.name === "HomeNavigation") {
            iconName = faLeaf;
          } else if (route.name === "CommunityNavigation") {
            iconName = faMessage;
          } else {
            iconName = faCircleUser;
          }
          return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
        },

        headerShown: false,
        tabBarActiveTintColor: GlobalStyles.mainColor,
        tabBarInactiveTintColor: "#c0cfcc",
        tabBarLabelStyle: {
          fontSize: 13,
        },
        tabBarStyle: { height: 58, padding: 10 },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="HomeNavigation"
        component={HomeScreenNavigation}
        options={{ title: "Your Crops" }}
      />
      <Tab.Screen
        name="CommunityNavigation"
        component={CommunityScreenNavigation}
        options={{ title: "Community" }}
      />
      <Tab.Screen
        name="ProfileNavigation"
        component={ProfileScreenNavigation}
        options={{ title: "You" }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
