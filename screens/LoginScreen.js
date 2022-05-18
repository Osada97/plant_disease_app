import { View, StyleSheet, Image, Dimensions, Text } from "react-native";
import { useEffect } from "react";
import Svg, { Path } from "react-native-svg";
import GlobalStyles from "../utils/GlobalStyles";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";

const deviceWidth = Dimensions.get("window").width;

const LoginScreen = ({ navigation }) => {
  const vWidth = 1432;
  const vHeight = 358;
  const width = Dimensions.get("window").width;
  const height = (width * vHeight) / vWidth;

  // const user = useSelector((state) => state.user);

  //if user is already login then hide login screen and view profile screen
  // useEffect(() => {
  //   if (Object.keys(user.userDetails).length > 0) {
  //     navigation.navigate("profile");
  //   }
  // }, [user]);

  return (
    <View style={styles.screen}>
      <View style={styles.containerTop}>
        <Image
          source={require("../assets/jpgs/profile.jpg")}
          style={styles.coverImage}
          resizeMode={"cover"}
        />
        <Svg
          width={width}
          height={height}
          viewBox={[0, 0, vWidth, vHeight].join(" ")}
          style={styles.svg}
        >
          <Path
            d="M1432 .5C623.6 564.9 140.833 235.667.5.5V358H1432V.5Z"
            fill="#fff"
          />
        </Svg>
      </View>
      <View style={styles.containerBottom}>
        <View style={styles.bottomTitle}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subTitle}>Login to your account</Text>
        </View>
        <LoginForm navigation={navigation} />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerTop: {
    width: deviceWidth,
    height: 325,
    position: "relative",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  svg: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  containerBottom: {
    flex: 1,
    alignItems: "center",
    paddingTop: 15,
  },
  bottomTitle: {
    width: "100%",
    marginBottom: 25,
  },
  title: {
    fontFamily: GlobalStyles.SemiBoldFonts,
    fontSize: 38,
    color: GlobalStyles.mainColor,
    textAlign: "center",
  },
  subTitle: {
    fontFamily: GlobalStyles.customFonts,
    fontSize: 18,
    textAlign: "center",
    color: "#8e8e8e",
  },
});
