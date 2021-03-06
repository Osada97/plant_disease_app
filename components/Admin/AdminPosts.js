import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GlobalStyles from "../../utils/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { API_KEY } from "@env";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import PostImageSection from "../PostImageSection";
import { formatDistanceToNow, parseISO } from "date-fns";

const AdminPosts = ({ item, setIsRefresh, isRefresh }) => {
  const [postImages, setPostImages] = useState([]);
  const [optionSec, setOptionSec] = useState(false);
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.admin);
  //take images
  useEffect(() => {
    getImages();
  }, [item]);

  const getImages = () => {
    if (item.images.length > 0) {
      setPostImages([...item.images]);
    } else {
      const imgObg = {
        image_name: item.default_image,
      };
      setPostImages([imgObg]);
    }
  };

  const navigateToPost = () => {
    navigation.navigate("adminPostDetails", { id: item.id });
  };

  const postOption = (type, id) => {
    Alert.alert(
      `${type} Question`,
      `Are you sure you want to ${type} this question?`,
      [
        { text: "No" },
        {
          text: type,
          onPress: () => {
            if (type === "Approve") {
              Axios.post(`${API_KEY}/admin/approvepost/${id}`, "", {
                headers: {
                  Authorization: "Bearer " + token,
                },
              })
                .then(() => setIsRefresh(!isRefresh))
                .catch((err) => console.log(err.response.data));
            } else {
              Axios.post(`${API_KEY}/admin/disapprovepost/${id}`, "", {
                headers: {
                  Authorization: "Bearer " + token,
                },
              })
                .then(() => setIsRefresh(!isRefresh))
                .catch((err) => console.log(err.response.data));
            }
          },
        },
      ]
    );
  };

  //delete the post
  const deletePost = (id) => {
    Alert.alert(
      "Remove Question",
      "Are you sure you want to Remove this question?",
      [
        { text: "No" },
        {
          text: "Remove",
          onPress: () => {
            Axios.delete(`${API_KEY}/admin/removepost/${id}`, {
              headers: { Authorization: "Bearer " + token },
            })
              .then(() => setIsRefresh(!isRefresh))
              .catch((err) => console.log(err));
          },
        },
      ]
    );
  };

  return (
    <Pressable
      style={[styles.card, !item.is_approve && styles.disCard]}
      onPress={() => navigateToPost()}
    >
      {!item.default_image && <PostImageSection postImages={postImages} />}

      <Pressable
        style={[styles.infoContainer, optionSec && styles.overlay]}
        onPress={() => setOptionSec(false)}
      >
        <Pressable style={styles.info} onPress={() => setOptionSec(!optionSec)}>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            size={20}
            color={GlobalStyles.mainColor}
          />
        </Pressable>
        {optionSec && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                { borderBottomWidth: 1, borderBottomColor: "#c9c9c9" },
              ]}
              onPress={() =>
                postOption(item.is_approve ? "Disapprove" : "Approve", item.id)
              }
            >
              <Text style={styles.buttonText}>
                {item.is_approve ? "Disapprove" : "Approve"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => deletePost(item.id)}
            >
              <Text style={[styles.buttonText, { color: "#cf1754" }]}>
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Pressable>

      <View style={styles.contentSection}>
        <View style={styles.userRow}>
          <Image
            style={styles.profileImage}
            source={{ uri: `${API_KEY}/${item.owner.profile_picture}` }}
          />
          <View>
            <Text style={styles.name}>
              {item.owner.first_name + " " + item.owner.last_name}
            </Text>
            <Text style={styles.location}>{item.owner.location}</Text>
            <Text style={styles.time}>
              {formatDistanceToNow(parseISO(item.post_date))} Ago
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.mainText}>{item.post_title}</Text>
          <Text style={styles.disText}>{item.description}</Text>
        </View>
        {!item.is_approve && (
          <View style={styles.textCont}>
            <Text style={styles.textContText}>This Post Not Approved Yet</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default AdminPosts;

const styles = StyleSheet.create({
  card: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    marginBottom: 15,
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  disCard: {
    backgroundColor: "#f7f7f7",
  },
  contentSection: {
    flex: 0.5,
    padding: 15,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 20,
  },
  name: {
    fontFamily: GlobalStyles.customFonts,
    fontSize: 15,
    color: GlobalStyles.mainColor,
  },
  location: {
    fontFamily: GlobalStyles.customFonts,
    fontSize: 14,
    color: GlobalStyles.secondaryColor,
  },
  time: {
    fontFamily: GlobalStyles.customFonts,
    fontSize: 13,
    color: GlobalStyles.secondaryColor,
  },
  mainText: {
    fontSize: 16,
    fontFamily: GlobalStyles.mediumFonts,
    lineHeight: 20,
    marginBottom: 5,
    textTransform: "capitalize",
  },
  disText: {
    fontSize: 14,
    color: GlobalStyles.secondaryColor,
    lineHeight: 20,
    marginBottom: 12,
  },
  textCont: {
    width: "100%",
    alignItems: "center",
    padding: 5,
  },
  textContText: {
    fontSize: 14,
    fontFamily: GlobalStyles.mediumFonts,
  },
  infoContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  overlay: {
    width: "100%",
    height: "100%",
    alignItems: "flex-end",
    zIndex: 1,
  },
  info: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#eee",
  },
  buttonContainer: {
    backgroundColor: "#f7f7f7",
    marginTop: 10,
    paddingVertical: 8,
    width: 100,
    borderRadius: 5,
  },
  button: {
    paddingVertical: 3,
  },
  buttonText: {
    fontFamily: GlobalStyles.customFonts,
    fontSize: 15,
    textAlign: "center",
    color: "#575757",
  },
});
