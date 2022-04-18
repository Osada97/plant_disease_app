import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GlobalStyles from "../utils/GlobalStyles";

const data = [
  {
    id: 1,
    image: "../assets/jpgs/earlyBlight.jpg",
    name: "loerm ipsum loerm ipsum",
  },
  {
    id: 2,
    image: "../assets/jpgs/earlyBlight.jpg",
    name: "loerm ipsum loerm ipsum",
  },
  {
    id: 3,
    image: "../assets/jpgs/earlyBlight.jpg",
    name: "loerm ipsum loerm ipsum",
  },
];

const UserPostsScreen = () => {
  const renderItem = () => {
    return (
      <View style={styles.card}>
        <View style={styles.imageSection}>
          <Image
            style={styles.image}
            source={require("../assets/jpgs/earlyBlight.jpg")}
            resizeMode="cover"
          />
        </View>
        <View style={styles.contentSection}>
          <View style={styles.userRow}>
            <Image
              style={styles.profileImage}
              source={require("../assets/jpgs/avatar.jpg")}
            />
            <View>
              <Text style={styles.name}>Osada Manohara Rathnayake</Text>
              <Text style={styles.location}>Badulla, Sri Lanka</Text>
              <Text style={styles.time}>1d Ago</Text>
            </View>
          </View>
          <View style={styles.content}>
            <Text style={styles.mainText}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
              reprehenderit
            </Text>
            <Text style={styles.disText}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Molestias distinctio voluptatem ratione id, numquam at!
            </Text>
          </View>
          <View style={styles.social}>
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
  return (
    <View style={styles.screen}>
      <View style={styles.cardContainer}>
        <FlatList data={data} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default UserPostsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#eee",
  },
  cardContainer: {
    padding: 10,
  },
  card: {
    width: "100%",
    overflow: "hidden",
    marginBottom: 15,
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  imageSection: {
    width: "100%",
    flex: 0.5,
    padding: 5,
  },
  image: {
    width: "100%",
    height: 230,
    aspectRatio: 16 / 9,
  },
  contentSection: {
    flex: 0.5,
    padding: 15,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 20,
  },
  name: {
    fontFamily: GlobalStyles.customFonts,
    fontSize: 15,
    color: GlobalStyles.mainColor,
  },
  location: {
    fontFamily: GlobalStyles.customFonts,
    fontSize: 14,
    color: GlobalStyles.secondaryColor,
  },
  time: {
    fontFamily: GlobalStyles.customFonts,
    fontSize: 13,
    color: GlobalStyles.secondaryColor,
  },
  mainText: {
    fontSize: 16,
    fontFamily: GlobalStyles.mediumFonts,
    lineHeight: 20,
    marginBottom: 5,
  },
  disText: {
    fontSize: 14,
    color: GlobalStyles.secondaryColor,
    lineHeight: 20,
    marginBottom: 12,
  },
  social: {
    borderTopColor: "#eee",
    borderTopWidth: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 10,
  },
  sec: {
    flexDirection: "row",
  },
  lkText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: GlobalStyles.customFonts,
    color: "#797e85",
  },
});
