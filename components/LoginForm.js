import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import GlobalStyles from "../utils/GlobalStyles";
import ErrorModel from "../utils/ErrorModel";

const LoginForm = ({ navigation }) => {
  const [loginForm, setLoginForm] = useState({ userName: "", password: "" });
  const [errors, setErrors] = useState({ userName: "", password: "" });
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
    let formErrors = {};

    if (loginForm.userName.trim().length === 0) {
      formErrors.userName = "Please Enter UserName";
    }
    if (loginForm.password.trim().length === 0) {
      formErrors.password = "Please Enter Password";
    }
    setErrors({ ...formErrors });
    setCheckError(!checkError);
    setIsSubmit(true);
  };

  const onFocus = (type) => {
    if (errors[type] && errors[type] !== "") {
      setErrors({ ...errors, [type]: "" });
    }
  };

  const handelSubmit = () => {
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
          icon="mail"
          style={[styles.inputStyle, errors.userName && styles.inputStyleError]}
          placeholder="Username"
          onChangeText={(text) => setValues(text, "userName")}
          onFocus={() => onFocus("userName")}
          value={loginForm.userName}
        />
      </View>
      <View style={styles.inputField}>
        <TextInput
          secureTextEntry={true}
          style={[styles.inputStyle, errors.password && styles.inputStyleError]}
          placeholder="Password"
          onChangeText={(text) => setValues(text, "password")}
          onFocus={() => onFocus("password")}
          value={loginForm.password}
        />
      </View>
      <View style={styles.endLine}>
        <TouchableWithoutFeedback>
          <Text style={styles.forget}>Forget Password?</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.formButton}>
        <TouchableHighlight style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        <View style={styles.bottomTextSec}>
          <Text style={styles.bottomText}>Don't have an account?</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("signUp")}
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
              Sign up
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default LoginForm;

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
  endLine: {
    alignItems: "flex-end",
  },
  forget: {
    color: GlobalStyles.mainColor,
    fontSize: 15,
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
