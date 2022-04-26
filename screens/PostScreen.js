import { useCallback, useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { View, TouchableHighlight, Image, TextInput } from "react-native";
import Comment from "../components/Comment";
import PostViewSec from "../components/PostViewSec";
import {
  faPaperPlane,
  faPaperclip,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useFocusEffect } from "@react-navigation/native";
import { API_KEY } from "@env";
import Axios from "axios";
import { useSelector } from "react-redux";

const PostScreen = ({ route, navigation }) => {
  const [postDetails, setPostDetails] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);

  const { token } = useSelector((state) => state.user);
  const { id } = route.params;

  useFocusEffect(
    useCallback(() => {
      navigation.addListener("focus", () => {
        navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
      });
    }, [navigation])
  );

  useEffect(() => {
    if (token) {
      Axios.get(`${API_KEY}/community/getonepost/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => {
          setPostDetails(res.data);
        })
        .catch((err) => console.log(err.response.data));
    }
  }, [isRefresh]);

  return (
    <>
      <ScrollView style={styles.screen}>
        {postDetails && (
          <>
            <PostViewSec
              postDetails={postDetails}
              setIsRefresh={setIsRefresh}
              isRefresh={isRefresh}
            />

            {postDetails.comment.map((data, index) => (
              <Comment key={index} data={data} />
            ))}
          </>
        )}
      </ScrollView>
      <View style={styles.CommentSec}>
        {postDetails && !postDetails.is_approve && (
          <View style={styles.overlay}></View>
        )}
        <View style={styles.imageRow}>
          <View style={styles.imageSec}>
            <Image
              source={require("../assets/jpgs/earlyBlight.jpg")}
              resizeMode="cover"
              style={styles.image}
            />
            <TouchableHighlight style={styles.delete}>
              <FontAwesomeIcon icon={faTrash} size={18} color="#fff" />
            </TouchableHighlight>
          </View>
          <View style={styles.imageSec}>
            <Image
              source={require("../assets/jpgs/earlyBlight.jpg")}
              resizeMode="cover"
              style={styles.image}
            />
            <TouchableHighlight style={styles.delete}>
              <FontAwesomeIcon icon={faTrash} size={18} color="#fff" />
            </TouchableHighlight>
          </View>
          <View style={styles.imageSec}>
            <Image
              source={require("../assets/jpgs/earlyBlight.jpg")}
              resizeMode="cover"
              style={styles.image}
            />
            <TouchableHighlight style={styles.delete}>
              <FontAwesomeIcon icon={faTrash} size={18} color="#fff" />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.addCommentSec}>
          <View style={styles.proPic}>
            <Image
              source={require("../assets/jpgs/avatar.jpg")}
              style={styles.proPicImage}
            />
          </View>
          <View style={styles.inputSec}>
            <TextInput
              placeholder="Write your comment"
              style={styles.input}
              multiline={true}
            />
            <TouchableHighlight style={styles.mediaSec}>
              <FontAwesomeIcon icon={faPaperclip} size={18} color="#797e85" />
            </TouchableHighlight>
          </View>
          <TouchableHighlight style={styles.sendSec}>
            <FontAwesomeIcon icon={faPaperPlane} size={18} color="#797e85" />
          </TouchableHighlight>
        </View>
      </View>
    </>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: "#eee",
  },
  CommentSec: {
    position: "relative",
    backgroundColor: "#fff",
  },
  addCommentSec: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 8,
  },
  imageRow: {
    width: "100%",
    flexDirection: "row",
    padding: 8,
  },
  imageSec: {
    width: 70,
    height: 70,
    marginHorizontal: 2,
    position: "relative",
    backgroundColor: "#000",
  },
  delete: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    opacity: 0.9,
  },
  proPic: {
    flex: 0.1,
  },
  proPicImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  inputSec: {
    flex: 0.8,
    position: "relative",
    marginHorizontal: 5,
  },
  sendSec: {
    flex: 0.1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    backgroundColor: "#eee",
    opacity: 0.5,
  },
  input: {
    borderColor: "#eee",
    borderWidth: 1,
    padding: 5,
    paddingRight: 25,
    flexShrink: 1,
  },
  mediaSec: {
    position: "absolute",
    bottom: "25%",
    right: "2%",
    backgroundColor: "#fff",
  },
});
