import { View, StyleSheet, Animated, Dimensions } from "react-native";
import React from "react";

const PostImageIndecator = ({ slide, scrollX }) => {
  const windowWidth = Dimensions.get("window").width;
  const width = windowWidth * 0.94;
  return (
    <View style={{ flexDirection: "row" }}>
      {slide.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth }]}
            key={i.toString()}
          ></Animated.View>
        );
      })}
    </View>
  );
};

export default PostImageIndecator;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginHorizontal: 8,
  },
});
