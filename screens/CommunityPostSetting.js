import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard,
} from "react-native";
import GlobalStyles from "../utils/GlobalStyles";
import { useEffect, useState } from "react";
import { API_KEY } from "@env";
import Axios from "axios";
import { useSelector } from "react-redux";
import ErrorModel from "../utils/ErrorModel";
import * as mime from "react-native-mime-types";
import PostEditHook from "../utils/hook/PostEditHook";
import CustomHeaderInPostSetting from "../components/CustomHeaderInPostSetting";
import AddEditImageCoursoul from "../components/AddEditImageCoursoul";

const CommunityPostSetting = () => {
  const { editComment, setPostValue, values, isModel, setIsModel, errors } =
    PostEditHook(details, setImage, handelSubmit);

  return (
    <View style={styles.screen}>
      {isModel && (
        <ErrorModel
          title="Question Edit Failed"
          msg={errors}
          type="Error"
          setIsModel={setIsModel}
        />
      )}
      <CustomHeaderInPostSetting
        setImage={setImage}
        image={image}
        editComment={editComment}
      />
      <View style={styles.formContainer}>
        {image.length > 0 && (
          <AddEditImageCoursoul image={image} removeImage={removeImage} />
        )}

        <View style={styles.form}>
          <View style={styles.formRow}>
            <Text style={styles.label}>Your question to the community</Text>
            <TextInput
              style={styles.input}
              placeholder="Add question about your plant"
              value={values.title}
              onChangeText={(text) => setPostValue(text, "title")}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Description of your plant</Text>
            <TextInput
              style={styles.input}
              placeholder="Describe specialities of your plant"
              value={values.description}
              onChangeText={(text) => setPostValue(text, "description")}
              multiline
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CommunityPostSetting;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  form: {
    marginTop: 15,
    padding: 10,
  },
  formRow: {
    marginBottom: 10,
  },
  label: {
    fontFamily: GlobalStyles.customFonts,
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    marginBottom: 10,
    borderColor: "#eee",
    borderWidth: 1,
    padding: 5,
    fontSize: 14,
    color: GlobalStyles.secondaryColor,
  },
});
