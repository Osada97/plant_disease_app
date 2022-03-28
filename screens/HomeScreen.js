import { View, StyleSheet } from "react-native";
import React from "react";
import SelectPlant from "../components/SelectPlant";
import SelectImageSection from "../components/SelectImageSection";

const HomeScreen = () => {
  return (
    <View style={styles.screen}>
      <SelectPlant />
      <SelectImageSection />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
