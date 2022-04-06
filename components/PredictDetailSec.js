import { View, Text, StyleSheet } from "react-native";
import React from "react";
import GlobalStyles from "../utils/GlobalStyles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const PredictDetailSec = ({ iconName }) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionTitle}>
        <FontAwesomeIcon icon={iconName} size={28} />
        <Text style={styles.title}>Symptoms</Text>
      </View>
      <View style={styles.detailSec}>
        <Text style={styles.details}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum rem
          numquam autem harum iure illum quo eveniet in consequatur. Eum
          voluptatem, accusantium placeat velit saepe soluta illo?
          Necessitatibus, veniam deleniti?
        </Text>
        <Text style={styles.details}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum rem
          numquam autem harum iure illum quo eveniet in consequatur. Eum
          voluptatem, accusantium placeat velit saepe soluta illo?
          Necessitatibus, veniam deleniti?
        </Text>
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
    paddingLeft: 18,
    fontSize: 18,
    fontFamily: GlobalStyles.mediumFonts,
  },
  details: {
    fontSize: 15,
    fontFamily: GlobalStyles.customFonts,
    textAlign: "justify",
    lineHeight: 25,
    color: "#474747",
  },
});
