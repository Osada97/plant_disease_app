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
import ErrorModel from "../utils/ErrorModel";
import axios from "axios";
import { API_KEY } from "@env";
import SignUpCustomHook from "../utils/hook/SignUpCustomHook";
import GetLocation from "../utils/GetLocation";

const SignUpForm = ({ navigation }) => {
  const {
    isModel,
    setValues,
    onSubmit,
    onFocus,
    errors,
    setErrors,
    setIsModel,
    setCheckError,
    checkError,
    loginForm,
  } = SignUpCustomHook(handelSubmit);

  const { location } = GetLocation();

  async function handelSubmit() {
    await axios
      .post(`${API_KEY}/user/createaccount`, {
        first_name: loginForm.firstName,
        last_name: loginForm.lastName,
        username: loginForm.userName,
        email: loginForm.email,
        phone_number: loginForm.phoneNumber,
        location: location || null,
        password: loginForm.confirmPassword,
        profile_picture: "",
      })
      .then((res) => {
        navigation.navigate("login");
      })
      .catch((err) => {
        //set errors
        if (err.response.data.detail.userName) {
          setErrors({ ...errors, userName: err.response.data.detail.userName });
        }
        if (err.response.data.detail.email) {
          setErrors({ ...errors, email: err.response.data.detail.email });
        }
        setCheckError(!checkError);
      });
  }

  return (
    <View style={styles.form}>
      {isModel && (
        <ErrorModel
          title="SignUp Failed"
          msg={errors}
          type="Error"
          setIsModel={setIsModel}
        />
      )}
      <View style={styles.inputField}>
        <TextInput
          style={[
            styles.inputStyle,
            errors.firstName && styles.inputStyleError,
          ]}
          placeholder="First Name"
          onChangeText={(text) => setValues(text, "firstName")}
          onFocus={() => onFocus("firstName")}
        />
      </View>
      <View style={styles.inputField}>
        <TextInput
          style={[styles.inputStyle, errors.lastName && styles.inputStyleError]}
          placeholder="Last Name"
          onChangeText={(text) => setValues(text, "lastName")}
          onFocus={() => onFocus("lastName")}
        />
      </View>
      <View style={styles.inputField}>
        <TextInput
          style={[styles.inputStyle, errors.userName && styles.inputStyleError]}
          placeholder="Username"
          onChangeText={(text) => setValues(text, "userName")}
          onFocus={() => onFocus("userName")}
        />
      </View>
      <View style={styles.inputField}>
        <TextInput
          style={[styles.inputStyle, errors.email && styles.inputStyleError]}
          placeholder="Email"
          onChangeText={(text) => setValues(text, "email")}
          onFocus={() => onFocus("email")}
        />
      </View>
      <View style={styles.inputField}>
        <TextInput
          style={[
            styles.inputStyle,
            errors.phoneNumber && styles.inputStyleError,
          ]}
          placeholder="Phone Number"
          onChangeText={(text) => setValues(text, "phoneNumber")}
          onFocus={() => onFocus("phoneNumber")}
          keyboardType={"phone-pad"}
        />
      </View>
      <View style={styles.inputField}>
        <TextInput
          secureTextEntry={true}
          style={[styles.inputStyle, errors.password && styles.inputStyleError]}
          placeholder="Password"
          onChangeText={(text) => setValues(text, "password")}
          onFocus={() => onFocus("password")}
        />
      </View>
      <View style={styles.inputField}>
        <TextInput
          secureTextEntry={true}
          style={[
            styles.inputStyle,
            errors.confirmPassword && styles.inputStyleError,
          ]}
          placeholder="Confirm Password"
          onChangeText={(text) => setValues(text, "confirmPassword")}
          onFocus={() => onFocus("confirmPassword")}
        />
      </View>
      <View style={styles.formButton}>
        <TouchableHighlight style={styles.button} onPress={onSubmit}>
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
    textTransform: "capitalize",
  },
  inputStyleError: {
    backgroundColor: "#fff5f5",
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
