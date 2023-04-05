import { NavigationContainer } from '@react-navigation/native';
import DrawableNavigation from './src/navigation/DrawableNavigation';
import { store } from './src/store/store.js'
import { Provider } from 'react-redux';
import React from 'react';
import { Text } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawableNavigation />
      </NavigationContainer>
    </Provider>
  );
}
