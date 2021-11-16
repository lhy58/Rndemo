import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './tab'
import My from '../src/my'
import AnimateTabs from '../src/animateTabs'
import AnimateSide from '../src/animateSide'
import AnimateCard from '../src/animateCard'
import AnimateCard1 from '../src/animateCard1'
// import AnimateSwipe from '../src/animateSwipe'
import AnimateSwipe1 from '../src/animateSwipe1'

const Stact = createStackNavigator()

const AppEntry = () => {
  return (
    <NavigationContainer>
      <Stact.Navigator
        screenOptions={{
          headerShown: false
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
        <Stact.Screen name='AnimateCard' component={AnimateCard} />
        <Stact.Screen name='AnimateCard1' component={AnimateCard1} />
        {/* <Stact.Screen name='AnimateSwipe' component={AnimateSwipe} /> */}
        <Stact.Screen name='AnimateSwipe1' component={AnimateSwipe1} />
      </Stact.Navigator>
    </NavigationContainer>
  )
}

export default AppEntry