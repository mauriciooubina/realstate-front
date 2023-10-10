import SplashScreen from '../ui/screens/splash/SplashScreen';
import LoginStackNavigator from './LoginStackNavigator';
import NavigatorConstant from './NavigatorConstants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default RootNavigator = () => {
 return (
   <NavigationContainer>
     <Stack.Navigator
       initialRouteName={NavigatorConstant.NAVIGATOR.START}
       screenOptions={{headerShown: false}}
       headerMode="none">
       <Stack.Screen
         name={NavigatorConstant.NAVIGATOR.START}
         component={SplashScreen}
       />
       <Stack.Screen
         name={NavigatorConstant.NAVIGATOR.LOGIN}
         component={LoginStackNavigator}
       />
     </Stack.Navigator>
   </NavigationContainer>
); };