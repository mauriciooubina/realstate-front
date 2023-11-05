import NavigatorConstant from "./NavigatorConstants";
import Theme from "../ui/styles/Theme";
import CreateRealStateScreen from "../ui/screens/createRealstate/CreateRealstateScreen";
import EditRealStateScreen from "../ui/screens/editRealstate/EditRealstateScreen";
import RealStateHomeScreen from "../ui/screens/realstate/RealStateHomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LeftHeaderIcon, RightHeaderIcon } from "../components/HeaderComponent";
import React from 'react';
import EditProfileRealstateScreen from '../ui/screens/profileRealstate/EditProfileRealstateScreen';

const Stack = createNativeStackNavigator();

export default RealStateStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={NavigatorConstant.REALSTATE_STACK.CREATE}>
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
          headerLeft: () => <LeftHeaderIcon/>,
          headerRight: () => <RightHeaderIcon/>,
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
      <Stack.Screen
        name={NavigatorConstant.REALSTATE_STACK.EDIT_PROFILE}
        component={EditProfileRealstateScreen}
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
