import { View, Dimensions, Animated, Image, StyleSheet } from "react-native";
import React from "react";
import { faBook, faGrip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const HorizontalImageList = ({ imageUri, index, scrollX }) => {
  const windowWidth = Dimensions.get("window").width;

  console.log(imageUri);

  const inputRange = [
    (index - 1) * windowWidth,
    index * windowWidth,
    (index + 1) * windowWidth,
  ];
  const outputRange = [0.9, 1, 0.9];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange,
  });

  return (
    <Animated.View
      style={{
        width: windowWidth * 0.9,
        transform: [{ scale }],
        position: "relative",
      }}
    >
      <Image
        source={{ uri: "http://10.0.2.2:8000/defaults/communityDefault.jpg" }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.grip}>
        <FontAwesomeIcon icon={faGrip} size={25} color="#ffffffc4" />
      </View>
    </Animated.View>
  );
};

export default HorizontalImageList;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 260,
    borderRadius: 25,
  },
  grip: {
    position: "absolute",
    bottom: 10,
    right: 20,
  },
});
