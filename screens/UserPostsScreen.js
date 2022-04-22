import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TextInput } from "react-native";
import Post from "../components/Post";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Axios from "axios";
import { API_KEY } from "@env";
import { useSelector } from "react-redux";

const UserPostsScreen = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const { token, userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    Axios.get(`${API_KEY}/community/getuserposts/${userDetails.id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => setUserPosts([...res.data]))
      .catch((err) => console.log(err));
  }, [isRefresh]);

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
    </View>
  );
};

export default UserPostsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#eee",
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
});
