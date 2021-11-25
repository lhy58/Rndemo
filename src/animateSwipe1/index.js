import React, { useRef } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Animated,
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
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

const renderItem = ({ item, index }) => {

  const rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      // extrapolate: 'clamp',
    })
    return (
      <View style={{
        width: 100,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        marginTop: 8,
        marginRight: 12,
        borderRadius: 10,
      }}>
        <Animated.Text style={{ transform: [{ scale: scale }] }}>删除</Animated.Text>
      </View>
    )
  }

  return (
    <Swipeable renderRightActions={rightSwipe} overshootRight={false}>
      <View style={styles.items}>
        <View style={styles.task}>
          <Text>{item.name}</Text>
        </View>
      </View>
    </Swipeable>
  )
}

const AnimateSwipe1 = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.menuId}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

export default AnimateSwipe1

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