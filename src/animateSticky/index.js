import React, { useRef, useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Animated,
  ScrollView,
  StatusBar,
} from 'react-native'
import { COLORS, FONTS, SIZES, images, icons } from '../../base'


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

const arti = [
  'A traditional Indian rice dish with mutton, A traditional Malay rice dish',
  'A traditional Indian rice dish with mutton, A traditional Malay rice dish',
  'A traditional Indian rice dish with mutton, A traditional Malay rice dish',
  'A traditional Indian rice dish with mutton, A traditional Malay rice dish',
  'A traditional Indian rice dish with mutton, A traditional Malay rice dish',
]


const AnimateSticky = () => {
  const [bottomActions, setBottomActions] = useState(null)
  const scrollY = useRef(new Animated.Value(0)).current

  const topEdge = bottomActions?.y - SIZES.height + bottomActions?.height;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <Animated.ScrollView
        contentContainerStyle={{ padding: 12 }}
        onScroll={Animated.event(
          [{
            nativeEvent: { contentOffset: { y: scrollY } }
          }],
          { useNativeDriver: true }
        )}
      >
        {menu.map((item, idx) => (
          <View key={item.menuId}>
            <Image source={item.photo} style={{ width: '100%', height: 300 }} />
            <Text style={{ ...FONTS.h3 }}>{item.name}</Text>
            <Text>{item.description}</Text>
          </View>
        ))}
        <View
          onLayout={ev => { setBottomActions(ev.nativeEvent.layout) }}
          style={[styles.bottomActions, { backgroundColor: COLORS.primary }]}
        />
        {arti.map((item, idx) => (
          <View key={`arti- ${idx}`}>
            <Text style={{ paddingBottom: 15 }}>{item}</Text>
          </View>
        ))}
      </Animated.ScrollView>
      {/* 底部-吸底 */}
      {bottomActions &&
        <Animated.View style={[
          styles.bottomActions,
          {
            width: '100%',
            paddingHorizontal: 12,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            transform: [{
              translateY: scrollY.interpolate({
                inputRange: [-1, 0, topEdge - 1, topEdge, topEdge + 1],
                outputRange: [0, 0, 0, 0, -1],
              })
            }]
          }
        ]}>
          <Text style={{ ...FONTS.h4 }}>分享</Text>
          <Text style={{ ...FONTS.h4 }}>详情</Text>
          <Text style={{ ...FONTS.h4 }}>点赞</Text>
        </Animated.View>
      }
    </SafeAreaView>
  )
}
export default AnimateSticky

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  bottomActions: {
    height: 60,
    // backgroundColor: 'rgba(255,255,255,0.8)',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  }
})