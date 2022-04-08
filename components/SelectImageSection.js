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
    <View style={styles.BottomSection}>
      <View>
        <Text style={styles.BottomSectionText}>Take Medicine for Plant</Text>
        <Text style={styles.BottomSectionSubText}>Your Crop Doctor</Text>
      </View>
      <View style={styles.btnRow}>
        <TouchableHighlight
          style={styles.button}
          onPress={() =>
            navigation.navigate("PredictPlant", {
              type: "gallery",
              plantType: plant,
            })
          }
        >
          <View style={styles.inButton}>
            <FontAwesomeIcon
              icon={faImages}
              size={25}
              color={GlobalStyles.mainColor}
            />
            <Text style={[styles.buttonText]}>Gallery</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() =>
            navigation.navigate("PredictPlant", {
              type: "camera",
              plantType: plant,
            })
          }
        >
          <View style={styles.inButton}>
            <FontAwesomeIcon
              icon={faCamera}
              size={25}
              color={GlobalStyles.mainColor}
            />
            <Text style={[styles.buttonText]}>Camera</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default SelectImageSection;

const styles = StyleSheet.create({
  BottomSection: {
    width: "100%",
    flex: 0.4,
    backgroundColor: GlobalStyles.mainColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  BottomSectionText: {
    fontFamily: GlobalStyles.mediumFonts,
    fontSize: 25,
    color: "#fff",
  },
  BottomSectionSubText: {
    fontFamily: GlobalStyles.mediumFonts,
    fontSize: 16,
    color: "#ffffff59",
    textAlign: "center",
  },
  btnRow: {
    flexDirection: "row",
  },
  inButton: {
    alignItems: "center",
  },
  button: {
    width: 120,
    height: 80,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 10,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: GlobalStyles.SemiBoldFonts,
    color: GlobalStyles.mainColor,
    marginTop: 5,
  },
});
