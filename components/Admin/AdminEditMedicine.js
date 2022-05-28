import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import GlobalStyles from "../../utils/GlobalStyles";
import Axios from "axios";
import { API_KEY } from "@env";
import ErrorModel from "../../utils/ErrorModel";

const AdminEditMedicine = ({ diseases, token }) => {
  const [isModel, setIsModel] = useState(false);
  const [diseaseMediValue, setDiseaseMediValue] = useState({
    organicControl: "",
    chemicalControl: "",
  });
  const [error, setError] = useState({
    organicControl: "",
    chemicalControl: "",
  });

  const getDiseaseDetails = (id) => {
    Axios.get(`${API_KEY}/getdetails/medicine/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setDiseaseMediValue({
          organicControl: res.data.organic,
          chemicalControl: res.data.chemical,
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
          <TouchableOpacity style={styles.mainButton} /*onPress={submit}*/>
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
