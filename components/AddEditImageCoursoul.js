import { useRef } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Animated,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import PostImageIndecator from "./PostImageIndecator";
import { API_KEY } from "@env";
import GlobalStyles from "../utils/GlobalStyles";

const windowWidth = Dimensions.get("window").width;

const AddEditImageCoursoul = ({ image, removeImage }) => {
  const slideRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  return (
    <View style={styles.imageContainer}>
      <FlatList
        data={image}
        renderItem={({ item, index }) => (
          <View style={{ position: "relative" }}>
            <Image
              style={styles.image}
              source={{
                uri: item.edited ? `${API_KEY}/${item.uri}` : `${item.uri}`,
              }}
              resizeMode="cover"
            />
            <View style={styles.imgSec}>
              <TouchableOpacity onPress={() => removeImage(index)}>
                <FontAwesomeIcon
                  icon={faTrash}
                  size={18}
                  color={GlobalStyles.secondaryColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(_, index) => index}
        horizontal
        pagingEnabled
        contentContainerStyle={{ alignItems: "center" }}
        snapToInterval={windowWidth * 0.95}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
        res={slideRef}
        scrollEnabled={image.length > 1 ? true : false}
        showsHorizontalScrollIndicator={false}
      />
      {image.length > 1 && (
        <View style={styles.indicator}>
          <PostImageIndecator slide={image} scrollX={scrollX} />
        </View>
      )}
    </View>
  );
};

export default AddEditImageCoursoul;

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    width: windowWidth,
    height: 250,
    padding: 10,
    backgroundColor: "#eee",
  },
  image: {
    width: windowWidth * 0.95,
    height: 250,
    borderRadius: 10,
  },
  indicator: {
    position: "absolute",
    bottom: "10%",
    left: "50%",
  },
  imgSec: {
    position: "absolute",
    top: 20,
    right: 10,
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
});
