import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Animated,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { API_KEY } from "@env";
import CustomHeader from "../components/CustomHeader";
import PredictDetailSec from "../components/PredictDetailSec";
import HorizontalImageList from "../components/HorizontalImageList";
import Axios from "axios";

const PredictPlantScreen = ({ route, navigation }) => {
  const { type, plantType } = route.params;
  const [plantDetails, setPlantDetails] = useState({});
  const windowWidth = Dimensions.get("window").width;

  //hide bottom tab navigation
  const hideBottomTabNavigation = () => {
    if (route.name === "PredictPlant") {
      navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
      customHeaderStyles();
    }
  };

  //custom styles in header
  const customHeaderStyles = () => {
    navigation.setOptions({
      headerTitle: () => (
        <CustomHeader
          title={plantDetails.desease_name}
          subTitle={plantDetails.desease_short_description}
        />
      ),
    });
  };

  useEffect(async () => {
    hideBottomTabNavigation();
  }, [plantDetails]);

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

    if (responseJson) {
      await Axios.get(`${API_KEY}/getplantdetails/${responseJson.class.id}`)
        .then((res) => {
          objectRecreate(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const objectRecreate = (data) => {
    //object recreate
    const detailObject = {};

    detailObject.id = data.id;
    detailObject.desease_name = data.desease_name;
    detailObject.desease_short_description = data.desease_short_description;
    detailObject.coverImage = [];
    detailObject.section = {};

    if (data.disease_image) {
      if (data.disease_image.length != 0) {
        for (const image of data.disease_image) {
          detailObject.coverImage.push(image.image_name);
        }
      } else {
        detailObject.coverImage.push(data.default_image);
      }
    }
    detailObject.section["Symptoms"] = data.symptoms || "";

    for (const type of data.medicene) {
      detailObject.section[type.medicene_type] = type.medicene_description;
    }

    detailObject.section["Plant Details"] = data.belong_plant || "";
    detailObject.section["More Info"] = data.description || "";

    setPlantDetails({ ...detailObject });
  };

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.imageViewerSection}>
        <Animated.FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          data={plantDetails.coverImage}
          renderItem={({ item, index }) => {
            return (
              <HorizontalImageList
                imageUri={item}
                index={index}
                scrollX={scrollX}
              />
            );
          }}
          keyExtractor={(item) => item}
          horizontal
          decelerationRate={0.9}
          snapToInterval={windowWidth * 0.9}
          scrollEventThrottle={16}
          bounces={false}
          contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 10 }}
        />
      </View>
      <View style={styles.detailsSection}>
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
          width={500}
          height={500}
          resizeMode="cover"
        />
        {plantDetails.section ? (
          Object.keys(plantDetails.section).map(
            (data, index) =>
              plantDetails.section[data] !== "" && (
                <PredictDetailSec
                  key={index}
                  data={plantDetails.section[data]}
                  title={data}
                />
              )
          )
        ) : (
          <Text>There is nothing to show</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default PredictPlantScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  imageViewerSection: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 1,
    paddingVertical: 35,
  },
  detailsSection: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 15,
    backgroundColor: "#fff",
  },
});
