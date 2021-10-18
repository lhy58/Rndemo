import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './tab'
import My from '../src/my'
import AnimateTabs from '../src/animateTabs'
import AnimateSide from '../src/animateSide'

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
        <Stact.Screen name='My' component={My} />
        <Stact.Screen name='AnimateTabs' component={AnimateTabs} />
        <Stact.Screen name='AnimateSide' component={AnimateSide} />
      </Stact.Navigator>
    </NavigationContainer>
  )
}

export default AppEntry