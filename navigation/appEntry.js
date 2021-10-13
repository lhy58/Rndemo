import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './tab'
import My from '../src/my'

const Stact = createStackNavigator()

const AppEntry = () => {
  return (
    <NavigationContainer>
      <Stact.Navigator
        screenOptions={{
          // headerShown: false
        }}
        initialRouteName={'Home'}
      >
        <Stact.Screen 
          name='Home' 
          component={Tabs}
          // options={({ route }) => ({
          //   title: null,
          // })} 
        />
        <Stact.Screen name='My' component={My}/>
      </Stact.Navigator>
    </NavigationContainer>
  )
}

export default AppEntry