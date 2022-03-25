import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";
import GlobalStyles from "../utils/GlobalStyles";
import { WelcomeComponents } from "../components/WelcomeComponents";
import WelcomeSlides from "../utils/WelcomeSlides";
import WelcomePginator from "../components/WelcomePginator";

const WelcomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].id);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.screen}>
      <View style={styles.skipBar}>
        <TouchableOpacity>
          <Text style={styles.skipText}>SKIP</Text>
        </TouchableOpacity>
      </View>
      {/* Flatlist */}
      <View style={{ flex: 3 }}>
        <FlatList
          data={WelcomeSlides}
          renderItem={({ item }) => <WelcomeComponents item={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slideRef}
        />
      </View>
      <WelcomePginator data={WelcomeSlides} scrollX={scrollX} />
      <View style={styles.ButtonRow}>
        <TouchableOpacity style={styles.Button}>
          <Text style={styles.ButtonText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 35,
  },
  skipBar: {
    padding: 15,
    alignItems: "flex-end",
  },
  skipText: {
    fontSize: 15,
    fontFamily: GlobalStyles.boldFonts,
    color: GlobalStyles.mainColor,
  },
  ButtonRow: {
    padding: 10,
  },
  Button: {
    width: "100%",
    backgroundColor: GlobalStyles.mainColor,
    padding: 15,
    borderRadius: 10,
  },
  ButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
});
