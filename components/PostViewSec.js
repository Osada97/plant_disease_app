import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import {
  faThumbsUp,
  faThumbsDown,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GlobalStyles from "../utils/GlobalStyles";
import { API_KEY } from "@env";
import PostImageSection from "./PostImageSection";

const PostViewSec = ({ postDetails }) => {
  const { owner, images } = postDetails;
  const [optionSec, setOptionSec] = useState(false);

  return (
    <View style={styles.topContainerCard}>
      <View style={{ position: "relative" }}>
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
            <Text style={styles.time}>One Day Ago</Text>
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
      <View>
        <View style={styles.content}>
          <Text style={styles.title}>{postDetails.post_title || ""}</Text>
          <Text style={styles.description}>
            {postDetails.description || ""}
          </Text>
        </View>
        {postDetails.is_approve ? (
          <View style={styles.BottomRow}>
            <View style={styles.sec}>
              <FontAwesomeIcon
                icon={faThumbsUp}
                size={22}
                color={postDetails.isUpVoted ? "#1d917b" : "#797e85"}
              />
              <Text style={styles.lkText}>
                {postDetails.up_vote_count !== 0
                  ? postDetails.up_vote_count
                  : "Upvote"}
              </Text>
            </View>
            <View style={styles.sec}>
              <FontAwesomeIcon
                icon={faThumbsDown}
                size={22}
                color={postDetails.isDownVoted ? "#cf1754" : "#797e85"}
              />
              <Text style={styles.lkText}>
                {postDetails.down_vote_count !== 0
                  ? postDetails.down_vote_count
                  : "Downvote"}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.textCont}>
            <Text style={styles.textContText}>This Post Not Approved Yet</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default PostViewSec;

const styles = StyleSheet.create({
  topContainerCard: {
    padding: 10,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 20,
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
