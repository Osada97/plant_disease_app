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

const AdminEditMedicine = ({ diseases, token, navigation }) => {
  const [isModel, setIsModel] = useState(false);
  const [diseaseMediValue, setDiseaseMediValue] = useState({
    organicControl: "",
    chemicalControl: "",
  });
  const [error, setError] = useState({
    organicControl: "",
    chemicalControl: "",
  });
  const [isSubmit, setIsSubmit] = useState(true);
  const [isError, setIsError] = useState(true);

  const getDiseaseDetails = (id) => {
    Axios.get(`${API_KEY}/getdetails/medicine/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setDiseaseMediValue({
          organicId: res.data.organicId,
          organicControl: res.data.organic,
          chemicalControl: res.data.chemical,
          chemicalId: res.data.chemicalId,
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
    setDiseaseMediValue({ ...diseaseMediValue, [name]: value });
  };

  function submit() {
    let error = {};
    if (diseaseMediValue.organicControl.trim().length === 0) {
      error.organicControl = "Please Enter organic control";
    }
    if (diseaseMediValue.chemicalControl.trim().length === 0) {
      error.chemicalControl = "Please Enter organic control";
    }
    setError({ ...error });
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
    let diseaseArr = [];
    diseaseArr.push({
      id: diseaseMediValue.organicId,
      description: diseaseMediValue.organicControl,
    });
    diseaseArr.push({
      id: diseaseMediValue.chemicalId,
      description: diseaseMediValue.chemicalControl,
    });

    for (let obj of diseaseArr) {
      Axios.put(
        `${API_KEY}/updatedetails/medicine/${obj.id}`,

        {
          medicene_description: obj.description,
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
        .catch((err) => console.log(err));
    }
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
        <View style={styles.inputField}>
          <Text style={styles.label}>Organic Control</Text>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputStyle}
            value={diseaseMediValue.organicControl}
            onChangeText={(text) => changeValues(text, "organicControl")}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.label}>Chemical Control</Text>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputStyle}
            value={diseaseMediValue.chemicalControl}
            onChangeText={(text) => changeValues(text, "chemicalControl")}
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

export default AdminEditMedicine;

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
    textAlignVertical: "top",
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
