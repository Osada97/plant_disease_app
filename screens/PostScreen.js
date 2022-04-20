import { StyleSheet, ScrollView } from "react-native";
import Comment from "../components/Comment";
import PostViewSec from "../components/PostViewSec";

const PostScreen = () => {
  return (
    <ScrollView style={styles.screen}>
      <PostViewSec />
      <Comment />
      <Comment />
    </ScrollView>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#eee",
  },
});
