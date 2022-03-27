import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "./screens/WelcomeScreen";
import {
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  useFonts,
} from "@expo-google-fonts/montserrat";
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
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
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
  },
});
