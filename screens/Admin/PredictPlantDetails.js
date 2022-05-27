import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import GlobalStyles from "../../utils/GlobalStyles";

const PredictPlantDetails = ({ navigation }) => {
  const [plantID, setPlantID] = useState(1);
  const onSelectType = (type) => {
    if (plantID !== type) {
      setPlantID(type);
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
          {plantID === 1 ? (
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
              { backgroundColor: plantID === 1 ? "#fffce3" : "#fff" },
            ]}
            onPress={() => onSelectType(1)}
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
              { backgroundColor: plantID === 2 ? "#ffe3e3" : "#fff" },
            ]}
            onPress={() => onSelectType(2)}
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
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("plantForm", { id: plantID })}
          >
            <Image
              style={styles.cardImage}
              source={require("../../assets/pngs/plant.png")}
            />
            <Text style={styles.cardText}>Edit Plant Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("editPlantDisease", { id: plantID })
            }
          >
            <Image
              style={styles.cardImage}
              source={require("../../assets/pngs/virus.png")}
            />
            <Text style={styles.cardText}>Edit Plant Disease Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("editPlantDiseaseMedicine", { id: plantID })
            }
          >
            <Image
              style={styles.cardImage}
              source={require("../../assets/pngs/medicine.png")}
            />
            <Text style={styles.cardText}>Edit Plant Disease Medicine</Text>
          </TouchableOpacity>
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
