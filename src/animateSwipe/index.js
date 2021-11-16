import React, { useRef } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { COLORS, FONTS, SIZES, images, icons } from '../../base'

const menu = [
  {
    menuId: 10,
    name: "Kolo Mee",
    description: "Noodles with char siu",
  },
  {
    menuId: 11,
    name: "Sarawak Laksa",
    description: "Vermicelli noodles, cooked prawns",
  },
  {
    menuId: 12,
    name: "Nasi Lemak",
    description: "A traditional Malay rice dish",
  },
  {
    menuId: 13,
    name: "Nasi Briyani with Mutton",
    description: "A traditional Indian rice dish with mutton",
  },
  {
    menuId: 14,
    name: "Nasi Briyani with Mutton",
    description: "A traditional Indian rice dish with mutton",
  },
]

const AnimateSwipe = () => {
  const translationX = useSharedValue(0)
  const panGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      translationX.value = event.translationX
    },
    onEnd: () => { },
  })

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translationX.value
      },
    ],
  }))

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {menu.map(item => (
          <View key={item.menuId} style={styles.items}>
            <PanGestureHandler onGestureEvent={panGesture}>
              <Animated.View style={[styles.task, rStyle]}>
                <Text>{item.name}</Text>
              </Animated.View>
            </PanGestureHandler>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default AnimateSwipe

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  items: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  task: {
    width: '100%',
    height: 70,
    marginVertical: 8,
    paddingLeft: 12,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    // ios
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 18,
    // Android
    elevation: 5,
  }
})