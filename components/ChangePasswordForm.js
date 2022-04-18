import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from "react-native";
import GlobalStyles from "../utils/GlobalStyles";

const ChangePasswordForm = () => {
  return (
    <View style={styles.form}>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder="Current Password"
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder="New Password"
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder="Confirm New Password"
      />
      <View style={styles.btnRow}>
        <TouchableHighlight style={styles.btn}>
          <Text style={styles.btnText}>Change Password</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default ChangePasswordForm;

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
