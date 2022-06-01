import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import GlobalStyles from "../utils/GlobalStyles";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const EmptyPageComponent = ({ text = "No Result Found" }) => {
  const navigate = useNavigation();
  return (
    <View style={styles.emptyData}>
      <Image
        style={styles.emptyImage}
        source={require("../assets/empty.png")}
        resizeMode="contain"
      />
      <Text style={styles.majorText}>{text}</Text>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigate.goBack()}
      >
        <FontAwesomeIcon icon={faAngleLeft} size={20} color="white" />
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyPageComponent;

const styles = StyleSheet.create({
  emptyData: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyImage: {
    height: "50%",
    marginBottom: 20,
  },
  majorText: {
    color: GlobalStyles.secondaryColor,
    fontFamily: GlobalStyles.mediumFonts,
    fontSize: 23,
  },
  goBackButton: {
    backgroundColor: GlobalStyles.mainColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 8,
    padding: 10,
    width: 130,
    borderRadius: 10,
  },
  backButtonText: {
    fontFamily: GlobalStyles.customFonts,
    fontSize: 16,
    color: "#fff",
  },
});
