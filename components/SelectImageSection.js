import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import React from "react";
import { faCamera, faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GlobalStyles from "../utils/GlobalStyles";

const SelectImageSection = ({ plant, navigation }) => {
  return (
    <View style={styles.uploadPlantSection}>
      <Text style={styles.plantSectionText}>Heal Your Plant</Text>
      <View style={styles.predictPlantContainer}>
        <View style={styles.predictPlantRow}>
          <View style={styles.imageDes}>
            <Image
              style={styles.image}
              source={require("../assets/pngs/plantImage.png")}
            />
            <Text style={styles.imgText}>Take a {"\n"} picture</Text>
          </View>
          <View style={styles.imageDes}>
            <Image
              style={styles.image}
              source={require("../assets/pngs/arrow.png")}
            />
          </View>
          <View style={styles.imageDes}>
            <Image
              style={styles.image}
              source={require("../assets/pngs/seeDiaganise.png")}
            />
            <Text style={styles.imgText}>Take a {"\n"} picture</Text>
          </View>
          <View style={styles.imageDes}>
            <Image
              style={styles.image}
              source={require("../assets/pngs/arrow.png")}
            />
          </View>
          <View style={styles.imageDes}>
            <Image
              style={styles.image}
              source={require("../assets/pngs/med.png")}
            />
            <Text style={styles.imgText}>Take a {"\n"} picture</Text>
          </View>
        </View>
        <View style={styles.buttonSection}>
          <TouchableHighlight
            style={[styles.touchableButton]}
            onPress={() =>
              navigation.navigate("PredictPlant", {
                type: "gallery",
                plantType: plant,
              })
            }
          >
            <View style={{ alignItems: "center" }}>
              <FontAwesomeIcon icon={faImages} size={25} color="white" />
              <Text style={[styles.buttonText, { color: "white" }]}>
                GALLERY
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.touchableButton, styles.whiteButton]}
            onPress={() =>
              navigation.navigate("PredictPlant", {
                type: "camera",
                plantType: plant,
              })
            }
          >
            <View style={{ alignItems: "center" }}>
              <FontAwesomeIcon icon={faCamera} size={25} color="#393939" />
              <Text style={[styles.buttonText, { color: "#393939" }]}>
                TAKE A PHOTO
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default SelectImageSection;

const styles = StyleSheet.create({
  uploadPlantSection: {
    width: "100%",
    padding: 20,
  },
  plantSectionText: {
    fontFamily: GlobalStyles.mediumFonts,
    fontSize: 17,
  },
  predictPlantContainer: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 35,
    paddingHorizontal: 20,
    marginTop: 15,
    borderRadius: 15,
  },
  predictPlantRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 35,
  },
  image: {
    width: 65,
    height: 65,
    marginBottom: 10,
  },
  imgText: {
    fontSize: 15,
    textAlign: "center",
    color: GlobalStyles.mainColor,
    fontFamily: GlobalStyles.mediumFonts,
  },
  buttonSection: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  whiteButton: {
    backgroundColor: "white",
  },
  buttonText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
  },
  touchableButton: {
    backgroundColor: GlobalStyles.mainColor,
    padding: 15,
    width: 160,
    borderRadius: 20,
    flexShrink: 1,
    shadowColor: "#eee",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 20,
    shadowRadius: 5,
    elevation: 5,
  },
});
