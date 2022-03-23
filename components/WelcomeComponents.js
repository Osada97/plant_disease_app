import { View, Text, StyleSheet, Image } from "react-native";
import GlobalStyles from "../utils/GlobalStyles";
import React from "react";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";

const WelcomeComponents = ({ item }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.imageRow}>
        {item.id === 1 ? (
          <ImageSectionOne />
        ) : item.id === 2 ? (
          <ImageSectionTwo />
        ) : (
          <ImageSectionThree />
        )}
      </View>
      <View style={styles.TextRow}>
        <View style={styles.mainTextRow}>
          <Text style={styles.mainText}>{item.title}</Text>
        </View>
        <View>
          <Text style={styles.subText}>{item.description}</Text>
        </View>
      </View>
    </View>
  );
};

const ImageSectionOne = () => {
  return (
    <>
      <View>
        <Image
          style={styles.image}
          source={require("../assets/jpgs/welcome1.jpg")}
          resizeMode="contain"
        />
      </View>
      <View>
        <Image
          style={[styles.image, styles.image2]}
          source={require("../assets/jpgs/welcome2.jpg")}
          resizeMode="contain"
        />
      </View>
      <View>
        <Image
          style={styles.image}
          source={require("../assets/jpgs/welcome3.jpg")}
          resizeMode="contain"
        />
      </View>
    </>
  );
};
const ImageSectionTwo = () => {
  return (
    <>
      <View>
        <Image
          style={styles.image}
          source={require("../assets/jpgs/welcome1.jpg")}
          resizeMode="contain"
        />
      </View>
      <View>
        <Image
          style={[styles.image, styles.image2]}
          source={require("../assets/jpgs/welcome2.jpg")}
          resizeMode="contain"
        />
      </View>
    </>
  );
};
const ImageSectionThree = () => {
  return (
    <>
      <View>
        <Image
          style={styles.image}
          source={require("../assets/jpgs/welcome1.jpg")}
          resizeMode="contain"
        />
      </View>
    </>
  );
};

export { WelcomeComponents };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 40,
  },
  image: {
    width: 130,
    height: 180,
    borderRadius: 25,
  },
  image2: {
    marginTop: 40,
  },
  mainText: {
    textAlign: "center",
    fontSize: 40,
    fontFamily: GlobalStyles.SemiBoldFonts,
    marginBottom: 30,
  },
  subText: {
    textAlign: "center",
    fontSize: 18,
    color: "#777",
    lineHeight: 25,
  },
  ButtonRow: {
    marginTop: 40,
  },
  Button: {
    width: "100%",
    backgroundColor: GlobalStyles.buttonColor,
    padding: 15,
    borderRadius: 10,
  },
  ButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
});
