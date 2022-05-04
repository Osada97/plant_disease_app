import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GlobalStyles from "../utils/GlobalStyles";
import * as ImagePicker from "expo-image-picker";

const CustomHeaderInPostSetting = ({ setImage, image, editComment }) => {
  const addImageButton = async () => {
    const galleryStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (galleryStatus.status === "granted") {
      pickImage();
    } else {
      return <Text>Permission Denied</Text>;
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
      allowsMultipleSelection: true,
    });
    if (!result.cancelled) {
      if (image.length < 2) {
        setImage([...image, { uri: result.uri }]);
      } else {
        if (Platform.OS === "android") {
          ToastAndroid.show("Cannot add three images", ToastAndroid.LONG);
        } else {
          Alert.alert("Message", "Cannot add three images", [{ text: "Ok" }], {
            cancelable: true,
          });
        }
      }
    }
  };

  return (
    <View style={styles.customHeader}>
      <Text style={styles.headerText}>Edit Your Question</Text>
      <View style={styles.headerButtons}>
        <TouchableOpacity onPress={addImageButton}>
          <FontAwesomeIcon
            icon={faPaperclip}
            size={20}
            color={GlobalStyles.mainColor}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => editComment()}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeaderInPostSetting;

const styles = StyleSheet.create({
  customHeader: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
    paddingVertical: 15,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  headerText: {
    flex: 0.8,
    fontFamily: GlobalStyles.SemiBoldFonts,
    fontSize: 19,
    color: GlobalStyles.mainColor,
  },
  headerButtons: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    color: GlobalStyles.mainColor,
  },
});
