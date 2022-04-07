import { useState } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "./screens/WelcomeScreen";
import {
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
  useFonts,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
import TabNavigation from "./components/TabNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

//check skip function
const CheckSkip = () => {
  const [setSkip, setsetSkip] = useState(false);

  try {
    AsyncStorage.getItem("Skip").then((value) => {
      if (value != null) {
        if (value) {
          setsetSkip(true);
        } else {
          setsetSkip(false);
        }
      } else {
        setsetSkip(false);
      }
    });
  } catch (error) {
    console.log(error);
  }

  if (setSkip) {
    return <TabNavigation />;
  } else {
    return <WelcomeScreen setsetSkip={setsetSkip} />;
  }
};

export default function App() {
  //loading fonts
  let [FontLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

  if (!FontLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        {/* check skip section */}
        <CheckSkip />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
