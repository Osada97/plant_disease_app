import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GlobalStyles from "../utils/GlobalStyles";

const PostViewSec = () => {
  return (
    <View style={styles.topContainerCard}>
      <View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/jpgs/earlyBlight.jpg")}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.proPicSec}>
            <Image
              source={require("../assets/jpgs/avatar.jpg")}
              style={styles.proPicImage}
            />
          </View>
          <View style={styles.detailsUser}>
            <Text style={styles.name}>Osada Manohara Rathnayake</Text>
            <Text style={styles.location}>Badulla</Text>
            <Text style={styles.time}>One Day Ago</Text>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.content}>
          <Text style={styles.title}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo,
            magnam.
          </Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit neque
            laboriosam ullam porro ex odit?
          </Text>
        </View>
        <View style={styles.BottomRow}>
          <View style={styles.sec}>
            <FontAwesomeIcon icon={faThumbsUp} size={22} color="#797e85" />
            <Text style={styles.lkText}>Upvote</Text>
          </View>
          <View style={styles.sec}>
            <FontAwesomeIcon icon={faThumbsDown} size={22} color="#797e85" />
            <Text style={styles.lkText}>Downvote</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostViewSec;

const styles = StyleSheet.create({
  topContainerCard: {
    padding: 10,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 20,
  },
  imageContainer: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: GlobalStyles.mainColor,
  },
  image: {
    width: "100%",
    height: "100%",
    opacity: 0.8,
  },
  contentContainer: {
    width: "100%",
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  proPicSec: {
    width: 70,
    height: 70,
    borderRadius: 50,
    overflow: "hidden",
    padding: 2,
    backgroundColor: "#8e8e8e",
    shadowColor: "#eee",
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 20,
    elevation: 10,
  },
  proPicImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  detailsUser: {
    flex: 0.95,
  },
  name: {
    fontSize: 17,
    fontFamily: GlobalStyles.mediumFonts,
    color: GlobalStyles.mainColor,
  },
  location: {
    fontSize: 14,
    color: GlobalStyles.secondaryColor,
    fontFamily: GlobalStyles.customFonts,
  },
  time: {
    fontSize: 13,
    color: GlobalStyles.secondaryColor,
    fontFamily: GlobalStyles.customFonts,
  },
  title: {
    fontFamily: GlobalStyles.mediumFonts,
    fontSize: 16,
    lineHeight: 25,
    color: GlobalStyles.mainColor,
  },
  description: {
    fontFamily: GlobalStyles.customFonts,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    color: GlobalStyles.secondaryColor,
  },
  BottomRow: {
    marginTop: 20,
    flexDirection: "row",
    borderTopColor: GlobalStyles.secondaryColor,
    borderTopWidth: 1,
    paddingVertical: 15,
    justifyContent: "space-around",
  },
  sec: {
    flexDirection: "row",
    alignItems: "center",
  },
  lkText: {
    fontSize: 15,
    fontFamily: GlobalStyles.customFonts,
    marginLeft: 10,
  },
});
