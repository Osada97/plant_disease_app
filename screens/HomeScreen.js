import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import SelectPlant from "../components/SelectPlant";
import SelectImageSection from "../components/SelectImageSection";
import { faCamera, faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GlobalStyles from "../utils/GlobalStyles";

const HomeScreen = ({ navigation }) => {
  const [plant, setPlant] = useState("potato");

  const onSelectType = (type) => {
    setPlant(type);
  };

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
