import React from "react";
import NavigatorConstant from "./NavigatorConstants";
import Theme from "../ui/styles/Theme";
import UserHomeScreen from "../ui/screens/user/UserHomeScreen";
import UserFavHomeScreen from "../ui/screens/userFav/UserFavHomeScreen";
import EditProfileUserScreen from "../ui/screens/profileUser/EditProfileUserScreen";
import UserSearchScreen from "../ui/screens/userSearch/UserSearchScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LeftUserIcon, RightSearchIcon } from "../components/HeaderComponent";
import ViewPropertyScreen from "../ui/screens/viewProperty/ViewPropertyScreen";
import ContactScreen from "../ui/screens/contact/ContactScreen";
import ReserveScreen from "../ui/screens/reserve/ReserveScreen";
import ExperienceScreen from "../ui/screens/experience/ExperienceScreen";
import VisitScreen from '../ui/screens/visit/VisitScreen';
import PaymentScreen from '../ui/screens/reserve/PaymentScreen';
import PaySuccessScreen from "../ui/screens/reserve/PaySuccessScreen";

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
          headerLeft: () => <LeftUserIcon />,
          headerRight: () => <RightSearchIcon />,
        }}
      />
      <Stack.Screen
        name={NavigatorConstant.USER_STACK.HOME_FAV}
        component={UserFavHomeScreen}
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
          headerRight: () => <RightSearchIcon />,
        }}
      />
      <Stack.Screen
        name={NavigatorConstant.USER_STACK.EDIT_PROFILE}
        component={EditProfileUserScreen}
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
        name={NavigatorConstant.USER_STACK.SEARCH}
        component={UserSearchScreen}
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
        name={NavigatorConstant.USER_STACK.VIEW}
        component={ViewPropertyScreen}
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
        name={NavigatorConstant.USER_STACK.CONTACT}
        component={ContactScreen}
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
        name={NavigatorConstant.USER_STACK.RESERVE}
        component={ReserveScreen}
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
        name={NavigatorConstant.USER_STACK.EXPERIENCE}
        component={ExperienceScreen}
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
        name={NavigatorConstant.USER_STACK.VISIT}
        component={VisitScreen}
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
        name={NavigatorConstant.USER_STACK.PAY}
        component={PaymentScreen}
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
        name={NavigatorConstant.USER_STACK.PAY_SUCCESS}
        component={PaySuccessScreen}
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
