import NavigatorConstant from "./NavigatorConstants";
import Theme from "../ui/styles/Theme";
import UserHomeScreen from "../ui/screens/user/UserHomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default UserStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={NavigatorConstant.USER_STACK.HOME}>
      <Stack.Screen
        name={NavigatorConstant.USER_STACK.HOME}
        component={UserHomeScreen}
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
