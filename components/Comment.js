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
import GlobalStyles from "../utils/GlobalStyles";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { API_KEY } from "@env";
import Axios from "axios";
import { useSelector } from "react-redux";
import { formatDistanceToNow, parseISO } from "date-fns";

const Comment = ({ data, setIsRefresh, isRefresh }) => {
  const [optionSec, setOptionSec] = useState(false);

  const { token } = useSelector((state) => state.admin);

  const deleteComment = (id) => {
    Alert.alert(
      "Remove Comment",
      "Are you sure you want to Remove this comment?",
      [
        { text: "Cancel" },
        {
          text: "Delete",
          onPress: () => {
            Axios.delete(`${API_KEY}/admin/removecomment/${id}`, {
              headers: { Authorization: "Bearer " + token },
            })
              .then(() => {
                setIsRefresh(!isRefresh);
                setOptionSec(false);
              })
              .catch((err) => console.log(err.response.data));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.bottomSectionComment}>
      <View style={styles.row}>
        <View style={styles.commentCol}>
          <View style={styles.colProfile}>
            <Image
              source={{ uri: `${API_KEY}/${data.user.profile_picture}` }}
              resizeMode="cover"
              style={styles.commentPic}
            />
            <View>
              <Text style={styles.commentName}>{data.user.first_name}</Text>
              <Text style={styles.commentDate}>
                {formatDistanceToNow(parseISO(data.comment_date))} Ago
              </Text>
            </View>
          </View>
          <View style={styles.commentDetails}>
            <Text style={styles.comment}>{data.comment}</Text>
            <View style={styles.commentImageRow}>
              {data.default_image == null &&
                data.image.length > 0 &&
                data.image.map((data) => (
                  <View style={styles.commentImageSec} key={data.id}>
                    <Image
                      source={{ uri: `${API_KEY}/${data.image_name}` }}
                      resizeMode="cover"
                      style={styles.commentImage}
                    />
                  </View>
                ))}
            </View>
          </View>
        </View>
        <Pressable
          style={[styles.infoContainer, optionSec && styles.overlay]}
          onPress={() => setOptionSec(false)}
        >
          <Pressable
            style={styles.info}
            onPress={() => setOptionSec(!optionSec)}
          >
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              size={20}
              color={GlobalStyles.mainColor}
            />
          </Pressable>
          {optionSec && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => deleteComment(data.id)}
              >
                <Text style={[styles.buttonText, { color: "#cf1754" }]}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  bottomSectionComment: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    position: "relative",
  },
  row: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    borderColor: "#cfe3da",
    borderWidth: 1,
  },
  commentPic: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  commentCol: {
    flex: 0.9,
  },
  commentVoteCol: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 5,
  },
  voteSec: {
    margin: 10,
    flexDirection: "row",
  },
  cmText: {
    fontFamily: GlobalStyles.customFonts,
    marginLeft: 5,
    color: GlobalStyles.secondaryColor,
  },
  colProfile: {
    flexDirection: "row",
  },
  commentName: {
    fontSize: 15,
    fontFamily: GlobalStyles.mediumFonts,
  },
  commentDate: {
    fontSize: 13,
    fontFamily: GlobalStyles.customFonts,
    color: GlobalStyles.secondaryColor,
  },
  commentImageRow: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
  },
  commentDetails: {
    paddingTop: 5,
  },
  comment: {
    fontFamily: GlobalStyles.customFonts,
    color: "#383838",
  },
  commentImageSec: {
    flex: 1,
    margin: 1,
  },
  commentImage: {
    width: "100%",
    height: 130,
    borderRadius: 5,
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
