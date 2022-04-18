import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from "react-native";
import React from "react";
import GlobalStyles from "../utils/GlobalStyles";

const UpdateProfileForm = () => {
  return (
    <View style={styles.profileBottomSection}>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="First Name" />
        <TextInput style={styles.input} placeholder="Last Name" />
        <TextInput style={styles.input} placeholder="User Name" />
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Phone Number" />
        <View style={styles.btnRow}>
          <TouchableHighlight style={styles.btn}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default UpdateProfileForm;

const styles = StyleSheet.create({
  profileBottomSection: {
    flex: 0.7,
    justifyContent: "center",
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
