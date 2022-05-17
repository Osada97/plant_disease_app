import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ToastAndroid,
  Alert,
  Keyboard,
} from "react-native";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GlobalStyles from "../utils/GlobalStyles";
import { useState } from "react";
import * as mime from "react-native-mime-types";
import * as ImagePicker from "expo-image-picker";
import AddEditImageCoursoul from "../components/AddEditImageCoursoul";
import ErrorModel from "../utils/ErrorModel";
import { useSelector } from "react-redux";
import { API_KEY } from "@env";
import Axios from "axios";
import AddPostHook from "../utils/hook/AddPostHook";

const windowWidth = Dimensions.get("window").width;

const AddCommunityPost = ({ navigation }) => {
  const [image, setImage] = useState([]);
  const [isModel, setIsModel] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  const { token } = useSelector((state) => state.user);

  const { values, errors, addPost, removeImage, setPostValue } = AddPostHook(
    handelSubmit,
    image,
    setImage,
    setIsModel
  );

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
      if (image.length < 2) {
        setImage([...image, { uri: result.uri }]);
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

  function handelSubmit() {
    //submit after validating
    Axios.post(
      `${API_KEY}/community/create`,
      {
        post_title: values.title,
        description: values.description,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => {
        Keyboard.dismiss();
        if (image.length > 0) {
          imageUpload(res.data);
        } else {
          setIsRefresh(!isRefresh);
          navigation.goBack();
        }
        if (Platform.OS === "android") {
          ToastAndroid.show(
            "Your question will appear automatically after review admin",
            ToastAndroid.LONG
          );
        } else {
          Alert.alert(
            "Successfully added post",
            "Your question weill appear automatically after review admin",
            [{ text: "Ok" }],
            {
              cancelable: true,
            }
          );
        }
      })
      .catch((err) => console.log(err));
  }
  const imageUpload = async (res) => {
    let formData = new FormData();

    for (const img of image) {
      const split = img.uri.split("/");
      const filenameWithExt = split[split.length - 1];
      const mimeType = mime.lookup(filenameWithExt);

      formData.append("file", {
        uri: img.uri,
        name: filenameWithExt,
        type: mimeType,
      });

      let result = await fetch(
        `${API_KEY}/community/addimagetopost/${res.id}`,
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
      }
    }
    navigation.goBack();
  };
  return (
    <View style={styles.screen}>
      {isModel && (
        <ErrorModel
          title="Add Question Failed"
          msg={errors}
          type="Error"
          setIsModel={setIsModel}
        />
      )}
      <View style={styles.customHeader}>
        <Text style={styles.headerText}>Add Question</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={addImageButton}>
            <FontAwesomeIcon
              icon={faPaperclip}
              size={20}
              color={GlobalStyles.mainColor}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => addPost()}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.formContainer}>
        {image.length > 0 && (
          <AddEditImageCoursoul image={image} removeImage={removeImage} />
        )}
        <View style={styles.form}>
          <View style={styles.formRow}>
            <Text style={styles.label}>Your question to the community</Text>
            <TextInput
              style={styles.input}
              placeholder="Add question about your plant"
              value={values.title}
              onChangeText={(text) => setPostValue(text, "title")}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Description of your plant</Text>
            <TextInput
              style={styles.input}
              placeholder="Describe specialities of your plant"
              value={values.description}
              onChangeText={(text) => setPostValue(text, "description")}
              multiline
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddCommunityPost;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  customHeader: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
    paddingVertical: 15,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  headerText: {
    flex: 0.8,
    fontFamily: GlobalStyles.SemiBoldFonts,
    fontSize: 19,
    color: GlobalStyles.mainColor,
  },
  headerButtons: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    color: GlobalStyles.mainColor,
  },
  imageContainer: {
    position: "relative",
    width: windowWidth,
    height: 250,
    padding: 10,
    backgroundColor: "#eee",
  },
  image: {
    width: windowWidth * 0.95,
    height: 250,
    borderRadius: 10,
  },
  form: {
    marginTop: 15,
    padding: 10,
  },
  formRow: {
    marginBottom: 10,
  },
  label: {
    fontFamily: GlobalStyles.customFonts,
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    marginBottom: 10,
    borderColor: "#eee",
    borderWidth: 1,
    padding: 5,
    fontSize: 14,
    color: GlobalStyles.secondaryColor,
  },
  indicator: {
    position: "absolute",
    bottom: "10%",
    left: "50%",
  },
  imgSec: {
    position: "absolute",
    top: 20,
    right: 10,
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
});
