import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import GlobalStyles from "../../utils/GlobalStyles";
import Axios from "axios";
import { API_KEY } from "@env";
import { useSelector } from "react-redux";
import ErrorModel from "../../utils/ErrorModel";

const EditPlantForm = ({ route, navigation }) => {
  const { id } = route.params;
  const { token } = useSelector((state) => state.admin);
  const [isModel, setIsModel] = useState(false);
  const [plantDetails, setPlantDetails] = useState({
    plantName: "",
    scienceName: "",
    description: "",
  });
  const [error, setError] = useState({
    plantName: "",
    scienceName: "",
    description: "",
  });
  const [isSubmit, setIsSubmit] = useState(true);
  const [isError, setIsError] = useState(true);

  const getDiseaseDetails = (id) => {
    Axios.get(`${API_KEY}/getdetails/plant/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        console.log(res.data.description);
        setPlantDetails({
          plantName: res.data.plant_name,
          scienceName: res.data.science_name,
          description: res.data.description,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDiseaseDetails(id);
  }, []);
  useEffect(() => {
    //check if there is an any errors and show the model
    if (Object.keys(error).length > 0) {
      if (error[Object.keys(error)[0]] !== "") {
        setIsModel(true);
      }
    }
  }, [isError]);

  const changeValues = (value, name) => {
    setPlantDetails({ ...plantDetails, [name]: value });
  };

  function submit() {
    let error = {};
    if (plantDetails.plantName.trim().length === 0) {
      error.plantName = "Please Enter organic control";
    } else if (plantDetails.plantName.length > 100) {
      error.plantName = "Plant name must be less than 100 characters";
    }
    if (plantDetails.scienceName.trim().length === 0) {
      error.scienceName = "Please Enter organic control";
    } else if (plantDetails.scienceName.length > 155) {
      error.scienceName = "Scientific name must be less than 155 characters";
    }
    if (plantDetails.description.trim().length === 0) {
      error.description = "Please Enter organic control";
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
    Axios.put(
      `${API_KEY}/updatedetails/details/${id}`,

      {
        science_name: plantDetails.scienceName,
        description: plantDetails.description,
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
  return (
    <View style={styles.screen}>
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
          <Text style={styles.title}>{plantDetails.plantName}</Text>
          <View style={styles.inputField}>
            <Text style={styles.label}>Plant Name</Text>
            <TextInput
              style={styles.inputStyle}
              value={plantDetails.plantName}
              onChangeText={(text) => changeValues(text, "plantName")}
              editable={false}
            />
          </View>
          <View style={styles.inputField}>
            <Text style={styles.label}>Scientific Name</Text>
            <TextInput
              style={styles.inputStyle}
              value={plantDetails.scienceName}
              onChangeText={(text) => changeValues(text, "scienceName")}
            />
          </View>
          <View style={styles.inputField}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              multiline={true}
              numberOfLines={10}
              style={styles.inputStyle}
              value={plantDetails.description}
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
    </View>
  );
};

export default EditPlantForm;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btnRow: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btn: {
    padding: 10,
    borderColor: GlobalStyles.mainColor,
    borderWidth: 2,
    borderRadius: 5,
  },
  btnText: {
    fontFamily: GlobalStyles.customFonts,
    color: GlobalStyles.mainColor,
  },
  active: {
    backgroundColor: GlobalStyles.mainColor,
  },
  activeText: {
    color: "#fff",
  },
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
