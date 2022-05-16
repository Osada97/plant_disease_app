import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from "react-native";
import React from "react";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GlobalStyles from "../utils/GlobalStyles";
import { API_KEY } from "@env";
import { useSelector } from "react-redux";
import Axios from "axios";

const VoteSection = ({ postDetails, setIsRefresh, isRefresh, navigation }) => {
  const { token } = useSelector((state) => state.user);
  const addUpVote = () => {
    if (token) {
      if (postDetails.isUpVoted) {
        Axios.post(
          `${API_KEY}/community/removeaddedvote/${postDetails.id}`,
          "",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
          .then(() => setIsRefresh(!isRefresh))
          .catch((err) => console.log(err.response.data));
      } else {
        Axios.post(`${API_KEY}/community/addvote/${postDetails.id}`, "", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then(() => setIsRefresh(!isRefresh))
          .catch((err) => console.log(err.response.data));
      }
    } else {
      if (Platform.OS === "android") {
        ToastAndroid.show("Please Log into system", ToastAndroid.LONG);
      }
      navigation.navigate("ProfileNavigation", {
        screen: "profile",
      });
    }
  };
  const addDownVote = () => {
    if (token) {
      if (postDetails.isDownVoted) {
        Axios.post(
          `${API_KEY}/community/removedownvote/${postDetails.id}`,
          "",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
          .then(() => setIsRefresh(!isRefresh))
          .catch((err) => console.log(err.response.data));
      } else {
        Axios.post(`${API_KEY}/community/adddownvote/${postDetails.id}`, "", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then(() => setIsRefresh(!isRefresh))
          .catch((err) => console.log(err.response.data));
      }
    } else {
      if (Platform.OS === "android") {
        ToastAndroid.show("Please Log into system", ToastAndroid.LONG);
      }
      navigation.navigate("ProfileNavigation", {
        screen: "profile",
      });
    }
  };
  return (
    <View style={styles.BottomRow}>
      <TouchableOpacity style={styles.sec} onPress={addUpVote}>
        <FontAwesomeIcon
          icon={faThumbsUp}
          size={22}
          color={
            postDetails.isUpVoted && postDetails.isUser ? "#1d917b" : "#797e85"
          }
        />
        <Text style={styles.lkText}>
          {postDetails.up_vote_count !== 0
            ? postDetails.up_vote_count
            : "Upvote"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sec} onPress={addDownVote}>
        <FontAwesomeIcon
          icon={faThumbsDown}
          size={22}
          color={
            postDetails.isDownVoted && postDetails.isUser
              ? "#cf1754"
              : "#797e85"
          }
        />
        <Text style={styles.lkText}>
          {postDetails.down_vote_count !== 0
            ? postDetails.down_vote_count
            : "Downvote"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VoteSection;

const styles = StyleSheet.create({
  BottomRow: {
    marginTop: 20,
    flexDirection: "row",
    borderTopColor: GlobalStyles.secondaryColor,
    borderTopWidth: 1,
    paddingVertical: 15,
    justifyContent: "space-around",
  },
  sec: {
    flexDirection: "row",
    alignItems: "center",
  },
  lkText: {
    fontSize: 15,
    fontFamily: GlobalStyles.customFonts,
    marginLeft: 10,
  },
});
