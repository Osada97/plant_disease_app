import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import GlobalStyles from "../utils/GlobalStyles";

const SignUpForm = ({ navigation }) => {
  return (
    <View style={styles.form}>
      <View style={styles.inputField}>
        <TextInput style={styles.inputStyle} placeholder="First Name" />
      </View>
      <View style={styles.inputField}>
        <TextInput style={styles.inputStyle} placeholder="Last Name" />
      </View>
      <View style={styles.inputField}>
        <TextInput style={styles.inputStyle} placeholder="Username" />
      </View>
      <View style={styles.inputField}>
        <TextInput style={styles.inputStyle} placeholder="Phone Number" />
      </View>
      <View style={styles.inputField}>
        <TextInput
          secureTextEntry={true}
          style={styles.inputStyle}
          placeholder="Password"
        />
      </View>
      <View style={styles.inputField}>
        <TextInput
          secureTextEntry={true}
          style={styles.inputStyle}
          placeholder="Confirm Password"
        />
      </View>
      <View style={styles.formButton}>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableHighlight>
        <View style={styles.bottomTextSec}>
          <Text style={styles.bottomText}>Already have an account?</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("login")}
          >
            <Text
              style={[
                styles.bottomText,
                {
                  color: GlobalStyles.mainColor,
                  textDecorationLine: "underline",
                },
              ]}
            >
              {" "}
              Login
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  form: {
    width: "100%",
    paddingHorizontal: 25,
  },
  inputStyle: {
    backgroundColor: GlobalStyles.inputBackground,
    padding: 10,
    marginVertical: 8,
    width: "100%",
    borderRadius: 8,
  },
  formButton: {
    width: "100%",
    marginTop: 25,
  },
  button: {
    padding: 13,
    backgroundColor: GlobalStyles.mainColor,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontFamily: GlobalStyles.customFonts,
    fontSize: 16,
    textAlign: "center",
  },
  bottomTextSec: {
    flexDirection: "row",
    paddingTop: 10,
    justifyContent: "center",
  },
  bottomText: {
    fontSize: 15,
    fontFamily: GlobalStyles.customFonts,
  },
});
