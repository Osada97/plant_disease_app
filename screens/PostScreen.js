import { useCallback, useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import Comment from "../components/Comment";
import PostViewSec from "../components/PostViewSec";
import { useFocusEffect } from "@react-navigation/native";
import { API_KEY } from "@env";
import Axios from "axios";
import { useSelector } from "react-redux";
import BottomAddCommentSection from "../components/BottomAddCommentSection";
import GlobalStyles from "../utils/GlobalStyles";
import Loader from "../components/Loader";

const PostScreen = ({ route, navigation }) => {
  const [postDetails, setPostDetails] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);
  const [images, setImages] = useState([]);
  const [comment, setComment] = useState({ comment: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      Axios.get(`${API_KEY}/community/getonepost/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => {
          setIsLoading(false);
          setPostDetails(res.data);
        })
        .catch((err) => console.log(err.response.data));
    }
  }, [isRefresh]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ScrollView style={styles.screen}>
        {postDetails && (
          <>
            <PostViewSec
              postDetails={postDetails}
              setIsRefresh={setIsRefresh}
              isRefresh={isRefresh}
              navigation={navigation}
            />

            {postDetails.comment.map((data, index) => (
              <Comment
                key={index}
                data={data}
                setIsRefresh={setIsRefresh}
                isRefresh={isRefresh}
                setImages={setImages}
                images={images}
                setComment={setComment}
                comment={comment}
                setIsEdit={setIsEdit}
                isEdit={isEdit}
                setCommentId={setCommentId}
              />
            ))}
          </>
        )}
      </ScrollView>
      <BottomAddCommentSection
        postDetails={postDetails}
        setIsRefresh={setIsRefresh}
        isRefresh={isRefresh}
        setImages={setImages}
        images={images}
        setComment={setComment}
        comment={comment}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        commentId={commentId}
      />
    </>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: GlobalStyles.backgroundColor,
  },
});
