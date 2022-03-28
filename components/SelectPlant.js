import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import GlobalStyles from "../utils/GlobalStyles";

const SelectPlant = () => {
  return (
    <View style={styles.selectPlantSection}>
      <View style={[styles.plantCardContainer]}>
        <View style={[styles.plantCard, styles.plantCardActive]}>
          <Image
            style={styles.CardImage}
            source={require("../assets/pngs/pepper.png")}
          />
        </View>
        <Text style={styles.cardTextStyle}>Bell Pepper</Text>
      </View>
      <View style={[styles.plantCardContainer]}>
        <View style={[styles.plantCard]}>
          <Image
            style={styles.CardImage}
            source={require("../assets/pngs/potato.png")}
          />
        </View>
        <Text style={styles.cardTextStyle}>Potato</Text>
      </View>
    </View>
  );
};

export default SelectPlant;

const styles = StyleSheet.create({
  selectPlantSection: {
    width: "100%",
    padding: 15,
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  plantCardContainer: {
    alignItems: "center",
  },
  plantCard: {
    backgroundColor: "#fafafa",
    width: 70,
    height: 70,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#e6e6e6",
  },
  plantCardActive: {
    backgroundColor: "#ffe8e8",
  },
  cardTextStyle: {
    marginTop: 10,
    fontFamily: GlobalStyles.customFonts,
    fontSize: 13,
  },
  CardImage: {
    width: 35,
    height: 35,
  },
});
