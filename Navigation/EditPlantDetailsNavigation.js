import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PredictPlantDetails from "../screens/Admin/PredictPlantDetails";
import EditPlantForm from "../screens/Admin/EditPlantForm";
import EditPlantDisease from "../screens/Admin/EditPlantDisease";
import EditPlantDiseaseMedi from "../screens/Admin/EditPlantDiseaseMedi";

const Stack = createNativeStackNavigator();

const EditPlantDetailsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="editPlantMenu" component={PredictPlantDetails} />
      <Stack.Screen name="plantForm" component={EditPlantForm} />
      <Stack.Screen name="editPlantDisease" component={EditPlantDisease} />
      <Stack.Screen
        name="editPlantDiseaseMedicine"
        component={EditPlantDiseaseMedi}
      />
    </Stack.Navigator>
  );
};

export default EditPlantDetailsNavigation;
