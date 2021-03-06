import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import GlobalStyles from "../utils/GlobalStyles";
import { WelcomeOne, WelcomeTwo, WelcomeThree } from "../assets/svgs/Welcome";

const WelcomeComponents = ({ item }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.imRowContainer}>
        {item.id === 1 ? (
          <ImageSectionOne width={width} />
        ) : item.id === 2 ? (
          <ImageSectionTwo width={width} />
        ) : (
          <ImageSectionThree width={width} />
        )}
      </View>
      <View style={styles.TextRow}>
        <View>
          <Text style={styles.mainText}>{item.title}</Text>
        </View>
        <View>
          <Text style={styles.subText}>{item.description}</Text>
        </View>
      </View>
    </View>
  );
};

const ImageSectionOne = ({ width }) => {
  return (
    <>
      <View style={styles.imageRow}>
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
      </View>
      <View style={[styles.svgSection, { width, aspectRatio: 1 }]}>
        <WelcomeOne />
      </View>
    </>
  );
};
const ImageSectionTwo = ({ width }) => {
  return (
    <>
      <View style={[styles.imageRow, styles.imageRowSec]}>
        <View style={{ alignItems: "flex-end" }}>
          <Image
            style={styles.imageSecond}
            source={require("../assets/jpgs/welcome1.jpg")}
            resizeMode="cover"
          />
          <Image
            style={[styles.imageSecond, styles.smallImage]}
            source={require("../assets/jpgs/welcome2.jpg")}
            resizeMode="cover"
          />
        </View>
        <View>
          <Image
            style={[styles.imageSecond, styles.smallImage]}
            source={require("../assets/jpgs/welcome3.jpg")}
            resizeMode="cover"
          />
          <Image
            style={styles.imageSecond}
            source={require("../assets/jpgs/welcome1.jpg")}
            resizeMode="cover"
          />
        </View>
      </View>
      <View style={[styles.svgSection, { width, aspectRatio: 1 }]}>
        <WelcomeTwo />
      </View>
    </>
  );
};
const ImageSectionThree = ({ width }) => {
  return (
    <>
      <View style={[styles.imageRow, styles.imageRowSec]}>
        <View>
          <Image
            style={styles.imageThird}
            source={require("../assets/jpgs/welcome1.jpg")}
            resizeMode="cover"
          />
        </View>
      </View>
      <View style={[styles.svgSection, { width, aspectRatio: 1 }]}>
        <WelcomeThree />
      </View>
    </>
  );
};

export { WelcomeComponents };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imRowContainer: {
    flex: 0.5,
    position: "relative",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 25,
  },
  imageRow: {
    position: "relative",
    zIndex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 40,
  },
  svgSection: {
    position: "absolute",
    justifyContent: "flex-end",
    alignItems: "center",
    top: -25,
    left: 0,
  },
  image: {
    width: 130,
    height: 200,
    borderRadius: 25,
  },
  image2: {
    marginTop: 40,
  },
  imageRowSec: {
    justifyContent: "space-around",
  },
  imageSecond: {
    width: 155,
    height: 160,
    borderRadius: 25,
    marginBottom: 10,
  },
  smallImage: {
    width: 105,
    height: 92,
  },
  imageThird: {
    width: 230,
    height: 280,
    borderRadius: 25,
  },
  TextRow: {
    flex: 0.5,
    justifyContent: "center",
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
});
