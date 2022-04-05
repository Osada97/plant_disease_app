import React, { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { API_KEY } from "@env";

const PredictPlantScreen = ({ route, navigation }) => {
  const { type, plantType } = route.params;

  useEffect(async () => {
    if (type === "camera") {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus.status === "granted") {
        pickImageCamera();
      } else {
        return <Text>Permission Denied</Text>;
      }
    } else {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (galleryStatus.status === "granted") {
        pickImage();
      } else {
        return <Text>Permission Denied</Text>;
      }
    }
    hideBottomTabNavigation();
  }, []);

  //hide bottom tab navigation
  const hideBottomTabNavigation = () => {
    if (route.name === "PredictPlant") {
      navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    }
  };

  const pickImageCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      await getPredictedResults(result);
    } else {
      navigation.goBack();
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      await getPredictedResults(result);
    } else {
      navigation.goBack();
    }
  };

  //call axios function
  const getPredictedResults = async (files) => {
    let formData = new FormData();

    formData.append("file", {
      uri: files.uri,
      name: "anyname.jpg",
      type: "image/jpeg",
    });

    let res = await fetch(`${API_KEY}/predict?model=${plantType}`, {
      method: "post",
      body: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    let responseJson = await res.json();
    console.log(responseJson);
  };

  return <></>;
};

export default PredictPlantScreen;
