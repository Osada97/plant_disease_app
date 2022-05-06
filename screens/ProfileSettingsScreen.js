import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import GlobalStyles from "../utils/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import { API_KEY } from "@env";
import UpdateProfileForm from "../components/UpdateProfileForm";
import ValidateSignUp from "../components/ValidateSignUp";
import ErrorModel from "../utils/ErrorModel";
import Axios from "axios";
import GetLocation from "../utils/GetLocation";
import { setUserDetails } from "../actions/setUserDetails";
import ProfileImageSec from "../components/ProfileImageSec";
import * as mime from "react-native-mime-types";

const ProfileSettingsScreen = ({ navigation }) => {
  const [proPic, setProPic] = useState("");
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
  });
  const [isModel, setIsModel] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const { token, userDetails } = useSelector((state) => state.user);
  const { location } = GetLocation();
  const dispatch = useDispatch();

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

  const savedProfileDetails = () => {
    setErrors(ValidateSignUp(values));
    setCheckError(!checkError);
    setIsSubmit(true);
  };

  const handelSubmit = () => {
    Axios.put(
      `${API_KEY}/user/updateprofile/${userDetails.id}`,
      {
        first_name: values.firstName,
        last_name: values.lastName,
        username: values.userName,
        email: values.email,
        phone_number: values.phoneNumber,
        location: location || null,
      },
      {
        headers: { Authorization: "Bearer " + token },
      }
    )
      .then(async () => {
        dispatch(setUserDetails());

        //if profile pic edited true
        if (proPic.edited) {
          let formData = new FormData();
          const split = proPic.uri.split("/");
          const filenameWithExt = split[split.length - 1];
          const mimeType = mime.lookup(filenameWithExt);

          formData.append("file", {
            uri: proPic.uri,
            name: filenameWithExt,
            type: mimeType,
          });
          let result = await fetch(`${API_KEY}/user/uploadprofilepic`, {
            method: "post",
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + token,
            },
          });

          let responseJson = await result.json();

          if (responseJson) {
            navigation.goBack();
          }
        } else {
          navigation.goBack();
        }
      })
      .catch((err) => {
        if (err.response.data.detail.userName) {
          setErrors({ ...errors, userName: err.response.data.detail.userName });
        }
        if (err.response.data.detail.email) {
          setErrors({ ...errors, email: err.response.data.detail.email });
        }
        setCheckError(!checkError);
      });
  };

  return (
    <View style={styles.screen}>
      {isModel && (
        <ErrorModel
          title="SignUp Failed"
          msg={errors}
          type="Error"
          setIsModel={setIsModel}
        />
      )}
      <View style={styles.profileTopSection}>
        <View>
          <Text style={styles.title}>Update Profile Details</Text>
        </View>
        <ProfileImageSec
          userDetails={userDetails}
          proPic={proPic}
          setProPic={setProPic}
        />
      </View>
      <UpdateProfileForm
        user={userDetails}
        savedProfileDetails={savedProfileDetails}
        values={values}
        setValues={setValues}
      />
    </View>
  );
};

export default ProfileSettingsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  profileTopSection: {
    flex: 0.3,
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontFamily: GlobalStyles.SemiBoldFonts,
    color: GlobalStyles.mainColor,
  },
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
