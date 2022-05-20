import { View, StyleSheet } from "react-native";
import ProfileTopSection from "../components/ProfileTopSection";
import ProfileBottomSection from "../components/ProfileBottomSection";

import GlobalStyles from "../utils/GlobalStyles";

const UserProfile = ({ navigation }) => {
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
