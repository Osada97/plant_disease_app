import { View, Text, StyleSheet, Image } from "react-native";
import GlobalStyles from "../utils/GlobalStyles";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Comment = () => {
  return (
    <View style={styles.bottomSectionComment}>
      <View style={styles.row}>
        <View style={styles.commentCol}>
          <View style={styles.colProfile}>
            <Image
              source={require("../assets/jpgs/avatar.jpg")}
              resizeMode="cover"
              style={styles.commentPic}
            />
            <View>
              <Text style={styles.commentName}>Osada</Text>
              <Text style={styles.commentDate}>2 Days</Text>
            </View>
          </View>
          <View style={styles.commentDetails}>
            <Text style={styles.comment}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam
              tenetur, commodi ullam voluptatum tempora tempore, ipsa debitis
              hic maxime animi repudiandae atque. Distinctio aperiam id
              veritatis, quaerat reprehenderit qui. Distinctio!
            </Text>
            <View style={styles.commentImageRow}>
              <View style={styles.commentImageSec}>
                <Image
                  source={require("../assets/jpgs/earlyBlight.jpg")}
                  resizeMode="cover"
                  style={styles.commentImage}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.commentVoteCol}>
          <View style={styles.voteSec}>
            <FontAwesomeIcon icon={faThumbsUp} size={18} color="#797e85" />
            <Text style={styles.cmText}>Upvote</Text>
          </View>
          <View style={styles.voteSec}>
            <FontAwesomeIcon icon={faThumbsDown} size={18} color="#797e85" />
            <Text style={styles.cmText}>Downvote</Text>
          </View>
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
});
