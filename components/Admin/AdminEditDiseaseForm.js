import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import GlobalStyles from "../../utils/GlobalStyles";
import Axios from "axios";
import { API_KEY } from "@env";
import ErrorModel from "../../utils/ErrorModel";
import validateEditDisease from "./ValidateEditDisease";
const AdminEditDiseaseForm = ({ navigation, diseases, token }) => {
  const [diseaseValue, setDiseaseValue] = useState({
    title: "",
    shortDescription: "",
    symptoms: "",
    description: "",
  });
  const [error, setError] = useState({
    title: "",
    shortDescription: "",
    symptoms: "",
    description: "",
  });
  const [isSubmit, setIsSubmit] = useState(true);
  const [isError, setIsError] = useState(true);
  const [isModel, setIsModel] = useState(false);

  const getDiseaseDetails = (id) => {
    Axios.get(`${API_KEY}/getdetails/disease/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setDiseaseValue({
          title: res.data.desease_name,
          shortDescription: res.data.desease_short_description,
          symptoms: res.data.symptoms,
          description: res.data.description,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (diseases.length > 0) {
      const result = diseases.find((data) => data.active == true);
      if (result) getDiseaseDetails(result.id);
    }
  }, [diseases]);

  useEffect(() => {
    //check if there is an any errors and show the model
    if (Object.keys(error).length > 0) {
      if (error[Object.keys(error)[0]] !== "") {
        setIsModel(true);
      }
    }
  }, [isError]);

  const changeValues = (value, name) => {
    setDiseaseValue({ ...diseaseValue, [name]: value });
  };

  function submit() {
    setError(validateEditDisease(diseaseValue));
    setIsSubmit(true);
    setIsError(!isError);
  }

  useEffect(() => {
    //check if there is an any errors and show the model
    if (Object.keys(error).length === 0 && isSubmit) {
      handelSubmit();
    }
  }, [error]);

  function handelSubmit() {
    let id = diseases.find((data) => data.active == true).id;

    Axios.put(
      `${API_KEY}/updatedetails/disease/${id}`,

      {
        desease_name: diseaseValue.title,
        desease_short_description: diseaseValue.shortDescription,
        symptoms: diseaseValue.symptoms,
        description: diseaseValue.description,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
      .then(() => {
        Alert.alert("Message", "Disease details updated");
        navigation.goBack();
      })
      .catch((err) => console.log(err.response.data));
  }

  return (
    <ScrollView>
      {isModel && (
        <ErrorModel
          title="SignUp Failed"
          msg={error}
          type="Error"
          setIsModel={setIsModel}
        />
      )}
      <View style={styles.formSec}>
        <Text style={styles.title}>{diseaseValue.title}</Text>
        <View style={styles.inputField}>
          <Text style={styles.label}>Disease Name</Text>
          <TextInput
            style={styles.inputStyle}
            value={diseaseValue.title}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.label}>Disease Short Description</Text>
          <TextInput
            style={styles.inputStyle}
            value={diseaseValue.shortDescription}
            onChangeText={(text) => changeValues(text, "shortDescription")}
          />
        </View>
        {!diseaseValue?.title?.includes("Healthy") &&
          !diseaseValue?.title?.includes("healthy") && (
            <View style={styles.inputField}>
              <Text style={styles.label}>Symptoms</Text>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={styles.inputStyle}
                value={diseaseValue.symptoms}
                onChangeText={(text) => changeValues(text, "symptoms")}
              />
            </View>
          )}
        <View style={styles.inputField}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputStyle}
            value={diseaseValue.description}
            onChangeText={(text) => changeValues(text, "description")}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.mainButton} onPress={submit}>
            <Text style={styles.mainButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdminEditDiseaseForm;

const styles = StyleSheet.create({
  formSec: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  title: {
    fontSize: 25,
    color: GlobalStyles.mainColor,
    textAlign: "center",
    marginBottom: 15,
    textTransform: "capitalize",
  },
  label: {
    marginBottom: 10,
    fontSize: 15,
    fontFamily: GlobalStyles.customFonts,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: GlobalStyles.inputBackground,
    backgroundColor: GlobalStyles.inputBackground,
    borderRadius: 8,
    padding: 8,
    marginBottom: 15,
  },
  mainButton: {
    backgroundColor: GlobalStyles.mainColor,
    padding: 15,
    borderRadius: 20,
  },
  mainButtonText: {
    color: "#fff",
    fontFamily: GlobalStyles.customFonts,
    textAlign: "center",
    fontSize: 15,
  },
});
