import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import React from "react";
import GlobalStyles from "../utils/GlobalStyles";
import ErrorModel from "../utils/ErrorModel";
import LoginCustomHook from "../utils/hook/LoginCustomHook";
import axios from "axios";
import { API_KEY } from "@env";
import { setSecureValue } from "../utils/SecureStore";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../actions/setUserDetails";
import { setAdminDetails } from "../actions/setAdminDetails";

const LoginForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    isModel,
    onFocus,
    onSubmit,
    setValues,
    setIsModel,
    errors,
    setErrors,
    loginForm,
    setCheckError,
    checkError,
  } = LoginCustomHook(handelSubmit);

  async function handelSubmit() {
    if (loginForm.userName === "admin") {
      await axios
        .post(`${API_KEY}/admin/login`, {
          username: loginForm.userName,
          password: loginForm.password,
        })
        .then((res) => {
          setSecureValue("access_token", res.data.access_token);
          dispatch(setAdminDetails());
          navigation.navigate("adminProfile");
        })
        .catch((err) => {
          //set errors
          if (err.response.data.detail.userName) {
            setErrors({
              ...errors,
              userName: err.response.data.detail.userName,
            });
          }
          if (err.response.data.detail.password) {
            setErrors({
              ...errors,
              password: err.response.data.detail.password,
            });
          }
          setCheckError(!checkError);
        });
    } else {
      await axios
        .post(`${API_KEY}/user/login`, {
          username: loginForm.userName,
          password: loginForm.password,
        })
        .then((res) => {
          setSecureValue("access_token", res.data.access_token);
          dispatch(setUserDetails());
          // navigation.navigate("profile");
        })
        .catch((err) => {
          //set errors
          if (err.response.data.detail.userName) {
            setErrors({
              ...errors,
              userName: err.response.data.detail.userName,
            });
          }
          if (err.response.data.detail.password) {
            setErrors({
              ...errors,
              password: err.response.data.detail.password,
            });
          }
          setCheckError(!checkError);
        });
    }
  }

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
