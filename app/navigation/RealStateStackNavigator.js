import NavigatorConstant from "./NavigatorConstants";
import Theme from "../ui/styles/Theme";
import RealStateHomeScreen from "../ui/screens/realstate/RealstateHomeScreen";
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
    </Stack.Navigator>
  );
};