import { View, Dimensions, Animated, Image, StyleSheet } from "react-native";
import React from "react";
import { faGrip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { API_KEY } from "@env";

const HorizontalImageList = ({ imageUri, index, scrollX }) => {
  const windowWidth = Dimensions.get("window").width;

  const inputRange = [
    (index - 1) * windowWidth,
    index * windowWidth,
    (index + 1) * windowWidth,
  ];
  const outputRange = [0.85, 1, 0.85];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange,
  });

  return (
    <Animated.View
      style={{
        width: windowWidth * 0.95,
        transform: [{ scale }],
        position: "relative",
      }}
    >
      <Image
        source={{ uri: `${API_KEY}/${imageUri}` }}
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
