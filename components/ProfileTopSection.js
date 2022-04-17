import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
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
          <TouchableOpacity style={styles.upSec}>
            <FontAwesomeIcon icon={faCamera} size={18} color="green" />
          </TouchableOpacity>
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
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  profileImageSec: {
    alignItems: "center",
  },
  profileImageContainer: {
    position: "relative",
  },
  upSec: {
    position: "absolute",
    bottom: "20%",
    right: "0%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
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
