import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Alert,
  ToastAndroid,
  Platform,
  Keyboard,
} from "react-native";
import { useState } from "react";
import {
  faPaperPlane,
  faPaperclip,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as ImagePicker from "expo-image-picker";
import ErrorModel from "../utils/ErrorModel";
import Axios from "axios";
import { API_KEY } from "@env";
import { useSelector } from "react-redux";
import * as mime from "react-native-mime-types";

const BottomAddCommentSection = ({
  postDetails,
  setIsRefresh,
  isRefresh,
  setImages,
  images,
  setComment,
  comment,
  setIsEdit,
  isEdit,
  commentId,
}) => {
  const [errors, setErrors] = useState({ comment: "" });
  const [isModel, setIsModel] = useState(false);
  const { token, userDetails } = useSelector((state) => state.user);

  const addImageButton = async () => {
    const galleryStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (galleryStatus.status === "granted") {
      pickImage();
    } else {
      return <Text>Permission Denied</Text>;
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
      allowsMultipleSelection: true,
    });
    if (!result.cancelled) {
      if (images.length < 2) {
        setImages([...images, { uri: result.uri }]);
      } else {
        if (Platform.OS === "android") {
          ToastAndroid.show("Cannot add three images", ToastAndroid.LONG);
        } else {
          Alert.alert("Message", "Cannot add three images", [{ text: "Ok" }], {
            cancelable: true,
          });
        }
      }
    }
  };

  const removeImage = (index) => {
    //delete image in edit mode
    const imageDetails = images[index];

    if (imageDetails.edited !== undefined) {
      Alert.alert("Delete Image", "Do you want to delete image on comment", [
        { text: "Cancel" },
        {
          text: "Delete",
          onPress: () => {
            Axios.delete(
              `${API_KEY}/community/comment/removeimage/${imageDetails.id}`,
              {
                headers: { Authorization: "Bearer " + token },
              }
            )
              .then(() => {
                const im = images.filter(
                  (data) => images.indexOf(data) !== index
                );
                setImages([...im]);
                setIsRefresh(!isRefresh);
              })
              .catch((err) => console.log(err.response.data));
          },
        },
      ]);
    } else {
      const im = images.filter((data) => images.indexOf(data) !== index);
      setImages([...im]);
    }
  };

  const addComment = (name, value) => {
    setComment({ [name]: value });
  };

  const addedComment = async () => {
    if (comment.comment.trim().length === 0 && images.length === 0) {
      setErrors({
        ...errors,
        comment: "There is Nothing to add as a comment",
      });
      if (isEdit) {
        Alert.alert("Edit", "Do you want to leave edit mode?", [
          { text: "Cancel" },
          { text: "Leave", onPress: () => setIsEdit(false) },
        ]);
      } else {
        setIsModel(true);
      }
      return;
    }
    if (comment.comment.length > 500) {
      setErrors({
        ...errors,
        comment: "Comment must be less than 500 characters",
      });
      setIsModel(true);
      return;
    }

    if (!isEdit) {
      Axios.post(
        `${API_KEY}/community/comment/create/${postDetails.id}`,
        {
          comment: comment.comment,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
        .then((res) => {
          Keyboard.dismiss();
          setComment({ comment: "" });
          if (images.length > 0) {
            imageUpload(res.data);
          } else {
            setIsRefresh(!isRefresh);
          }
        })
        .catch((err) => console.log(err.response.data));
    } else {
      editComment();
    }
  };

  const imageUpload = async (res) => {
    let formData = new FormData();

    for (const image of images) {
      const split = image.uri.split("/");
      const filenameWithExt = split[split.length - 1];
      const mimeType = mime.lookup(filenameWithExt);

      if (image.edited === undefined) {
        formData.append("file", {
          uri: image.uri,
          name: filenameWithExt,
          type: mimeType,
        });

        let result = await fetch(
          `${API_KEY}/community/comment/addimage/${res.id}`,
          {
            method: "post",
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + token,
            },
          }
        );

        let responseJson = await result.json();

        if (responseJson) {
          setIsRefresh(!isRefresh);
          setImages([]);
        }
      }
    }
    setIsRefresh(!isRefresh);
    setImages([]);
  };

  const editComment = () => {
    Axios.put(
      `${API_KEY}/community/comment/update/${commentId}`,
      {
        comment: comment.comment,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => {
        Keyboard.dismiss();
        setComment({ comment: "" });
        if (images.length > 0) {
          imageUpload(res.data);
        } else {
          setIsRefresh(!isRefresh);
        }
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <View style={styles.CommentSec}>
      {postDetails && !postDetails.is_approve && (
        <View style={styles.overlay}></View>
      )}
      {isModel && (
        <ErrorModel
          title="Comment Failed"
          msg={errors}
          type="Error"
          setIsModel={setIsModel}
        />
      )}
      {images.length > 0 && (
        <View style={styles.imageRow}>
          {images.map((data, index) => (
            <View key={index} style={styles.imageSec}>
              <Image
                source={{
                  uri: data.edited ? `${API_KEY}/${data.uri}` : data.uri,
                }}
                resizeMode="cover"
                style={styles.image}
              />
              <TouchableOpacity
                style={styles.delete}
                onPress={() => removeImage(index)}
              >
                <FontAwesomeIcon icon={faTrash} size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      <View style={styles.addCommentSec}>
        <View style={styles.proPic}>
          <Image
            source={{ uri: `${API_KEY}/${userDetails.profile_picture}` }}
            style={styles.proPicImage}
          />
        </View>
        <View style={styles.inputSec}>
          <TextInput
            placeholder="Write your comment"
            style={styles.input}
            multiline={true}
            value={comment.comment}
            onChangeText={(text) => addComment("comment", text)}
          />
          <TouchableOpacity style={styles.mediaSec} onPress={addImageButton}>
            <FontAwesomeIcon icon={faPaperclip} size={18} color="#797e85" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.sendSec} onPress={addedComment}>
          <FontAwesomeIcon icon={faPaperPlane} size={18} color="#797e85" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomAddCommentSection;

const styles = StyleSheet.create({
  CommentSec: {
    position: "relative",
    backgroundColor: "#fff",
    borderTopColor: "#cfe3da",
    borderTopWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
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
