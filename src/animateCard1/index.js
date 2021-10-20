import React, { useRef } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  FlatList,
  StatusBar,
} from 'react-native'
import MaskedView from '@react-native-community/masked-view'
import Svg, { Rect } from 'react-native-svg';
// import { LinearGradient } from 'expo-linear-gradient';
import LinearGradient from 'react-native-linear-gradient';

import { COLORS, FONTS, SIZES, images, icons } from '../../base'

const menu = [
  {
    menuId: 10,
    name: "Kolo Mee",
    photo: images.kolo_mee,
    description: "Noodles with char siu",
    calories: 300,
    price: 5
  },
  {
    menuId: 11,
    name: "Sarawak Laksa",
    photo: images.sarawak_laksa,
    description: "Vermicelli noodles, cooked prawns",
    calories: 300,
    price: 8
  },
  {
    menuId: 12,
    name: "Nasi Lemak",
    photo: images.nasi_lemak,
    description: "A traditional Malay rice dish",
    calories: 300,
    price: 8
  },
  {
    menuId: 13,
    name: "Nasi Briyani",
    photo: images.nasi_briyani_mutton,
    description: "A traditional Indian rice dish with mutton",
    calories: 300,
    price: 8
  },
  {
    menuId: 14,
    name: "Nasi Mutton",
    photo: images.kek_lapis,
    description: "A traditional Indian rice dish with mutton",
    calories: 300,
    price: 8
  },
  {
    menuId: 15,
    name: "Nasi Briyani ",
    photo: images.kek_lapis_shop,
    description: "A traditional Indian rice dish with mutton",
    calories: 300,
    price: 8,
  },
]
const cardData = [
  {
    menuId: 1,
    spacer: 'left',
  },
  ...menu,
  {
    menuId: 16,
    spacer: 'right', // 垫片
  },
]

const AnimatedSvg = Animated.createAnimatedComponent(Svg)
const CARD_WIDTH = SIZES.width * 0.72
const SPACER_CARD_WIDTH = (SIZES.width - CARD_WIDTH) / 2

const renderItem = ({ index, item, onScrollX }) => {
  const translateY = onScrollX.interpolate({
    inputRange: [(index - 2) * CARD_WIDTH, (index - 1) * CARD_WIDTH, index * CARD_WIDTH],
    outputRange: [100, -50, 100],
    extrapolate: 'clamp'
  })
  // 开始-结束 垫片
  if (item.spacer) {
    return (
      <View style={{
        width: SPACER_CARD_WIDTH,
        // height: 200,
        // backgroundColor: COLORS.primary
      }} />
    )
  }

  return (
    <Animated.View style={{
      width: CARD_WIDTH,
      transform: [{ translateY }]
    }}>
      <View style={{
        marginHorizontal: 12,
        padding: 10,
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 22,
      }}>
        <Image source={item.photo} style={{
          width: '100%',
          height: 260,
          borderRadius: 12,
        }} />
        <Text style={{ ...FONTS.h3, paddingTop: 8 }}>{item.name}</Text>
        <Text style={{
          height: 60,
        }}>{item.description}</Text>
      </View>
    </Animated.View>
  )
}

const Backdrop = ({ onScrollX }) => {
  return (
    <View style={{
      position: 'absolute',
      width: SIZES.width,
      height: SIZES.height * 0.6,
    }}>
      <FlatList
        data={cardData}
        keyExtractor={(item) => item.menuId}
        horizontal
        renderItem={({ index, item }) => {

          const translateX = onScrollX.interpolate({
            inputRange: [(index - 2) * CARD_WIDTH, (index - 1) * CARD_WIDTH],
            outputRange: [-SIZES.width, 0],
            // extrapolateRight: 'clamp'
          })

          if (!item.photo) {
            return null
          }

          return (
            <MaskedView
              style={{ position: 'absolute', backgroundColor: 'red', width: SIZES.width, height: SIZES.height }}
              maskElement={
                <AnimatedSvg
                  width={SIZES.width}
                  height={SIZES.height}
                  viewBox={`0 0 ${SIZES.width} ${SIZES.height}`}
                  style={{
                    transform: [
                      { translateX }
                    ]
                  }}
                >
                  <Rect x='0' y='0' width={SIZES.width} height={SIZES.height} fill='red' />
                </AnimatedSvg>
              }
            >
              <Image
                source={item.photo}
                style={{
                  width: SIZES.width,
                  height: SIZES.height * 0.6,
                  resizeMode: 'cover',
                }} />
            </MaskedView>
          )
        }}
      />
      {/* <LinearGradient
        colors={['transparent', 'wdite']}
        style={{
          width: SIZES.width,
          height: SIZES.height * 0.6,
          position: 'absolute',
          bottom: 0,
        }}
      /> */}
    </View>
  )
}

const Backdrop1 = ({ onScrollX }) => {
  return (
    <>
      {cardData.map((item, index) => {
        const translateX = onScrollX.interpolate({
          inputRange: [(index - 2) * CARD_WIDTH, (index - 1) * CARD_WIDTH],
          outputRange: [-SIZES.width, 0]
        })
        if (!item.photo) {
          return null
        }
        return (
          <MaskedView
            style={{
              position: 'absolute',
              width: SIZES.width,
              height: SIZES.height * 0.6,
            }}
            maskElement={
              <AnimatedSvg
                width={SIZES.width}
                height={SIZES.height}
                viewBox={`0 0 ${SIZES.width} ${SIZES.height}`}
                style={{
                  transform: [
                    { translateX }
                  ]
                }}
              >
                <Rect x='0' y='0' width={SIZES.width} height={SIZES.height} fill={COLORS.primary} />
              </AnimatedSvg>
            }
          >
            <Animated.View
              key={item.menuId}
              style={{
                position: 'absolute',
                // transform: [
                //   { translateX }
                // ]
              }}>
              <Image
                source={item.photo}
                style={{
                  width: SIZES.width,
                  height: SIZES.height * 0.6,
                  resizeMode: 'cover',
                }} />
            </Animated.View>
          </MaskedView>
        )
      })}
      {/* 渐变 */}
      <LinearGradient
        colors={['transparent', 'white']}
        style={{
          width: SIZES.width,
          height: SIZES.height * 0.6,
          position: 'absolute',
          top: 0,
        }}
      >
      </LinearGradient>
    </>

  )
}

const AnimateCard1 = () => {

  const onScrollX = React.useRef(new Animated.Value(0)).current

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      {/* <Backdrop onScrollX={onScrollX} /> */}
      <Backdrop1 onScrollX={onScrollX} />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={cardData}
        keyExtractor={(item) => item.menuId}
        horizontal
        contentContainerStyle={{
          alignItems: 'center',
        }}
        scrollEventThrottle={16}
        snapToInterval={SIZES.width * 0.72}
        decelerationRate={0}
        bounces={false}
        renderItem={({ index, item }) => renderItem({ index, item, onScrollX })}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { x: onScrollX } }
          }
        ], { useNativeDriver: true })}
      />
    </SafeAreaView>
  )
}

export default AnimateCard1

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.white,
  },
})