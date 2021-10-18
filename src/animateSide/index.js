import React, { useRef } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native'
import { COLORS, FONTS, SIZES, images, icons } from '../../base'

const AnimateSide = () => {

  const [showMenu, setShowMenu] = React.useState(false)

  // Animated
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  const onBtn = () => {
    // scale
    Animated.timing(scaleValue, {
      toValue: showMenu ? 1 : 0.88,
      duration: 300,
      useNativeDriver: true,
    }).start()

    // translateX
    Animated.timing(offsetValue, {
      toValue: showMenu ? 0 : 220,
      duration: 300,
      useNativeDriver: true,
    }).start()

    // translateX
    Animated.timing(closeButtonOffset, {
      toValue: !showMenu ? -30 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()

    setShowMenu(!showMenu)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 20 }}>
        <Image source={images.ice_kacang} style={{
          width: 60,
          height: 60,
          borderRadius: 10,
        }} />
        <Text style={{ paddingTop: 15, ...FONTS.h3, color: 'white' }}>Li Han Ying</Text>
      </View>

      {/* over lay */}

      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: COLORS.white,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: showMenu ? 20 : 0,
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>
        {/* <Animated.View style={{
          transform: [
            {
              translateY: closeButtonOffset,
            }
          ]
        }}> */}
        <TouchableOpacity onPress={onBtn}>
          <Image source={showMenu ? icons.back : icons.list} style={{ width: 20, height: 20, tintColor: 'black', marginTop: 10 }} />
        </TouchableOpacity>
        <Text style={{ paddingTop: 10, ...FONTS.h3 }}>Home</Text>
        <Image
          source={images.burger_restaurant_1}
          style={{
            width: '100%',
            height: 300,
            borderRadius: 15,
            marginTop: 10,
          }}
        />
        {/* </Animated.View> */}

      </Animated.View>

    </SafeAreaView>
  )
}

export default AnimateSide


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
})