import React, { useEffect } from 'react';
import RootNavigator from './app/navigation/RootNavigator.js';
import NetInfo from '@react-native-community/netinfo';
import {ToastAndroid } from 'react-native';

export default function App() {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        ToastAndroid.show('Por favor, revisa tu conexión y vuelve a intentarlo.!', ToastAndroid.LONG);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
      <RootNavigator/>
  )}
