import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Platform,
} from "react-native";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GlobalStyles from "../utils/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { API_KEY } from "@env";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import PostImageSection from "./PostImageSection";
import VoteContainer from "./VoteContainer";

const CommunityPost = ({ item, setIsRefresh, isRefresh }) => {
  const [postImages, setPostImages] = useState([]);
  const [optionSec, setOptionSec] = useState(false);

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
      if (item.isUpVoted) {
        Axios.post(`${API_KEY}/community/removeaddedvote/${item.id}`, "", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then(() => setIsRefresh(!isRefresh))
          .catch((err) => console.log(err.response.data));
      } else {
        Axios.post(`${API_KEY}/community/addvote/${item.id}`, "", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then(() => setIsRefresh(!isRefresh))
          .catch((err) => console.log(err.response.data));
      }
    } else {
      if (Platform.OS === "android") {
        ToastAndroid.show("Please Log into system", ToastAndroid.LONG);
      }
      navigation.navigate("ProfileNavigation", {
        screen: "profile",
      });
    }
  };
  const addDownVote = () => {
    if (token) {
      if (item.isDownVoted) {
        Axios.post(`${API_KEY}/community/removedownvote/${item.id}`, "", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then(() => setIsRefresh(!isRefresh))
          .catch((err) => console.log(err.response.data));
      } else {
        Axios.post(`${API_KEY}/community/adddownvote/${item.id}`, "", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then(() => setIsRefresh(!isRefresh))
          .catch((err) => console.log(err.response.data));
      }
    } else {
      if (Platform.OS === "android") {
        ToastAndroid.show("Please Log into system", ToastAndroid.LONG);
      }
      navigation.navigate("ProfileNavigation", { screen: "login" });
    }
  };

  //delete the post
  const deletePost = (id) => {
    Alert.alert(
      "Delete Question",
      "Are you sure you want to delete this account?",
      [
        { text: "No" },
        {
          text: "Delete",
          onPress: () => {
            Axios.delete(`${API_KEY}/community/removeposts/${id}`, {
              headers: { Authorization: "Bearer " + token },
            })
              .then(() => setIsRefresh(!isRefresh))
              .catch((err) => console.log(err));
          },
        },
      ]
    );
  };

  const navigateToPost = () => {
    navigation.navigate("post_details", { id: item.id });
  };

  return (
    <Pressable style={[styles.card]} onPress={() => navigateToPost()}>
      {!item.default_image && <PostImageSection postImages={postImages} />}
      {item.isUser && (
        <Pressable
          style={[styles.infoContainer, optionSec && styles.overlay]}
          onPress={() => setOptionSec(false)}
        >
          <Pressable
            style={styles.info}
            onPress={() => setOptionSec(!optionSec)}
          >
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              size={20}
              color={GlobalStyles.mainColor}
            />
          </Pressable>
          {optionSec && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  { borderBottomWidth: 1, borderBottomColor: "#c9c9c9" },
                ]}
                onPress={() =>
                  navigation.navigate("Post_Setting", { id: item.id })
                }
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => deletePost(item.id)}
              >
                <Text style={[styles.buttonText, { color: "#cf1754" }]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Pressable>
      )}

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
        {item.is_approve ? (
          <VoteContainer
            item={item}
            addDownVote={addDownVote}
            addUpVote={addUpVote}
          />
        ) : (
          <View style={styles.textCont}>
            <Text style={styles.textContText}>This Post Not Approved Yet</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default CommunityPost;

const styles = StyleSheet.create({
  card: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    marginBottom: 15,
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
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
    width: 50,
    height: 50,
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
  textCont: {
    width: "100%",
    alignItems: "center",
    padding: 5,
  },
  textContText: {
    fontSize: 14,
    fontFamily: GlobalStyles.mediumFonts,
  },
  infoContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  overlay: {
    width: "100%",
    height: "100%",
    alignItems: "flex-end",
    zIndex: 1,
  },
  info: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#eee",
  },
  buttonContainer: {
    backgroundColor: "#f7f7f7",
    marginTop: 10,
    paddingVertical: 8,
    width: 100,
    borderRadius: 5,
  },
  button: {
    paddingVertical: 3,
  },
  buttonText: {
    fontFamily: GlobalStyles.customFonts,
    fontSize: 15,
    textAlign: "center",
    color: "#575757",
  },
});
