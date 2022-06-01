import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GlobalStyles from "../../utils/GlobalStyles";
import { API_KEY } from "@env";
import PostImageSection from "../PostImageSection";
import { useSelector } from "react-redux";
import Axios from "axios";
import { formatDistanceToNow, parseISO } from "date-fns";

const AdminPostViewSec = ({
  postDetails,
  setIsRefresh,
  isRefresh,
  navigation,
}) => {
  const { owner, images } = postDetails;
  const [optionSec, setOptionSec] = useState(false);

  const { token } = useSelector((state) => state.admin);

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
              .then(() => navigation.goBack())
              .catch((err) => console.log(err));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.topContainerCard}>
      <View>
        <PostImageSection postImages={images} />
        <View style={styles.contentContainer}>
          <View style={styles.proPicSec}>
            <Image
              source={{ uri: `${API_KEY}/${owner.profile_picture}` }}
              style={styles.proPicImage}
            />
          </View>
          <View style={styles.detailsUser}>
            <Text style={styles.name}>{`${owner.first_name || ""} ${
              owner.last_name || ""
            }`}</Text>
            <Text style={styles.location}>{owner.location || ""}</Text>
            <Text style={styles.time}>
              {formatDistanceToNow(parseISO(postDetails.post_date))} Ago
            </Text>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.content}>
          <Text style={styles.title}>{postDetails.post_title || ""}</Text>
          <Text style={styles.description}>
            {postDetails.description || ""}
          </Text>
        </View>
        {!postDetails.is_approve && (
          <View style={styles.textCont}>
            <Text style={styles.textContText}>This Post Not Approved Yet</Text>
          </View>
        )}
      </View>
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
                postOption(
                  postDetails.is_approve ? "Disapprove" : "Approve",
                  postDetails.id
                )
              }
            >
              <Text style={styles.buttonText}>
                {postDetails.is_approve ? "Disapprove" : "Approve"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => deletePost(postDetails.id)}
            >
              <Text style={[styles.buttonText, { color: "#cf1754" }]}>
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default AdminPostViewSec;

const styles = StyleSheet.create({
  topContainerCard: {
    padding: 10,
    paddingBottom: 15,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 20,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    opacity: 0.8,
  },
  contentContainer: {
    width: "100%",
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  proPicSec: {
    width: 70,
    height: 70,
    borderRadius: 50,
    overflow: "hidden",
    padding: 2,
    backgroundColor: "#8e8e8e",
    shadowColor: "#eee",
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 20,
    elevation: 10,
  },
  proPicImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  detailsUser: {
    flex: 0.95,
  },
  name: {
    fontSize: 17,
    fontFamily: GlobalStyles.mediumFonts,
    color: GlobalStyles.mainColor,
  },
  location: {
    fontSize: 14,
    color: GlobalStyles.secondaryColor,
    fontFamily: GlobalStyles.customFonts,
  },
  time: {
    fontSize: 13,
    color: GlobalStyles.secondaryColor,
    fontFamily: GlobalStyles.customFonts,
  },
  title: {
    fontFamily: GlobalStyles.mediumFonts,
    fontSize: 16,
    lineHeight: 25,
    color: GlobalStyles.mainColor,
    textTransform: "capitalize",
  },
  description: {
    fontFamily: GlobalStyles.customFonts,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    color: GlobalStyles.secondaryColor,
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
    top: 20,
    right: 20,
  },
  overlay: {
    width: "98%",
    height: "98%",
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
