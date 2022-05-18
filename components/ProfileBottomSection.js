import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import {
  faPaperclip,
  faGear,
  faChevronRight,
  faKey,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GlobalStyles from "../utils/GlobalStyles";
import { clearSecureValue } from "../utils/SecureStore";
import { useDispatch } from "react-redux";
import { clearUserDetails } from "../actions/clearUserDetails";
import { SetUserLoggedOutStatus } from "../actions/UserLoggedStatus";

const ProfileBottomSection = ({ navigation }) => {
  const dispatch = useDispatch();

  const logOut = () => {
    Alert.alert("Log Out", "Do you really want to Log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log out",
        onPress: async () => {
          dispatch(clearUserDetails());
          dispatch(SetUserLoggedOutStatus());
          await clearSecureValue("access_token");
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.profileBottomSection}>
      <View style={styles.list}>
        <View style={styles.listRow}>
          <View style={styles.listRowSecOne}>
            <View style={styles.icon}>
              <FontAwesomeIcon icon={faPaperclip} size={18} color="green" />
            </View>
            <Text style={styles.listText}>My Posts</Text>
          </View>
          <TouchableOpacity
            style={styles.directButton}
            onPress={() => navigation.navigate("userPosts")}
          >
            <FontAwesomeIcon icon={faChevronRight} size={18} color="green" />
          </TouchableOpacity>
        </View>
        <View style={styles.listRow}>
          <View style={styles.listRowSecOne}>
            <View style={styles.icon}>
              <FontAwesomeIcon icon={faGear} size={18} color="green" />
            </View>
            <Text style={styles.listText}>Settings</Text>
          </View>
          <TouchableOpacity
            style={styles.directButton}
            onPress={() => navigation.navigate("userSettings")}
          >
            <FontAwesomeIcon icon={faChevronRight} size={18} color="green" />
          </TouchableOpacity>
        </View>
        <View style={styles.listRow}>
          <View style={styles.listRowSecOne}>
            <View style={styles.icon}>
              <FontAwesomeIcon icon={faKey} size={18} color="green" />
            </View>
            <Text style={styles.listText}>Change Password</Text>
          </View>
          <TouchableOpacity
            style={styles.directButton}
            onPress={() => navigation.navigate("changePassword")}
          >
            <FontAwesomeIcon icon={faChevronRight} size={18} color="green" />
          </TouchableOpacity>
        </View>

        <View style={styles.listRow}>
          <View style={styles.listRowSecOne}>
            <View style={[styles.icon, styles.iconRed]}>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                size={18}
                color="red"
              />
            </View>
            <Text style={styles.listText}>Log Out</Text>
          </View>
          <TouchableOpacity
            style={[styles.directButton, styles.directButtonRed]}
            onPress={logOut}
          >
            <FontAwesomeIcon icon={faChevronRight} size={18} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileBottomSection;

const styles = StyleSheet.create({
  profileBottomSection: {
    flex: 0.5,
    padding: 10,
  },
  listRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 10,
  },
  listRowSecOne: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.7,
  },
  icon: {
    padding: 10,
    borderRadius: 3,
    marginRight: 10,
  },
  listText: {
    fontFamily: GlobalStyles.customFonts,
    fontSize: 17,
  },
  directButton: {
    padding: 10,
    borderRadius: 50,
  },
});
