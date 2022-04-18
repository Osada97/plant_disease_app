import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Image,
} from "react-native";
import React from "react";
import GlobalStyles from "../utils/GlobalStyles";
import ChangePasswordForm from "../components/ChangePasswordForm";

const ChangePasswordScreen = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.imageSec}>
        <Image
          source={require("../assets/pngs/pw.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.formSec}>
        <Text style={styles.formText}>Change Your Password</Text>
        <Text style={styles.formSubText}>
          Your new password must be different from previous used password.
        </Text>
        <ChangePasswordForm />
      </View>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "flex-start",
  },
  imageSec: {
    alignItems: "center",
  },
  image: {
    width: 220,
    height: 220,
  },
  formSec: {
    marginTop: 20,
  },
  formText: {
    fontSize: 25,
    fontFamily: GlobalStyles.SemiBoldFonts,
    textAlign: "center",
    marginBottom: 10,
    color: GlobalStyles.mainColor,
  },
  formSubText: {
    fontSize: 16,
    fontFamily: GlobalStyles.customFonts,
    textAlign: "center",
    color: GlobalStyles.secondaryColor,
    marginBottom: 40,
  },

  input: {
    backgroundColor: GlobalStyles.inputBackground,
    padding: 10,
    marginVertical: 8,
    width: "100%",
    borderRadius: 8,
    textTransform: "capitalize",
  },
  btn: {
    backgroundColor: GlobalStyles.mainColor,
    padding: 13,
    marginTop: 10,
    borderRadius: 25,
  },
  btnText: {
    color: "#fff",
    fontFamily: GlobalStyles.customFonts,
    fontSize: 16,
    textAlign: "center",
  },
});
