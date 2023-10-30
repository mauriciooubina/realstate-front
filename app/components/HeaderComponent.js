import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Menu from '../../assets/images/menu.png';
import Create from '../../assets/images/create.png';
import { useNavigation } from '@react-navigation/native';
import NavigatorConstants from '../navigation/NavigatorConstants';

export const LeftHeaderIcon = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <TouchableOpacity onPress={toggleMenu}>
      <Image source={Menu} style={{ width: 22, height: 22 }} />
      {showMenu && 
      <View>
        
      </View>
      }
    </TouchableOpacity>
  );
};

export const RightHeaderIcon = () => {
  const navigation = useNavigation();

  return(
  <TouchableOpacity onPress={() => {navigation.navigate(NavigatorConstants.REALSTATE_STACK.CREATE);}}>
    <Image source={Create} style={{ width: 23, height: 23 }} />
  </TouchableOpacity>
  );
};
