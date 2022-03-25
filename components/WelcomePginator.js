import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";
import React from "react";

const WelcomePginator = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.paginator}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });
        const bgColor = scrollX.interpolate({
          inputRange,
          outputRange: ["#868686", "orange", "#868686"],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[
              styles.dot,
              { width: dotWidth, opacity: opacity, backgroundColor: bgColor },
            ]}
            key={index.toString()}
          />
        );
      })}
    </View>
  );
};

export default WelcomePginator;

const styles = StyleSheet.create({
  paginator: {
    flex: 0.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#868686",
    marginHorizontal: 8,
  },
});
