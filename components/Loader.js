import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const Loader = () => {
  return (
    <View style={styles.modelBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <LottieView source={require("../assets/loader.json")} autoPlay loop />
      </View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modelBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#fff",
  },
  activityIndicatorWrapper: {
    width: 150,
    height: 150,
    backgroundColor: "#fff",
  },
});
