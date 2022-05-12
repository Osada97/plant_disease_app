import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard,
} from "react-native";
import GlobalStyles from "../utils/GlobalStyles";
import { useEffect, useState } from "react";
import { API_KEY } from "@env";
import Axios from "axios";
import { useSelector } from "react-redux";
import ErrorModel from "../utils/ErrorModel";
import * as mime from "react-native-mime-types";
import PostEditHook from "../utils/hook/PostEditHook";
import CustomHeaderInPostSetting from "../components/CustomHeaderInPostSetting";
import AddEditImageCoursoul from "../components/AddEditImageCoursoul";

const CommunityPostSetting = ({ route, navigation }) => {
  const { id } = route.params;
  const [details, setDetails] = useState({});
  const [image, setImage] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const { token } = useSelector((state) => state.user);

  const { editComment, setPostValue, values, isModel, setIsModel, errors } =
    PostEditHook(details, setImage, handelSubmit);

  useEffect(() => {
    Axios.get(`${API_KEY}/community/getonepost/${id}`, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        setDetails({ ...res.data });
      })
      .catch((err) => console.log(err));
  }, [isRefresh]);

  const removeImage = (index) => {
    //remove images in carousel
    const imageDetails = image[index];

    //remove images in server
    if (imageDetails.edited !== undefined) {
      Alert.alert("Delete Image", "Do you want to delete image on comment", [
        { text: "Cancel" },
        {
          text: "Delete",
          onPress: () => {
            Axios.delete(
              `${API_KEY}/community/removeimageinpost/${imageDetails.id}`,
              {
                headers: { Authorization: "Bearer " + token },
              }
            )
              .then(() => {
                const im = image.filter(
                  (data) => image.indexOf(data) !== index
                );
                setImage([...im]);
              })
              .catch((err) => console.log(err));
          },
        },
      ]);
    } else {
      //removes newly added images
      const im = image.filter((data) => image.indexOf(data) !== index);
      setImage([...im]);
    }
  };

  function handelSubmit() {
    //submit after validating
    Axios.put(
      `${API_KEY}/community/updatepost/${details.id}`,
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
      })
      .catch((err) => console.log(err));
  }

  const imageUpload = async (res) => {
    let formData = new FormData();

    for (const img of image) {
      const split = img.uri.split("/");
      const filenameWithExt = split[split.length - 1];
      const mimeType = mime.lookup(filenameWithExt);

      if (img.edited === undefined) {
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
          navigation.goBack();
        }
      }
    }
  };

  return (
    <View style={styles.screen}>
      {isModel && (
        <ErrorModel
          title="Question Edit Failed"
          msg={errors}
          type="Error"
          setIsModel={setIsModel}
        />
      )}
      <CustomHeaderInPostSetting
        setImage={setImage}
        image={image}
        editComment={editComment}
      />
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

export default CommunityPostSetting;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
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
});
