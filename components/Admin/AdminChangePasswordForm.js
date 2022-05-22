import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from "react-native";
import ErrorModel from "../../utils/ErrorModel";
import GlobalStyles from "../../utils/GlobalStyles";
import Axios from "axios";
import { API_KEY } from "@env";
import { useSelector } from "react-redux";

const AdminChangePasswordForm = ({ navigation }) => {
  const [pwFormValues, setpwFormValues] = useState({
    current: "",
    newPw: "",
    oldPw: "",
  });
  const [errors, setErrors] = useState({
    current: "",
    newPw: "",
    oldPw: "",
  });
  const [checkError, setCheckError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isModel, setIsModel] = useState(false);

  const { token } = useSelector((state) => state.admin);

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
      submit();
    }
  }, [errors]);

  const setValues = (text, type) => {
    setpwFormValues({ ...pwFormValues, [type]: text });
  };

  const handelSubmit = () => {
    let errors = {};

    if (pwFormValues.current.trim().length === 0) {
      errors.current = "Please Enter Current Password";
    }
    if (pwFormValues.newPw.trim().length === 0) {
      errors.newPw = "Please Enter New Password";
    } else {
      if (pwFormValues.newPw.length < 3) {
        errors.newPw = "New Password Must Be More Than 3 Characters";
      }
      if (pwFormValues.newPw.length > 16) {
        errors.newPw = "New Password Must Be Less Than 16 Characters";
      }
    }
    if (pwFormValues.oldPw.trim().length === 0) {
      errors.oldPw = "Please Enter Confirm Password";
    } else {
      if (pwFormValues.newPw !== pwFormValues.oldPw) {
        errors.oldPw = "Confirm Password is Invalid";
      }
    }
    setErrors({ ...errors });
    setCheckError(!checkError);
    setIsSubmit(true);
  };

  const submit = () => {
    Axios.put(
      `${API_KEY}/admin/updatepassword`,
      {
        old_password: pwFormValues.current,
        new_password: pwFormValues.newPw,
      },
      {
        headers: { Authorization: "Bearer " + token },
      }
    )
      .then((res) => {
        if (res.data) {
          navigation.goBack();
        }
      })
      .catch((err) => {
        //set errors
        if (err.response.data.detail) {
          setErrors({ ...errors, current: err.response.data.detail });
        }
        setCheckError(!checkError);
      });
  };
  return (
    <View style={styles.form}>
      {isModel && (
        <ErrorModel
          title="Change Password Failedss"
          msg={errors}
          type="Error"
          setIsModel={setIsModel}
        />
      )}
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder="Current Password"
        onChangeText={(text) => setValues(text, "current")}
        value={pwFormValues.current}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder="New Password"
        onChangeText={(text) => setValues(text, "newPw")}
        value={pwFormValues.newPw}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder="Confirm New Password"
        onChangeText={(text) => setValues(text, "oldPw")}
        value={pwFormValues.oldPw}
      />
      <View style={styles.btnRow}>
        <TouchableHighlight style={styles.btn} onPress={handelSubmit}>
          <Text style={styles.btnText}>Change Password</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default AdminChangePasswordForm;

const styles = StyleSheet.create({
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
