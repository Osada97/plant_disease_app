import { View, StyleSheet, FlatList, TextInput } from "react-native";
import Post from "../components/Post";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const data = [
  {
    id: 1,
    image: "../assets/jpgs/earlyBlight.jpg",
    name: "loerm ipsum loerm ipsum",
  },
  {
    id: 2,
    image: "../assets/jpgs/earlyBlight.jpg",
    name: "loerm ipsum loerm ipsum",
  },
  {
    id: 3,
    image: "../assets/jpgs/earlyBlight.jpg",
    name: "loerm ipsum loerm ipsum",
  },
];

const UserPostsScreen = () => {
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
        <FlatList
          style={styles.listStyle}
          data={data}
          renderItem={() => <Post />}
        />
      </View>
    </View>
  );
};

export default UserPostsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#eee",
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
