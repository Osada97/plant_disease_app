import { View, Text, StyleSheet } from "react-native";
import React from "react";
import GlobalStyles from "../utils/GlobalStyles";

const CustomHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Early Blight</Text>
      <Text style={styles.subtitle}>Fungus</Text>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    color: GlobalStyles.mainColor,
  },
});
