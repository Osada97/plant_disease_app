import Axios from "axios";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { API_KEY } from "@env";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import GlobalStyles from "../../utils/GlobalStyles";
import AdminEditMedicine from "../../components/Admin/AdminEditMedicine";

const EditPlantDiseaseMedi = ({ route, navigation }) => {
  const [diseases, setDiseases] = useState([]);

  const { token } = useSelector((state) => state.admin);
  const { id } = route.params;

  const getDiseaseList = () => {
    Axios.get(`${API_KEY}/getdetails/alldiseases/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        res.data[0].active = true;
        setDiseases([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDiseaseList();
  }, []);

  const activeForm = (id) => {
    const newActiveList = diseases.map((data) => {
      if (data.id === id) {
        data.active = true;
      } else {
        data.active = false;
      }
      return data;
    });
    setDiseases(newActiveList);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.btnRow}>
        {diseases.map((data) => {
          if (
            !data.desease_name.includes("Healthy") &&
            !data.desease_name.includes("healthy")
          )
            return (
              <TouchableOpacity
                style={[styles.btn, data?.active && styles.active]}
                onPress={() => activeForm(data.id)}
                key={data.id}
              >
                <Text
                  style={[styles.btnText, data?.active && styles.activeText]}
                >
                  {data.desease_name}
                </Text>
              </TouchableOpacity>
            );
        })}
      </View>
      <AdminEditMedicine
        diseases={diseases}
        token={token}
        navigation={navigation}
      />
    </View>
  );
};

export default EditPlantDiseaseMedi;

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
});
