import { NavigationContainer } from '@react-navigation/native';
import DrawableNavigation from './src/navigation/DrawableNavigation';
import { store } from './src/store/store.js'
import { Provider } from 'react-redux';
import React,{useEffect} from 'react';
import { useFonts } from 'expo-font';

export default function App() {

  const [fontsLoaded] = useFonts({
    'Montserrat-Black': require('./Fonts/Montserrat-Black.ttf'),//900
      'Montserrat-ExtraBold': require('./Fonts/Montserrat-ExtraBold.ttf'),//800
      'Montserrat-Bold': require('./Fonts/Montserrat-Bold.ttf'),//700
      'Montserrat-SemiBold': require('./Fonts/Montserrat-SemiBold.ttf'),//600
      'Montserrat-Medium': require('./Fonts/Montserrat-Medium.ttf'),//500
      'Montserrat-Regular': require('./Fonts/Montserrat-Regular.ttf'),//400
      'Montserrat-Light': require('./Fonts/Montserrat-Light.ttf'),//300
      'Montserrat-ExtraLight': require('./Fonts/Montserrat-ExtraLight.ttf'),//200
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawableNavigation />
      </NavigationContainer>
    </Provider>
  );
}
