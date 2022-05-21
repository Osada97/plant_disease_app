import { View, StyleSheet, ScrollView } from "react-native";
import GlobalStyles from "../../utils/GlobalStyles";
import AdminProfileBottomSection from "../../components/Admin/AdminProfileBottomSection";
import AdminProfileTopSection from "../../components/Admin/AdminProfileTopSection";
import { Roboto_100Thin_Italic } from "@expo-google-fonts/roboto";

const AdminProfileScreen = () => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <AdminProfileTopSection />
      <AdminProfileBottomSection />
    </ScrollView>
  );
};

export default AdminProfileScreen;

const styles = StyleSheet.create({
  screen: {
    height: "100%",
    backgroundColor: GlobalStyles.backgroundColor,
    padding: 10,
  },
});
