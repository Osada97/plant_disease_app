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
    if (plant !== type) {
      setPlant(type);
    }
  };
  return (
    <View style={styles.topSection}>
      <View>
        <Text style={styles.topSectionMainText}>Take Medicine for Plant</Text>
        <Text style={styles.topSectionSubText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Text>
      </View>
      <View style={styles.imageContainer}>
        {plant === "potato" ? (
          <Image
            style={styles.image}
            source={require("../assets/jpgs/123.jpg")}
          />
        ) : (
          <Image
            style={styles.image}
            source={require("../assets/jpgs/456.jpg")}
          />
        )}
      </View>
      <View style={styles.selectSection}>
        <TouchableHighlight
          style={[
            styles.secButton,
            { backgroundColor: plant === "potato" ? "#fffce3" : "#fff" },
          ]}
          onPress={() => onSelectType("potato")}
          underlayColor="#fffce3"
        >
          <Image
            style={styles.CardImage}
            source={require("../assets/pngs/potato.png")}
          />
        </TouchableHighlight>
        <TouchableHighlight
          style={[
            styles.secButton,
            { backgroundColor: plant === "pepper" ? "#ffe3e3" : "#fff" },
          ]}
          onPress={() => onSelectType("pepper")}
          underlayColor="#ffe3e3"
        >
          <Image
            style={styles.CardImage}
            source={require("../assets/pngs/pepper.png")}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default SelectPlant;

const styles = StyleSheet.create({
  topSection: {
    flex: 0.6,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  topSectionMainText: {
    fontFamily: GlobalStyles.boldFonts,
    fontSize: 30,
    marginBottom: 5,
  },
  topSectionSubText: {
    fontFamily: GlobalStyles.customFonts,
    fontSize: 16,
    textAlign: "center",
    color: "#808080",
  },
  imageContainer: {
    width: 180,
    height: 180,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  selectSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 15,
  },
  secButton: {
    width: 55,
    height: 55,
    borderRadius: 50,
    borderColor: "#dbdbdb",
    backgroundColor: "#fff",
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 5,
  },
  CardImage: {
    width: "100%",
    height: "100%",
  },
});
