import React, { useRef } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  FlatList
} from 'react-native'
import { COLORS, FONTS, SIZES, images, icons } from '../../base'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const menu = [
  {
    menuId: 10,
    name: "Kolo Mee",
    photo: images.kolo_mee,
    description: "Noodles with char siu",
    calories: 200,
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
    name: "Nasi Briyani with Mutton",
    photo: images.nasi_briyani_mutton,
    description: "A traditional Indian rice dish with mutton",
    calories: 300,
    price: 8
  },
  {
    menuId: 14,
    name: "Nasi Briyani with Mutton",
    photo: images.kek_lapis,
    description: "A traditional Indian rice dish with mutton",
    calories: 300,
    price: 8
  },
  {
    menuId: 15,
    name: "Nasi Briyani with Mutton",
    photo: images.kek_lapis_shop,
    description: "A traditional Indian rice dish with mutton",
    calories: 300,
    price: 8
  },
]

const CATD_HEIGHT = 200 + 20

const renderItem = ({ index, item, onScrollY }) => {

  const position = Animated.subtract(index * CATD_HEIGHT, onScrollY)
  const isDisappearing = -CATD_HEIGHT // 消失
  const isTop = 0;
  const isBottom = SIZES.height - CATD_HEIGHT
  const isAppearing = SIZES.height // 出现
  const translateY = Animated.add(onScrollY, onScrollY.interpolate({
    inputRange: [0, 0.00001 + index * CATD_HEIGHT],
    outputRange: [0, -index * CATD_HEIGHT],
    extrapolateRight: 'clamp',
  }))
  // const translateY = Animated.add(
  //   Animated.add(onScrollY, onScrollY.interpolate({
  //     inputRange: [0, 0.00001 + index * CATD_HEIGHT],
  //     outputRange: [0, -index * CATD_HEIGHT],
  //     extrapolateRight: 'clamp',
  //   })),
  //   position.interpolate({
  //     inputRange: [isBottom, isAppearing],
  //     outputRange: [0, -CATD_HEIGHT / 4],
  //     extrapolate: 'clamp',
  //   })
  // )

  // const position = Animated.subtract(index * CATD_HEIGHT, onScrollY)
  // const isDisappearing = -CATD_HEIGHT // 消失
  // const isTop = 0;
  // const isBottom = SIZES.height - CATD_HEIGHT
  // const isAppearing = SIZES.height // 出现
  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: 'clamp',
  })
  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: 'clamp'
  })
  return (
    <Animated.View
      style={{
        height: 200,
        paddingHorizontal: 20,
        marginTop: 20,
        opacity,
        transform: [
          {
            translateY: translateY
          },
          { scale: scale }
        ]
      }}>
      <Image source={item.photo} style={{
        width: '100%',
        height: 200,
        borderRadius: 12,
      }} />
    </Animated.View>
  )
}

const AnimateCard = () => {
  const onScrollY = new Animated.Value(0)
  return (
    <SafeAreaView>
      <AnimatedFlatList
        scrollEventThrottle={16}
        bounces={false}
        data={menu}
        renderItem={({ index, item }) => renderItem({ index, item, onScrollY })}
        keyExtractor={(item) => item.menuId}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: onScrollY } } }
        ], { useNativeDriver: true })}
      />
    </SafeAreaView>
  )
}
export default AnimateCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
})