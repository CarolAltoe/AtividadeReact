import React from 'react';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cadastro from '../screens/Cadastro';
import Lista from '../screens/Lista';
//import TabBarIcon from '../components/TabBarIcon';
const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: () => <TabBarIcon name={route.nome} />
    })}

    tabBarOptions={{
      showLabel: true,
      activeTintColor: '#0000FF',
      activeBackgroundColor: '#BABABA',

      labelStyle:{
        fontSize: 12,
      },
      labelPosition: 'beside-icon',

    }}
    >
        <Tab.Screen
        name="Cadastro"
        component={Cadastro}
        options={{ title: 'Cadastro' , tabBarBadge: 2, tabBarBadgeStyle: {width:18, height:18}}}
        />
        <Tab.Screen
        name="Lista"
        component={Lista}
        options={{ title: 'Lista' }}
        />
        <Tab.Screen
        name="CarouselCards"
        component={CarouselCards}
        options={{ title: 'CarouselCards' }}
        />
    </Tab.Navigator>
);



