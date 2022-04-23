import {
  View,
  FlatList,
  Animated,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import React, { useRef } from "react";
import PostImageIndecator from "./PostImageIndecator";
import { API_KEY } from "@env";

const windowWidth = Dimensions.get("window").width;

const PostImageSection = ({ postImages }) => {
  const slideRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.imageSection}>
      <FlatList
        data={postImages}
        renderItem={({ item }) => (
          <View style={styles.imageSectio}>
            <Image
              style={styles.image}
              source={{ uri: `${API_KEY}/${item.image_name}` }}
              resizeMode="cover"
            />
          </View>
        )}
        keyExtractor={(_, index) => index}
        horizontal
        pagingEnabled
        contentContainerStyle={{ alignItems: "center" }}
        snapToInterval={windowWidth * 0.94}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
        res={slideRef}
        scrollEnabled={postImages.length > 1 ? true : false}
      />
      {postImages.length > 1 && (
        <View style={styles.indicator}>
          <PostImageIndecator slide={postImages} scrollX={scrollX} />
        </View>
      )}
    </View>
  );
};

export default PostImageSection;

const styles = StyleSheet.create({
  imageSection: {
    width: "100%",
    flex: 0.5,
    padding: 5,
    position: "relative",
  },
  imageSectio: {
    width: windowWidth * 0.94,
    height: 230,
    backgroundColor: "#000",
  },
  image: {
    width: windowWidth * 0.94,
    height: 230,
    opacity: 0.9,
  },
  indicator: {
    position: "absolute",
    bottom: "5%",
    left: "50%",
  },
});
