import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CommunityScreen from "../screens/CommunityScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { faMessage, faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GlobalStyles from "../utils/GlobalStyles";

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          size = focused ? 25 : 23;

          if (route.name === "Home") {
            iconName = faLeaf;
          } else if (route.name === "Community") {
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
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
