import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { useEffect } from "react";
import GlobalStyles from "../utils/GlobalStyles";

const UpdateProfileForm = ({
  user,
  savedProfileDetails,
  values,
  setValues,
}) => {
  useEffect(() => {
    setValues({
      ...values,
      ...{
        firstName: user.first_name,
        lastName: user.last_name,
        userName: user.user_name,
        email: user.email,
        phoneNumber: user.phone_number,
      },
    });
  }, []);

  const handelValues = (text, type) => {
    setValues({ ...values, ...{ [type]: text } });
  };

  return (
    <View style={styles.profileBottomSection}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={values.firstName}
          onChangeText={(text) => handelValues(text, "firstName")}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={values.lastName}
          onChangeText={(text) => handelValues(text, "lastName")}
        />
        <TextInput
          style={styles.input}
          placeholder="User Name"
          value={values.userName}
          onChangeText={(text) => handelValues(text, "userName")}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={values.email}
          onChangeText={(text) => handelValues(text, "email")}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={values.phoneNumber}
          onChangeText={(text) => handelValues(text, "phoneNumber")}
          keyboardType="number-pad"
        />
        <View style={styles.btnRow}>
          <TouchableHighlight style={styles.btn} onPress={savedProfileDetails}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default UpdateProfileForm;

const styles = StyleSheet.create({
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
