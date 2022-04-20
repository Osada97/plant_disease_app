import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PostScreen = () => {
  const navigation = useNavigation();
  console.log(navigation);
  return (
    <View>
      <Text>PostScreen</Text>
    </View>
  );
};

export default PostScreen;
