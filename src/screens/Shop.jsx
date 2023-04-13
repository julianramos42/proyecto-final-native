import React from 'react'
import { View,Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import SearchSection from '../components/SearchSection/SearchSection';
import ProductsSections from '../components/ProductsSection/ProductsSections';
import { useRoute } from '@react-navigation/native';

const altura = Dimensions.get('window').height;
export default function Shop() {

  const route = useRoute();
  const { id } = route.params;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, height: altura, width: '100%' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={{ flex: 1, height: altura }}>
        <SearchSection id={id}/>
        <ProductsSections id={id}/>
      </View>
    </KeyboardAvoidingView>
  )
}

