import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import SelectPlant from "../components/SelectPlant";
import SelectImageSection from "../components/SelectImageSection";

const HomeScreen = ({ navigation }) => {
  const [plant, setPlant] = useState("potato");

  return (
    <View style={styles.screen}>
      <SelectPlant plant={plant} setPlant={setPlant} />
      <SelectImageSection plant={plant} navigation={navigation} />
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
