import LoginStackNavigator from './LoginStackNavigator';
import NavigatorConstant from './NavigatorConstants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import RealStateStackNavigator from './RealStateStackNavigator';
import UserStackNavigator from './UserStackNavigator';
import { StatusBar, setStatusBarHidden } from 'expo-status-bar';
import Theme from "../../app/ui/styles/Theme";


const Stack = createNativeStackNavigator();


export default RootNavigator = () => {
 return (
  
   <NavigationContainer>
    <StatusBar
       backgroundColor={Theme.colors.clear.SECONDARY}
       barStyle="light-content"
     />
     <Stack.Navigator
       initialRouteName={NavigatorConstant.NAVIGATOR.LOGIN}
       screenOptions={{headerShown: false, setStatusBarHidden:false}}
       headerMode="none">
       <Stack.Screen
         name={NavigatorConstant.NAVIGATOR.LOGIN}
         component={LoginStackNavigator}
       />
       <Stack.Screen
         name={NavigatorConstant.NAVIGATOR.REALSTATE}
         component={RealStateStackNavigator}
       />
       <Stack.Screen
         name={NavigatorConstant.NAVIGATOR.USER}
         component={UserStackNavigator}
       />
     </Stack.Navigator>
   </NavigationContainer>
); };