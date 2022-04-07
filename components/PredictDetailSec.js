import { View, Text, StyleSheet } from "react-native";
import React from "react";
import GlobalStyles from "../utils/GlobalStyles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBook,
  faCircleInfo,
  faVial,
  faLeaf,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

const PredictDetailSec = ({ data, title }) => {
  let iconName = faBook;

  if (title === "More Info") {
    iconName = faCircleInfo;
  } else if (title === "Chemical Control") {
    iconName = faVial;
  } else if (title === "Organic control") {
    iconName = faLeaf;
  } else if (title === "Plant Details") {
    iconName = faBookOpen;
  } else {
    iconName = faBook;
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionTitle}>
        <FontAwesomeIcon icon={iconName} size={25} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.detailSec}>
        {typeof data !== "object" ? (
          <Text style={styles.details}>{data}</Text>
        ) : (
          Object.keys(data).map((item, index) => (
            <View style={styles.plantDetails} key={index}>
              {item === "plant_name" ? (
                <>
                  <Text style={[styles.details, styles.detailTitle]}>
                    Plant Name :{" "}
                  </Text>
                  <Text style={[styles.details]}>{data[item]}</Text>
                </>
              ) : item === "science_name" ? (
                <>
                  <Text style={[styles.details, styles.detailTitle]}>
                    Scientific Name :{" "}
                  </Text>
                  <Text style={[styles.details, styles.ital]}>
                    {data[item]}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={[styles.details, styles.detailTitle]}>
                    Description :{" "}
                  </Text>
                  <Text style={[styles.details]}>{data[item]}</Text>
                </>
              )}
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default PredictDetailSec;

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#d1ded9",
  },
  detailsSection: {
    padding: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  sectionTitle: {
    width: "100%",
    flexDirection: "row",
    paddingBottom: 20,
  },
  title: {
    paddingLeft: 10,
    fontSize: 18,
    fontFamily: GlobalStyles.mediumFonts,
    color: "#000",
  },
  details: {
    fontSize: 16,
    fontFamily: GlobalStyles.customFonts,
    textAlign: "justify",
    lineHeight: 28,
    color: "#5c5c5c",
  },
  plantDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  detailTitle: {
    color: "#000",
  },
  ital: {
    fontStyle: "italic",
    color: "#000",
    fontWeight: "700",
  },
});
