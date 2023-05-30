import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Lista from './app/screens/Lista';
import Cadastro from './app/screens/Cadastro';
import Alterar from './app/screens/Alterar';
import CarouselCards from './app/screens/CarouselCards';
import MainTab from './app/navigators/MainTab';



const Stack = createNativeStackNavigator();
export default function App() {
  return(
    <NavigationContainer>
      {/*
        <MainTab/>
      */}
      
      <Stack.Navigator>
       
        <Stack.Screen name="Cadastro" component={Cadastro}/>
        <Stack.Screen name="Lista" component={Lista}/>
        <Stack.Screen name="Alterar" component={Alterar}/>
        <Stack.Screen name="CarouselCards" component={CarouselCards}/>
      </Stack.Navigator>
      
      
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3C5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
