import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import {
  faPaperclip,
  faGear,
  faChevronRight,
  faKey,
  faRightFromBracket,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GlobalStyles from "../utils/GlobalStyles";

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
      <View style={styles.profileBottomSection}>
        <View style={styles.list}>
          <View style={styles.listRow}>
            <View style={styles.listRowSecOne}>
              <View style={styles.icon}>
                <FontAwesomeIcon icon={faPaperclip} size={18} color="green" />
              </View>
              <Text style={styles.listText}>My Posts</Text>
            </View>
            <TouchableOpacity style={styles.directButton}>
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
            <TouchableOpacity style={styles.directButton}>
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
            <TouchableOpacity style={styles.directButton}>
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
            >
              <FontAwesomeIcon icon={faChevronRight} size={18} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
  profileBottomSection: {
    flex: 0.5,
    padding: 25,
  },
  listRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    marginBottom: 25,
  },
  listRowSecOne: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.7,
  },
  icon: {
    backgroundColor: "#ebfffb",
    padding: 10,
    borderRadius: 3,
    marginRight: 10,
  },
  iconRed: {
    backgroundColor: "#ffeded",
  },
  listText: {
    fontFamily: GlobalStyles.customFonts,
    fontSize: 17,
  },
  directButton: {
    backgroundColor: "#ebfffb",
    padding: 10,
    borderRadius: 50,
  },
  directButtonRed: {
    backgroundColor: "#ffeded",
  },
});
