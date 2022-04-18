import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
} from "react-native";
import React from "react";
import GlobalStyles from "../utils/GlobalStyles";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useSelector } from "react-redux";
import { API_KEY } from "@env";
import UpdateProfileForm from "../components/UpdateProfileForm";

const ProfileSettingsScreen = () => {
  const user = useSelector((state) => state.user.userDetails);

  return (
    <View style={styles.screen}>
      <View style={styles.profileTopSection}>
        <View>
          <Text style={styles.title}>Update Profile Details</Text>
        </View>
        <View style={styles.profileImageSec}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri:
                  user.profile_picture && `${API_KEY}/${user.profile_picture}`,
              }}
              style={styles.image}
            />
            <TouchableOpacity style={styles.upSec}>
              <FontAwesomeIcon icon={faCamera} size={18} color="green" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <UpdateProfileForm />
    </View>
  );
};

export default ProfileSettingsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  profileTopSection: {
    flex: 0.3,
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontFamily: GlobalStyles.SemiBoldFonts,
    color: GlobalStyles.mainColor,
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
  profileBottomSection: {
    flex: 0.7,
    justifyContent: "center",
  },
  input: {
    backgroundColor: GlobalStyles.inputBackground,
    padding: 10,
    marginVertical: 8,
    width: "100%",
    borderRadius: 8,
    textTransform: "capitalize",
  },
  btn: {
    backgroundColor: GlobalStyles.mainColor,
    padding: 13,
    marginTop: 10,
    borderRadius: 25,
  },
  btnText: {
    color: "#fff",
    fontFamily: GlobalStyles.customFonts,
    fontSize: 16,
    textAlign: "center",
  },
});
