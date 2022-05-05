import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GlobalStyles from "../utils/GlobalStyles";
import { API_KEY } from "@env";
import * as ImagePicker from "expo-image-picker";

const ProfileImageSec = ({ userDetails, proPic, setProPic }) => {
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
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: true,
    });
    if (!result.cancelled) {
      setProPic({ edited: true, uri: result.uri });
    }
  };

  useEffect(() => {
    if (userDetails) {
      setProPic(userDetails.profile_picture);
    }
  }, [userDetails]);

  return (
    <View style={styles.profileImageSec}>
      <View style={styles.profileImageContainer}>
        <Image
          source={{
            uri: proPic.edited ? proPic.uri : `${API_KEY}/${proPic}`,
          }}
          style={styles.image}
        />
        <TouchableOpacity style={styles.upSec} onPress={addImageButton}>
          <FontAwesomeIcon icon={faCamera} size={18} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileImageSec;

const styles = StyleSheet.create({
  profileImageSec: {
    alignItems: "center",
  },
  profileImageContainer: {
    position: "relative",
  },
  upSec: {
    position: "absolute",
    bottom: "20%",
    right: "0%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
  },
  image: {
    width: 120,
    height: 120,
    borderColor: GlobalStyles.mainColor,
    borderWidth: 2,
    borderRadius: 100,
    marginBottom: 15,
  },
});
