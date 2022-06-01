import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TextInput } from "react-native";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Axios from "axios";
import { API_KEY } from "@env";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import GlobalStyles from "../../utils/GlobalStyles";
import AdminPosts from "../../components/Admin/AdminPosts";
import EmptyPageComponent from "../../components/EmptyPageComponent";

const AdminApprovedPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const isFocused = useIsFocused();
  const { token } = useSelector((state) => state.admin);

  useEffect(() => {
    Axios.get(`${API_KEY}/admin/getapprovepost`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => setUserPosts([...res.data]))
      .catch((err) => console.log(err));
  }, [isRefresh, isFocused]);

  return (
    <View style={styles.screen}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <FontAwesomeIcon icon={faSearch} size={20} color="#8e8e8e" />
          <TextInput
            placeholder="Search in Community"
            style={styles.searchInput}
          />
        </View>
      </View>
      <View style={styles.cardContainer}>
        {userPosts.length > 0 ? (
          <FlatList
            style={styles.listStyle}
            data={userPosts}
            renderItem={(data) => (
              <AdminPosts
                item={data.item}
                setIsRefresh={setIsRefresh}
                isRefresh={isRefresh}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <EmptyPageComponent />
        )}
      </View>
    </View>
  );
};

export default AdminApprovedPosts;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: GlobalStyles.backgroundColor,
    paddingBottom: 45,
  },
  listStyle: {
    padding: 10,
  },
  searchContainer: {
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#eee",
    padding: 4,
    borderWidth: 1,
    borderRadius: 2,
  },
  searchInput: {
    width: "93%",
    backgroundColor: "#fff",
    marginLeft: 5,
  },
  addSection: {
    position: "absolute",
    bottom: 10,
    right: 20,
    width: 150,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: GlobalStyles.mainColor,
    padding: 15,
    borderRadius: 15,
  },
  addSectionText: {
    fontFamily: GlobalStyles.mediumFonts,
    color: "#fff",
  },
});
