import {
  View,
  Text,
  Modal,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCircleExclamation,
  faCheckCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import GlobalStyles from "./GlobalStyles";

const deviceWidth = Dimensions.get("window").width;

const ErrorModel = ({ title = "", msg, type = "Error", setIsModel }) => {
  if (typeof msg !== "object") {
    console.error("Message parameter is not equal to Object");
  }

  //get one key value pair of object
  if (msg[Object.keys(msg)[0]] !== "") {
    msg = msg[Object.keys(msg)[0]];
  }

  return (
    <Modal
      animationType="fade"
      visible={true}
      transparent
      hardwareAccelerated={true}
      onRequestClose={() => setIsModel(false)}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={() => setIsModel(false)}
      >
        <View style={styles.alertContainer}>
          <View style={styles.icon}>
            <FontAwesomeIcon
              icon={type === "Error" ? faCircleExclamation : faCheckCircle}
              size={23}
              color={type === "Error" ? "#ff1f57" : "#2dc254"}
            />
          </View>
          <View style={styles.textContainer}>
            {title !== "" ? (
              <Text style={styles.errorTitle}>{title || ""}</Text>
            ) : (
              ""
            )}
            <Text
              style={[
                styles.errorSubTitle,
                { color: type === "Error" ? "#ff1f57" : "#2dc254" },
              ]}
            >
              {msg}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.iconClose}
            onPress={() => setIsModel(false)}
          >
            <FontAwesomeIcon
              icon={faXmark}
              size={23}
              color={type === "Error" ? "#ff1f57" : "#2dc254"}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ErrorModel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: deviceWidth,
    alignItems: "center",
    paddingVertical: 15,
  },
  alertContainer: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 5,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    flex: 0.1,
    alignContent: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 0.8,
  },
  iconClose: {
    flex: 0.1,
    alignContent: "center",
    justifyContent: "center",
  },
  errorTitle: {
    fontSize: 16,
    fontFamily: GlobalStyles.mediumFonts,
  },
  errorSubTitle: {
    fontSize: 15,
    fontFamily: GlobalStyles.customFonts,
    marginTop: 3,
    textTransform: "capitalize",
  },
});
