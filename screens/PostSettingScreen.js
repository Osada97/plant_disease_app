import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Animated,
  Dimensions,
  Alert,
  Keyboard,
} from "react-native";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GlobalStyles from "../utils/GlobalStyles";
import { useEffect, useRef, useState } from "react";
import PostImageIndecator from "../components/PostImageIndecator";
import CustomHeaderInPostSetting from "../components/CustomHeaderInPostSetting";
import { API_KEY } from "@env";
import Axios from "axios";
import { useSelector } from "react-redux";
import ErrorModel from "../utils/ErrorModel";
import * as mime from "react-native-mime-types";
import PostEditHook from "../utils/hook/PostEditHook";

const windowWidth = Dimensions.get("window").width;

const PostSettingScreen = ({ route }) => {
  const { id } = route.params;
  const [details, setDetails] = useState({});

  const [image, setImage] = useState([]);
  const [isModel, setIsModel] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  const { token } = useSelector((state) => state.user);

  const { editComment, setPostValue, values } = PostEditHook(
    details,
    setImage,
    handelSubmit
  );

  const slideRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

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
        }
      }
    }
  };

  return (
    <View style={styles.screen}>
      {isModel && (
        <ErrorModel
          title="Post Edit Failed"
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
          <View style={styles.imageContainer}>
            <FlatList
              data={image}
              renderItem={({ item, index }) => (
                <View style={{ position: "relative" }}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: item.edited
                        ? `${API_KEY}/${item.uri}`
                        : `${item.uri}`,
                    }}
                    resizeMode="cover"
                  />
                  <View style={styles.imgSec}>
                    <TouchableOpacity onPress={() => removeImage(index)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        size={18}
                        color={GlobalStyles.secondaryColor}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(_, index) => index}
              horizontal
              pagingEnabled
              contentContainerStyle={{ alignItems: "center" }}
              snapToInterval={windowWidth * 0.95}
              decelerationRate={0}
              bounces={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
              viewabilityConfig={viewConfig}
              scrollEventThrottle={32}
              res={slideRef}
              scrollEnabled={image.length > 1 ? true : false}
              showsHorizontalScrollIndicator={false}
            />
            {image.length > 1 && (
              <View style={styles.indicator}>
                <PostImageIndecator slide={image} scrollX={scrollX} />
              </View>
            )}
          </View>
        )}
        <View style={styles.form}>
          <View>
            <Text style={styles.label}>Your question to the community</Text>
            <TextInput
              style={styles.input}
              placeholder="Add question about your plant"
              value={values.title}
              onChangeText={(text) => setPostValue(text, "title")}
            />
          </View>
          <View>
            <Text style={styles.label}>Description of your plant</Text>
            <TextInput
              style={styles.input}
              placeholder="Describe specialities of your plant"
              value={values.description}
              onChangeText={(text) => setPostValue(text, "description")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostSettingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
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
