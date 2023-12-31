import NavigatorConstant from "./NavigatorConstants";
import Theme from "../ui/styles/Theme";
import LoginScreen from "../ui/screens/login/LoginScreen";
import RegisterScreen from "../ui/screens/register/RegisterScreen";
import RealStateLoginScreen from "../ui/screens/login/RealStateLoginScreen";
import GoogleLoginScreen from "../ui/screens/login/GoogleLoginScreen";
import ForgotPasswordScreen from "../ui/screens/forgotPassword/ForgotPasswordScreen";
import MailSentScreen from "../ui/screens/forgotPassword/MailSentScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default LoginStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={NavigatorConstant.LOGIN_STACK.LOGIN}>
      <Stack.Screen
        name={NavigatorConstant.LOGIN_STACK.LOGIN}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={NavigatorConstant.LOGIN_STACK.GOOGLE_LOGIN}
        component={GoogleLoginScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={NavigatorConstant.LOGIN_STACK.REALSTATE_LOGIN}
        component={RealStateLoginScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={NavigatorConstant.LOGIN_STACK.PASSWORD_RECOVERY}
        component={ForgotPasswordScreen}
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
        name={NavigatorConstant.LOGIN_STACK.EMAIL_SENT}
        component={MailSentScreen}
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
        name={NavigatorConstant.LOGIN_STACK.REGISTER}
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
