import { View, StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import ProfileTopSection from "../components/ProfileTopSection";
import ProfileBottomSection from "../components/ProfileBottomSection";

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
    <View style={styles.screen}>
      <ProfileTopSection />
      <ProfileBottomSection />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
