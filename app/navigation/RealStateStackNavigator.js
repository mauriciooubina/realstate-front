import NavigatorConstant from "./NavigatorConstants";
import Theme from "../ui/styles/Theme";
import CreateRealStateScreen from "../ui/screens/createRealstate/CreateRealstateScreen";
import EditRealStateScreen from "../ui/screens/editRealstate/EditRealstateScreen";
import RealStateHomeScreen from "../ui/screens/realstate/RealStateHomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default RealStateStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={NavigatorConstant.REALSTATE_STACK.HOME}>
      <Stack.Screen
        name={NavigatorConstant.REALSTATE_STACK.HOME}
        component={RealStateHomeScreen}
        options={{
          headerTitle: "My Home",
          headerTitleAlign: "center",
          presentation: "containedModal",
          headerStyle: {
            backgroundColor: Theme.colors.clear.SECONDARY,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 24,
          },
        }}
      />
      <Stack.Screen
        name={NavigatorConstant.REALSTATE_STACK.CREATE}
        component={CreateRealStateScreen}
        options={{
          headerTitle: "My Home",
          headerTitleAlign: "center",
          presentation: "containedModal",
          headerStyle: {
            backgroundColor: Theme.colors.clear.SECONDARY,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 24,
          },
        }}
      />
      <Stack.Screen
        name={NavigatorConstant.REALSTATE_STACK.EDIT}
        component={EditRealStateScreen}
        options={{
          headerTitle: "My Home",
          headerTitleAlign: "center",
          presentation: "containedModal",
          headerStyle: {
            backgroundColor: Theme.colors.clear.SECONDARY,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 24,
          },
        }}
      />
    </Stack.Navigator>
  );
};
