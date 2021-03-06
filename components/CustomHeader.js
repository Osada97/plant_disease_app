import { View, Text, StyleSheet } from "react-native";
import React from "react";
import GlobalStyles from "../utils/GlobalStyles";

const CustomHeader = ({ title, subTitle }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title || ""}</Text>
      <Text style={styles.subtitle}>{subTitle || ""}</Text>
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
    fontSize: 20,
    fontFamily: GlobalStyles.mediumFonts,
  },
  subtitle: {
    fontSize: 15,
    color: GlobalStyles.mainColor,
    textTransform: "capitalize",
  },
});
