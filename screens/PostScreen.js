import { useCallback } from "react";
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

const PostScreen = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      navigation.addListener("focus", () => {
        navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
      });
    }, [navigation])
  );

  return (
    <>
      <ScrollView style={styles.screen}>
        <PostViewSec />
        <Comment />
        <Comment />
      </ScrollView>
      <View style={styles.CommentSec}>
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
    backgroundColor: "#eee",
  },
  CommentSec: {
    backgroundColor: "#fff",
    padding: 8,
  },
  addCommentSec: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingTop: 8,
  },
  imageRow: {
    width: "100%",
    flexDirection: "row",
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
