import React, {useEffect} from 'react';
import SplashScreenUI from './SplashScreenUI';
import NavigatorConstant from '../../../navigation/NavigatorConstants';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(NavigatorConstant.NAVIGATOR.LOGIN);
    }, 2000);
  }, []);

  return (
    <SplashScreenUI/>
  );
}
