import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Menu from '../../assets/images/menu.png';
import Create from '../../assets/images/create.png';
import { useNavigation } from '@react-navigation/native';
import NavigatorConstants from '../navigation/NavigatorConstants';
import BurgerModal from './BurgerModal';
import BurgerUserModal from './BurgerUserModal';
import { AntDesign } from '@expo/vector-icons';

export const LeftHeaderIcon = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  
  return (
    <TouchableOpacity onPress={toggleMenu}>
      <Image source={Menu} style={{ width: 22, height: 22 }} />
      {showMenu && <BurgerModal onClose={toggleMenu}/>}
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

export const LeftUserIcon = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleMenu = () => {
    setShowUserMenu(!showUserMenu);
  };
  
  return (
    <TouchableOpacity onPress={toggleMenu}>
      <Image source={Menu} style={{ width: 22, height: 22 }} />
      {showUserMenu && <BurgerUserModal onClose={toggleMenu}/>}
    </TouchableOpacity>
  );
};

export const RightSearchIcon = () => {
  const navigation = useNavigation();

  return(
  <TouchableOpacity onPress={() => {navigation.navigate(NavigatorConstants.USER_STACK.SEARCH);}}>
    <AntDesign name="search1" size={22} color="white" />
  </TouchableOpacity>
  );
};
