import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GlobalStyles from "../utils/GlobalStyles";

const ProfileTopSection = () => {
  return (
    <View style={styles.profileTopSection}>
      <View style={styles.profileImageSec}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require("../assets/jpgs/avatar.jpg")}
            style={styles.image}
          />
          <TouchableOpacity style={styles.upSec}>
            <FontAwesomeIcon icon={faCamera} size={18} color="green" />
          </TouchableOpacity>
        </View>
        <Text style={styles.main}>Osada Manohara</Text>
        <Text style={styles.sub}>ozka</Text>
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
