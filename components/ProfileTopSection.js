import { View, Text, StyleSheet, Image } from "react-native";
import GlobalStyles from "../utils/GlobalStyles";
import { useSelector } from "react-redux";
import { API_KEY } from "@env";

const ProfileTopSection = () => {
  const user = useSelector((state) => state.user.userDetails);

  return (
    <View style={styles.profileTopSection}>
      <View style={styles.profileImageSec}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: user.profile_picture && `${API_KEY}/${user.profile_picture}`,
            }}
            style={styles.image}
          />
        </View>
        <Text style={styles.main}>
          {user.first_name + " " + user.last_name}
        </Text>
        <Text style={styles.sub}>{user.email}</Text>
        <Text style={styles.sub}>{user.user_name}</Text>
      </View>
    </View>
  );
};

export default ProfileTopSection;

const styles = StyleSheet.create({
  profileTopSection: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    marginBottom: 5,
    backgroundColor: "#fff",
    borderRadius: 40,
  },
  profileImageSec: {
    alignItems: "center",
  },
  profileImageContainer: {
    position: "relative",
  },
  image: {
    width: 120,
    height: 120,
    borderColor: GlobalStyles.mainColor,
    borderWidth: 2,
    borderRadius: 100,
    marginBottom: 15,
  },
  main: {
    fontFamily: GlobalStyles.mediumFonts,
    fontSize: 21,
    color: GlobalStyles.mainColor,
  },
  sub: {
    fontFamily: GlobalStyles.customFonts,
    fontSize: 18,
    color: GlobalStyles.secondaryColor,
  },
});
