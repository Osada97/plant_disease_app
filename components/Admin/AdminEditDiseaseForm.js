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

const AdminEditDiseaseForm = ({ diseases, token }) => {
  const [details, setDetails] = useState({});
  const getDiseaseDetails = (id) => {
    Axios.get(`${API_KEY}/getdetails/disease/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setDetails({ ...res.data });
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
      <View style={styles.formSec}>
        <Text style={styles.title}>{details.desease_name}</Text>
        <View style={styles.inputField}>
          <Text style={styles.label}>Disease Name</Text>
          <TextInput
            style={styles.inputStyle}
            value={details.desease_name}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.label}>Disease Short Description</Text>
          <TextInput
            style={styles.inputStyle}
            value={details.desease_short_description}
          />
        </View>
        {!details?.desease_name?.includes("Healthy") &&
          !details?.desease_name?.includes("healthy") && (
            <View style={styles.inputField}>
              <Text style={styles.label}>Symptoms</Text>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={styles.inputStyle}
                value={details.symptoms}
              />
            </View>
          )}
        <View style={styles.inputField}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputStyle}
            value={details.description}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.mainButton}>
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
