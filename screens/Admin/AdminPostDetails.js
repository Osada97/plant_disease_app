import { useCallback, useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import Comment from "../../components/Comment";
import PostViewSec from "../../components/PostViewSec";
import { useFocusEffect } from "@react-navigation/native";
import { API_KEY } from "@env";
import Axios from "axios";
import { useSelector } from "react-redux";
import BottomAddCommentSection from "../../components/BottomAddCommentSection";
import GlobalStyles from "../../utils/GlobalStyles";
import AdminPostViewSec from "../../components/Admin/AdminPostViewSec";

const AdminPostDetails = ({ route, navigation }) => {
  const [postDetails, setPostDetails] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);
  const [images, setImages] = useState([]);
  const [comment, setComment] = useState({ comment: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [commentId, setCommentId] = useState(null);

  const { token } = useSelector((state) => state.admin);
  const { id } = route.params;

  useFocusEffect(
    useCallback(() => {
      navigation.addListener("focus", () => {
        navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
      });
    }, [navigation])
  );

  useEffect(() => {
    Axios.get(`${API_KEY}/community/getpostdetails/${id}`)
      .then((res) => {
        setPostDetails(res.data);
      })
      .catch((err) => console.log(err.response.data));
  }, [isRefresh]);
  return (
    <>
      <ScrollView style={styles.screen}>
        {postDetails && (
          <>
            <AdminPostViewSec
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
                navigation={navigation}
              />
            ))}
          </>
        )}
      </ScrollView>
    </>
  );
};

export default AdminPostDetails;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: GlobalStyles.backgroundColor,
  },
});
