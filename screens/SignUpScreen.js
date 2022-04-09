import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import GlobalStyles from "../utils/GlobalStyles";
import SignUpForm from "../components/SignUpForm";

const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.containerBottom}>
        <View style={styles.bottomTitle}>
          <View>
            <Text style={styles.title}>Register</Text>
            <Text style={styles.subTitle}>Create your own account</Text>
          </View>
          <Image
            source={require("../assets/jpgs/profile3.png")}
            style={styles.image}
          />
        </View>
        <SignUpForm navigation={navigation} />
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },

  containerBottom: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
  },
  bottomTitle: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 25,
    position: "relative",
  },
  image: {
    width: 180,
    height: 200,
    resizeMode: "cover",
    position: "absolute",
    right: 0,
    top: -50,
    opacity: 0.9,
  },
  title: {
    fontFamily: GlobalStyles.SemiBoldFonts,
    fontSize: 38,
    color: GlobalStyles.mainColor,
    textAlign: "center",
    zIndex: 1,
  },
  subTitle: {
    fontFamily: GlobalStyles.customFonts,
    fontSize: 18,
    textAlign: "center",
    color: "#8e8e8e",
    zIndex: 1,
  },
});
