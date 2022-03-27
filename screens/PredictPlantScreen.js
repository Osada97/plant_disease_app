import { View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

const PredictPlantScreen = ({ route, navigation }) => {
  const { type } = route.params;
  const [image, setImage] = useState(null);

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
      console.log(result);
      setImage(result.uri);
    } else {
      navigation.goBack();
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      console.log(result);
      setImage(result.uri);
    } else {
      navigation.goBack();
    }
  };

  return <></>;
};

export default PredictPlantScreen;
