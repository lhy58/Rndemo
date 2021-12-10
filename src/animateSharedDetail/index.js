import React, { useRef } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  // Animated,
  FlatList,
  StatusBar,
} from 'react-native'
import { COLORS, FONTS, SIZES, images, icons } from '../../base'
import { SharedElement } from 'react-navigation-shared-element'
import * as Animatable from 'react-native-animatable'

const DELAY = 300;
const fadeInBottom = {
  0: {
    opacity: 0,
    translateY: 100,
  },
  1: {
    opacity: 1,
    translateY: 0,
  },
}
const AnimateSharedDetail = ({ navigation, route }) => {
  const { item } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <SharedElement
        id={`item.${item.menuId}.image`}
        style={[StyleSheet.absoluteFillObject]}
      >
        <Image
          source={item.photo}
          // resizeMode='cover'
          style={[
            StyleSheet.absoluteFillObject,
            // { width: SIZES.width, height: SIZES.height }
          ]}
        />
      </SharedElement>
      {/* 遮罩层 */}
      <Animatable.View
        duration={400}
        delay={DELAY}
        animation='fadeIn'
        style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,.3)' }]}
      />
      <TouchableOpacity
        style={{ padding: 12 }}
        onPress={() => {
          navigation.goBack()
        }}>
        <Image source={icons.back} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>
      <SharedElement
        id='genenae.bg'
        style={[
          StyleSheet.absoluteFillObject,
          { transform: [{ translateY: SIZES.height }] }
        ]}
      >
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: '#fff',
              transform: [{ translateY: -SIZES.height * 0.3 }],
              padding: 12,
              borderRadius: 10,
            }
          ]}
        >
          <Animatable.Text
            animation={fadeInBottom}
            duration={400}
            delay={DELAY + 300}
            style={{ ...FONTS.h3 }}
          >
            {item.name}
          </Animatable.Text>
          <Animatable.Text
            animation={fadeInBottom}
            duration={400}
            delay={DELAY + 500}
          >
            {item.description}
          </Animatable.Text>
        </View>
      </SharedElement>
    </SafeAreaView>
  )
}

AnimateSharedDetail.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;
  return [
    { id: `item.${item.menuId}.image` },
    { id: 'genenar.bg' },
  ];
}

export default AnimateSharedDetail



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
})