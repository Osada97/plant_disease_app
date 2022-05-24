import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import GlobalStyles from "../../utils/GlobalStyles";

const PredictPlantDetails = () => {
  const [plant, setPlant] = useState("potato");
  const onSelectType = (type) => {
    if (plant !== type) {
      setPlant(type);
    }
  };
  return (
    <View style={styles.screen}>
      <View style={styles.topSection}>
        <View>
          <Text style={styles.topSectionMainText}>Select Plant</Text>
          <Text style={styles.topSectionSubText}>
            You can update plant details, plant medicine details and plant
            disease details
          </Text>
        </View>
        <View style={styles.imageContainer}>
          {plant === "potato" ? (
            <Image
              style={styles.image}
              source={require("../../assets/jpgs/123.jpg")}
            />
          ) : (
            <Image
              style={styles.image}
              source={require("../../assets/jpgs/456.jpg")}
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
              source={require("../../assets/pngs/potato.png")}
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
              source={require("../../assets/pngs/pepper.png")}
            />
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.gridSection}>
          <View style={styles.card}>
            <Image
              style={styles.cardImage}
              source={require("../../assets/pngs/plant.png")}
            />
            <Text style={styles.cardText}>Edit Plant Details</Text>
          </View>
          <View style={styles.card}>
            <Image
              style={styles.cardImage}
              source={require("../../assets/pngs/virus.png")}
            />
            <Text style={styles.cardText}>Edit Plant Disease Details</Text>
          </View>
          <View style={styles.card}>
            <Image
              style={styles.cardImage}
              source={require("../../assets/pngs/medicine.png")}
            />
            <Text style={styles.cardText}>Edit Plant Disease Medicine</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PredictPlantDetails;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
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
    textAlign: "center",
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

  bottomSection: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: GlobalStyles.backgroundColor,
  },
  gridSection: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  card: {
    flex: 0.33,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: GlobalStyles.mainColor,
  },
  cardImage: {
    width: 55,
    resizeMode: "contain",
  },
  cardText: {
    fontSize: 14,
    textAlign: "center",
    color: GlobalStyles.secondaryColor,
  },
});
