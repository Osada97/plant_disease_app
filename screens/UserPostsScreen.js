import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import Post from "../components/Post";
import { faSearch, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Axios from "axios";
import { API_KEY } from "@env";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import GlobalStyles from "../utils/GlobalStyles";
import Loader from "../components/Loader";

const UserPostsScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  const { token, userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    setIsLoading(true);
    Axios.get(`${API_KEY}/community/getuserposts/${userDetails.id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setIsLoading(false);
        setUserPosts([...res.data]);
      })
      .catch((err) => console.log(err));
  }, [isRefresh, isFocused]);

  if (isLoading && userPosts.length === 0) {
    return <Loader />;
  }
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
        {userPosts.length > 0 && (
          <FlatList
            style={styles.listStyle}
            data={userPosts}
            renderItem={(data) => (
              <Post
                item={data.item}
                setIsRefresh={setIsRefresh}
                isRefresh={isRefresh}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
      {/* add post section */}
      <TouchableOpacity
        style={styles.addSection}
        onPress={() => navigation.navigate("postAdd")}
      >
        <FontAwesomeIcon icon={faPen} size={18} color="#fff" />
        <Text style={styles.addSectionText}>Ask Question</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserPostsScreen;

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
