import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GlobalStyles from "../utils/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { API_KEY } from "@env";
import { useEffect, useRef, useState } from "react";
import PostImageIndecator from "./PostImageIndecator";
import Axios from "axios";
import { useSelector } from "react-redux";

const windowWidth = Dimensions.get("window").width;

const Post = ({ item, setIsRefresh, isRefresh }) => {
  const [postImages, setPostImages] = useState([]);
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.user);

  //take images
  useEffect(() => {
    getImages();
  }, [item]);

  const getImages = () => {
    if (item.images.length > 0) {
      setPostImages([...item.images]);
    } else {
      const imgObg = {
        image_name: item.default_image,
      };
      setPostImages([imgObg]);
    }
  };

  const addUpVote = () => {
    if (token) {
      Axios.post(`${API_KEY}/community/addvote/${item.id}`, "", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then(() => setIsRefresh(!isRefresh))
        .catch((err) => console.log(err.response.data));
    }
  };
  const addDownVote = () => {
    if (token) {
      Axios.post(`${API_KEY}/community/adddownvote/${item.id}`, "", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then(() => setIsRefresh(!isRefresh))
        .catch((err) => console.log(err.response.data));
    }
  };

  const navigateToPost = () => {
    navigation.navigate("post");
  };

  const slideRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <Pressable style={styles.card} onPress={() => navigateToPost()}>
      <View style={styles.imageSection}>
        <FlatList
          data={postImages}
          renderItem={({ item }) => (
            <View style={styles.imageSectio}>
              <Image
                style={styles.image}
                source={{ uri: `${API_KEY}/${item.image_name}` }}
                resizeMode="cover"
              />
            </View>
          )}
          keyExtractor={(_, index) => index}
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
          scrollEnabled={postImages.length > 1 ? true : false}
        />
        {postImages.length > 1 && (
          <View style={styles.indicator}>
            <PostImageIndecator slide={postImages} scrollX={scrollX} />
          </View>
        )}
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
          <TouchableOpacity style={styles.sec} onPress={addUpVote}>
            <FontAwesomeIcon
              icon={faThumbsUp}
              size={22}
              color={item.isUpVoted ? "#1d917b" : "#797e85"}
            />
            <Text style={styles.lkText}>
              {item.up_vote_count !== 0 ? item.up_vote_count : "Upvote"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sec} onPress={addDownVote}>
            <FontAwesomeIcon
              icon={faThumbsDown}
              size={22}
              color={item.isDownVoted ? "#cf1754" : "#797e85"}
            />
            <Text style={styles.lkText}>
              {item.down_vote_count !== 0 ? item.down_vote_count : "Downvote"}
            </Text>
          </TouchableOpacity>
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
