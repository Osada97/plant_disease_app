import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import GlobalStyles from "../utils/GlobalStyles";
import {
  faThumbsUp,
  faThumbsDown,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { API_KEY } from "@env";
import Axios from "axios";
import { useSelector } from "react-redux";

const Comment = ({ data, setIsRefresh, isRefresh }) => {
  const [optionSec, setOptionSec] = useState(false);
  const { token } = useSelector((state) => state.user);

  const addUpVote = () => {
    if (!data.isUpVoted) {
      Axios.post(`${API_KEY}/community/comment/upvote/${data.id}`, "", {
        headers: { Authorization: "Bearer " + token },
      })
        .then(() => setIsRefresh(!isRefresh))
        .catch((err) => console.log(err.response.data));
    } else {
      Axios.delete(`${API_KEY}/community/comment/removeupvote/${data.id}`, {
        headers: { Authorization: "Bearer " + token },
      })
        .then(() => setIsRefresh(!isRefresh))
        .catch((err) => console.log(err.response.data));
    }
  };

  const addDownVote = () => {
    if (!data.isDownVoted) {
      Axios.post(`${API_KEY}/community/comment/downvote/${data.id}`, "", {
        headers: { Authorization: "Bearer " + token },
      })
        .then(() => setIsRefresh(!isRefresh))
        .catch((err) => console.log(err.response.data));
    } else {
      Axios.delete(
        `${API_KEY}/community/comment/removedownvote/${data.id}`,

        {
          headers: { Authorization: "Bearer " + token },
        }
      )
        .then(() => setIsRefresh(!isRefresh))
        .catch((err) => console.log(err.response.data));
    }
  };

  return (
    <View style={styles.bottomSectionComment}>
      <View style={styles.row}>
        <View style={[styles.commentCol, { position: "relative" }]}>
          <View style={styles.colProfile}>
            <Image
              source={{ uri: `${API_KEY}/${data.user.profile_picture}` }}
              resizeMode="cover"
              style={styles.commentPic}
            />
            <View>
              <Text style={styles.commentName}>{data.user.first_name}</Text>
              <Text style={styles.commentDate}>2 Days</Text>
            </View>
          </View>
          <View style={styles.commentDetails}>
            <Text style={styles.comment}>{data.comment}</Text>
            <View style={styles.commentImageRow}>
              {data.default_image == null && (
                <View style={styles.commentImageSec}>
                  <Image
                    source={require("../assets/jpgs/earlyBlight.jpg")}
                    resizeMode="cover"
                    style={styles.commentImage}
                  />
                </View>
              )}
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
                  style={[
                    styles.button,
                    { borderBottomWidth: 1, borderBottomColor: "#c9c9c9" },
                  ]}
                >
                  <Text style={styles.buttonText}>Setting</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={[styles.buttonText, { color: "#cf1754" }]}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Pressable>
        </View>
        <View style={styles.commentVoteCol}>
          <TouchableOpacity style={styles.voteSec} onPress={addUpVote}>
            <FontAwesomeIcon
              icon={faThumbsUp}
              size={18}
              color={data.isUpVoted ? "#1d917b" : "#797e85"}
            />
            <Text style={styles.cmText}>
              {data.up_vote_count > 0 ? data.up_vote_count : "Upvote"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.voteSec} onPress={addDownVote}>
            <FontAwesomeIcon
              icon={faThumbsDown}
              size={18}
              color={data.isDownVoted ? "#cf1754" : "#797e85"}
            />
            <Text style={styles.cmText}>
              {data.down_vote_count > 0 ? data.down_vote_count : "Downvote"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  bottomSectionComment: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  row: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
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
