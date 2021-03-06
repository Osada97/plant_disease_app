import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
  ToastAndroid,
} from "react-native";
import { faSearch, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Axios from "axios";
import { API_KEY } from "@env";
import { useSelector } from "react-redux";
import GlobalStyles from "../utils/GlobalStyles";
import CommunityPost from "../components/CommunityPost";
import { useIsFocused } from "@react-navigation/native";
import Loader from "../components/Loader";
import EmptyPageComponent from "../components/EmptyPageComponent";

const AllPostsScreen = ({ navigation }) => {
  const [postData, setPostData] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  const { userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      Axios.get(
        `${API_KEY}/community/getpost`,
        Object.keys(userDetails).length > 0 && {
          headers: {
            id: userDetails.id,
          },
        }
      )
        .then((res) => {
          setIsLoading(false);
          setPostData([...res.data]);
        })
        .catch((err) => console.log(err.response.data));
    }
  }, [isRefresh, isFocused, userDetails]);

  const navigateToAskQuestion = () => {
    //check user is already logged in
    if (Object.keys(userDetails).length > 0) {
      navigation.navigate("add_post");
    } else {
      if (Platform.OS === "android") {
        ToastAndroid.show("Please Log into system", ToastAndroid.LONG);
      }
      navigation.navigate("ProfileNavigation", {
        screen: "profile",
      });
    }
  };
  if (isLoading && postData.length === 0) {
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
        {postData.length > 0 ? (
          <FlatList
            style={styles.listStyle}
            data={postData}
            renderItem={(data) => (
              <CommunityPost
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
      {/* add post section */}
      {postData.length > 0 && (
        <TouchableOpacity
          style={styles.addSection}
          onPress={() => navigateToAskQuestion()}
        >
          <FontAwesomeIcon icon={faPen} size={18} color="#fff" />
          <Text style={styles.addSectionText}>Ask Question</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AllPostsScreen;

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
  cardContainer: {
    width: "100%",
    height: "100%",
  },
});
