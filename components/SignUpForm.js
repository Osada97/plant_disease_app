import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import GlobalStyles from "../utils/GlobalStyles";
import ValidateSignUp from "./ValidateSignUp";
import ErrorModel from "../utils/ErrorModel";

const SignUpForm = ({ navigation }) => {
  const [loginForm, setLoginForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [isModel, setIsModel] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    //check if there is an any errors and show the model
    if (Object.keys(errors).length > 0) {
      if (errors[Object.keys(errors)[0]] !== "") {
        setIsModel(true);
      }
    }
  }, [checkError]);

  useEffect(() => {
    //check if there is an any errors and show the model
    if (Object.keys(errors).length === 0 && isSubmit) {
      handelSubmit();
    }
  }, [errors]);

  const setValues = (text, name) => {
    setLoginForm({ ...loginForm, [name]: text });
  };

  const onSubmit = () => {
    setErrors(ValidateSignUp(loginForm));
    setCheckError(!checkError);
    setIsSubmit(true);
  };

  const onFocus = (type) => {
    if (errors[type] && errors[type] !== "") {
      setErrors({ ...errors, [type]: "" });
    }
  };

  const handelSubmit = () => {
    console.log(errors);
    console.log("handel submit");
  };

  return (
    <View style={styles.form}>
      {isModel && (
        <ErrorModel
          title="Login Failed"
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
