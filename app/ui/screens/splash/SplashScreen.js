import React, {useEffect} from 'react';
import SplashScreenUI from './SplashScreenUI';
import InmobHomeScreenUI from '../home/InmobHomeScreenUI';
import NavigatorConstant from '../../../navigation/NavigatorConstants';
import ComponentUI from '../component/ComponentUI';
import InmobHomecreen from '../home/InmobHomeScreen';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(NavigatorConstant.NAVIGATOR.LOGIN);
    }, 20000000); //2000
  }, []);

  return (
    //<SplashScreenUI/>
     <ComponentUI/>
    //<InmobHomecreen/>
  );
}
