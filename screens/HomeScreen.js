import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import React from "react";
import GlobalStyles from "../utils/GlobalStyles";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <TouchableHighlight
        style={styles.touchableButton}
        onPress={() => navigation.navigate("PredictPlant", { type: "camera" })}
      >
        <Text style={{ color: "white" }}>Take a picture</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.touchableButton}
        onPress={() => navigation.navigate("PredictPlant", { type: "gallery" })}
      >
        <Text style={{ color: "white" }}>Choose picture from gallery</Text>
      </TouchableHighlight>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  touchableButton: {
    backgroundColor: GlobalStyles.mainColor,
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
});
