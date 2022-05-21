import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import GlobalStyles from "../../utils/GlobalStyles";
import {
  faPaperclip,
  faGear,
  faChevronRight,
  faKey,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const AdminProfileBottomSection = () => {
  return (
    <View style={styles.profileBottomSection}>
      <View style={styles.list}>
        <View style={styles.listRow}>
          <View style={styles.listRowSecOne}>
            <View style={styles.icon}>
              <FontAwesomeIcon icon={faPaperclip} size={18} color="green" />
            </View>
            <Text style={styles.listText}>All Posts</Text>
          </View>
          <TouchableOpacity
            style={styles.directButton}
            // onPress={() => navigation.navigate("userPosts")}
          >
            <FontAwesomeIcon icon={faChevronRight} size={18} color="green" />
          </TouchableOpacity>
        </View>
        <View style={styles.listRow}>
          <View style={styles.listRowSecOne}>
            <View style={styles.icon}>
              <FontAwesomeIcon icon={faGear} size={18} color="green" />
            </View>
            <Text style={styles.listText}>Approved Posts</Text>
          </View>
          <TouchableOpacity
            style={styles.directButton}
            // onPress={() => navigation.navigate("userSettings")}
          >
            <FontAwesomeIcon icon={faChevronRight} size={18} color="green" />
          </TouchableOpacity>
        </View>
        <View style={styles.listRow}>
          <View style={styles.listRowSecOne}>
            <View style={styles.icon}>
              <FontAwesomeIcon icon={faGear} size={18} color="green" />
            </View>
            <Text style={styles.listText}>Disapproved Posts</Text>
          </View>
          <TouchableOpacity
            style={styles.directButton}
            // onPress={() => navigation.navigate("userSettings")}
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
            // onPress={() => navigation.navigate("changePassword")}
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
            // onPress={logOut}
          >
            <FontAwesomeIcon icon={faChevronRight} size={18} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AdminProfileBottomSection;

const styles = StyleSheet.create({
  profileBottomSection: {
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
