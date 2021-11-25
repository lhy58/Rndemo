import React, { useRef } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  Animated,
  FlatList,
} from 'react-native'
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { COLORS, FONTS, images, SIZES } from '../../base'

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
]

const prods = [
  'A traditional Indian rice dish with mutton, A traditional Malay rice dish',
  'A traditional Indian rice dish with mutton, A traditional Malay rice dish',
  'A traditional Indian rice dish with mutton, A traditional Malay rice dish',
  'A traditional Indian rice dish with mutton, A traditional Malay rice dish',
  'A traditional Indian rice dish with mutton, A traditional Malay rice dish',
]

const renderItem = ({ item, index }) => {
  return (
    <View >
      <Image source={item.photo} style={{ width: '100%', height: ITEM_HEIGHT }} />
    </View>
  )
}

const ITEM_HEIGHT = SIZES.height * .75

const AnimateSheet = () => {
  const scrollY = useRef(new Animated.Value(0)).current
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: ITEM_HEIGHT, overflow: 'hidden' }}>
        <Animated.FlatList
          data={menu}
          keyExtractor={item => item.menuId}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate='fast'
          showsVerticalScrollIndicator={false}
          bounces={false}
          renderItem={renderItem}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
        />
        <View
          style={{
            position: 'absolute',
            top: ITEM_HEIGHT / 2,
            left: 20,
          }}
        >
          {menu.map((item, idx) => (
            <View
              key={`dot-${idx}`}
              style={styles.dot}
            />
          ))}
          {/* dot-index */}
          <Animated.View style={[styles.dotIndex, {
            transform: [{
              translateY: Animated.divide(scrollY, ITEM_HEIGHT).interpolate({
                inputRange: [0, 1],
                outputRange: [0, 16],
              })
            }]
          }]} />
        </View>
      </View>
      <BottomSheet
        index={1}
        snapPoints={[SIZES.height - ITEM_HEIGHT, SIZES.height - ITEM_HEIGHT, SIZES.height]}
      // snapPoints={["25%", "50%", "90%"]}
      >
        <BottomSheetScrollView style={{ backgroundColor: COLORS.white }}>
          {prods.map((item, idx) => (
            <View key={`arti- ${idx}`}>
              <Text style={{ paddingBottom: 15 }}>{item}</Text>
            </View>
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  )
}

export default AnimateSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.secondary,
    marginBottom: 8,
  },
  dotIndex: {
    width: 16,
    height: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    position: 'absolute',
    top: -4,
    left: -4,
  }
})
