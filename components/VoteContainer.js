import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GlobalStyles from "../utils/GlobalStyles";

const VoteContainer = ({ item, addUpVote, addDownVote }) => {
  return (
    <View style={styles.social}>
      <TouchableOpacity style={styles.sec} onPress={addUpVote}>
        <FontAwesomeIcon
          icon={faThumbsUp}
          size={22}
          color={item.isUpVoted ? "#1d917b" : "#797e85"}
        />
        <Text style={styles.lkText}>
          {item.up_vote_count !== 0 ? item.up_vote_count : "Upvote"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sec} onPress={addDownVote}>
        <FontAwesomeIcon
          icon={faThumbsDown}
          size={22}
          color={item.isDownVoted ? "#cf1754" : "#797e85"}
        />
        <Text style={styles.lkText}>
          {item.down_vote_count !== 0 ? item.down_vote_count : "Downvote"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VoteContainer;

const styles = StyleSheet.create({
  social: {
    borderTopColor: "#eee",
    borderTopWidth: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 10,
  },
  sec: {
    flexDirection: "row",
    paddingHorizontal: 8,
  },
  lkText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: GlobalStyles.customFonts,
    color: "#797e85",
  },
});
