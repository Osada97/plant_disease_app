import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { API_KEY } from "@env";
import Axios from "axios";

const PredictPlantScreen = ({ route, navigation }) => {
  const { type } = route.params;

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
  }, []);

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
  const getPredictedResults = async (file) => {
    let formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      name: "anyname.jpg",
      type: "image/jpg",
    });

    console.log(formData);

    await Axios.post(`${API_KEY}/predict?model=pepper`, formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response.data));
  };

  return <></>;
};

export default PredictPlantScreen;
