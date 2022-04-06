import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { API_KEY } from "@env";
import CustomHeader from "../components/CustomHeader";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import PredictDetailSec from "../components/PredictDetailSec";
import HorizontalImageList from "../components/HorizontalImageList";

const images = [
  "../assets/jpgs/earlyBlight.jpg",
  "../assets/jpgs/welcome1.jpg",
  "../assets/jpgs/welcome2.jpg",
];

const PredictPlantScreen = ({ route, navigation }) => {
  const { type, plantType } = route.params;
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
      headerTitle: () => <CustomHeader />,
    });
  };

  useEffect(async () => {
    hideBottomTabNavigation();

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
          data={images}
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
        <PredictDetailSec iconName={faBook} />
        <PredictDetailSec iconName={faBook} />
        <PredictDetailSec iconName={faBook} />
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
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#fff",
  },
});
