import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";

const UserProfile = ({ navigation }) => {
  const user = useSelector((state) => state.user);

  //if user is already login then hide login screen and view profile screen
  useLayoutEffect(() => {
    console.log(Object.keys(user.userDetails).length);
    if (Object.keys(user.userDetails).length === 0) {
      navigation.navigate("login");
    }
  }, [user]);
  return (
    <View>
      <Text>UserProfile</Text>
    </View>
  );
};

export default UserProfile;
