import LoginStackNavigator from './LoginStackNavigator';
import NavigatorConstant from './NavigatorConstants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import RealStateStackNavigator from './RealStateStackNavigator';
import UserStackNavigator from './UserStackNavigator';

const Stack = createNativeStackNavigator();

export default RootNavigator = () => {
 return (
   <NavigationContainer>
     <Stack.Navigator
       initialRouteName={NavigatorConstant.NAVIGATOR.REALSTATE}
       screenOptions={{headerShown: false}}
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