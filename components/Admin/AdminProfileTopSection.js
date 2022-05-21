import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import { API_KEY } from "@env";
import GlobalStyles from "../../utils/GlobalStyles";

const AdminProfileTopSection = () => {
  const { adminDetails } = useSelector((state) => state.admin);
  return (
    <View style={styles.profileTopSection}>
      <View style={styles.profileImageSec}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri:
                adminDetails.profile_picture &&
                `${API_KEY}/${adminDetails.profile_picture}`,
            }}
            style={styles.image}
          />
        </View>
        <Text style={styles.main}>{adminDetails.user_name}</Text>
      </View>
    </View>
  );
};

export default AdminProfileTopSection;

const styles = StyleSheet.create({
  profileTopSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    marginBottom: 5,
    backgroundColor: "#fff",
    borderRadius: 40,
  },
  profileImageSec: {
    alignItems: "center",
  },
  profileImageContainer: {
    position: "relative",
  },
  image: {
    width: 120,
    height: 120,
    borderColor: GlobalStyles.mainColor,
    borderWidth: 2,
    borderRadius: 100,
    marginBottom: 15,
  },
  main: {
    fontFamily: GlobalStyles.mediumFonts,
    fontSize: 21,
    color: GlobalStyles.mainColor,
  },
  sub: {
    fontFamily: GlobalStyles.customFonts,
    fontSize: 18,
    color: GlobalStyles.secondaryColor,
  },
});
