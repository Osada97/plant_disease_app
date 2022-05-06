import { View, StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import ProfileTopSection from "../components/ProfileTopSection";
import ProfileBottomSection from "../components/ProfileBottomSection";
import { useIsFocused } from "@react-navigation/native";
import GlobalStyles from "../utils/GlobalStyles";

const UserProfile = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const isFocused = useIsFocused();

  //if user is already login then hide login screen and view profile screen
  useLayoutEffect(() => {
    if (Object.keys(user.userDetails).length === 0) {
      navigation.navigate("login");
    }
  }, [user, isFocused]);
  return (
    <View style={styles.screen}>
      <ProfileTopSection />
      <ProfileBottomSection navigation={navigation} />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: GlobalStyles.backgroundColor,
    padding: 10,
  },
});
