import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import GlobalStyles from "../utils/GlobalStyles";

const SelectPlant = ({ plant, setPlant }) => {
  const onSelectType = (type) => {
    setPlant(type);
  };
  return (
    <View style={styles.selectPlantSection}>
      <View style={[styles.plantCardContainer]}>
        <TouchableHighlight
          underlayColor={"ffebcc"}
          style={[
            styles.plantCard,
            plant === "potato" && { backgroundColor: "#ffebcc" },
          ]}
          onPress={() => onSelectType("potato")}
        >
          <Image
            style={styles.CardImage}
            source={require("../assets/pngs/potato.png")}
          />
        </TouchableHighlight>
        <Text style={styles.cardTextStyle}>Potato</Text>
      </View>
      <View style={[styles.plantCardContainer]}>
        <TouchableHighlight
          underlayColor={"ffe8e8"}
          style={[
            styles.plantCard,
            plant === "pepper" && { backgroundColor: "#ffe8e8" },
          ]}
          onPress={() => onSelectType("pepper")}
        >
          <Image
            style={styles.CardImage}
            source={require("../assets/pngs/pepper.png")}
          />
        </TouchableHighlight>
        <Text style={styles.cardTextStyle}>Bell Pepper</Text>
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
