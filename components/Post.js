import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  Animated,
} from "react-native";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GlobalStyles from "../utils/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { API_KEY } from "@env";
import { useRef } from "react";
import PostImageIndecator from "./PostImageIndecator";

const DATA = [
  {
    id: 1,
    uri: "../assets/jpgs/earlyBlight.jpg",
  },
  {
    id: 2,
    uri: "../assets/jpgs/earlyBlight.jpg",
  },
  {
    id: 3,
    uri: "../assets/jpgs/earlyBlight.jpg",
  },
];

const windowWidth = Dimensions.get("window").width;

const Post = ({ item }) => {
  const navigation = useNavigation();
  const navigateToPost = () => {
    navigation.navigate("post");
  };

  const slideRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <Pressable style={styles.card} /*onPress={() => navigateToPost()}*/>
      <View style={styles.imageSection}>
        <FlatList
          data={DATA}
          renderItem={() => (
            <View style={styles.imageSectio}>
              <Image
                style={styles.image}
                source={require("../assets/jpgs/earlyBlight.jpg")}
                resizeMode="cover"
              />
            </View>
          )}
          horizontal
          pagingEnabled
          contentContainerStyle={{ alignItems: "center" }}
          snapToInterval={windowWidth * 0.94}
          decelerationRate={0}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          res={slideRef}
        />
        <View style={styles.indicator}>
          <PostImageIndecator slide={DATA} scrollX={scrollX} />
        </View>
      </View>

      <View style={styles.contentSection}>
        <View style={styles.userRow}>
          <Image
            style={styles.profileImage}
            source={{ uri: `${API_KEY}/${item.owner.profile_picture}` }}
          />
          <View>
            <Text style={styles.name}>
              {item.owner.first_name + " " + item.owner.last_name}
            </Text>
            <Text style={styles.location}>{item.owner.location}</Text>
            <Text style={styles.time}>1d Ago</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.mainText}>{item.post_title}</Text>
          <Text style={styles.disText}>{item.description}</Text>
        </View>

        <View style={styles.social}>
          <View style={styles.sec}>
            <FontAwesomeIcon
              icon={faThumbsUp}
              size={22}
              color={item.isUpVoted ? "#1d917b" : "#797e85"}
            />
            <Text style={styles.lkText}>
              {item.up_vote_count !== 0 ? item.up_vote_count : "Upvote"}
            </Text>
          </View>
          <View style={styles.sec}>
            <FontAwesomeIcon
              icon={faThumbsDown}
              size={22}
              color={item.isDownVoted ? "#cf1754" : "#797e85"}
            />
            <Text style={styles.lkText}>
              {item.down_vote_count !== 0 ? item.down_vote_count : "Downvote"}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Post;

const styles = StyleSheet.create({
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
    position: "relative",
  },
  imageSectio: {
    width: windowWidth * 0.94,
    height: 230,
    backgroundColor: "#000",
  },
  image: {
    width: windowWidth * 0.94,
    height: 230,
    opacity: 0.9,
  },
  indicator: {
    position: "absolute",
    bottom: "5%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -5 }],
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
    textTransform: "capitalize",
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
