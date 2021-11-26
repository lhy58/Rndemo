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
import { COLORS, FONTS, SIZES, images, icons } from '../../base'
import { FlingGestureHandler, State, Directions } from 'react-native-gesture-handler'

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
const ITEM_WIDTH = SIZES.width * 0.76; // 0.8
const ITEM_HEIGHT = ITEM_WIDTH * 1.7; // 1.7
const VISIBLE_ITEMS = 3; // opacity
const OVERFLOW_HEIGHT = 70; // overflow

const OverflowItems = ({ data, scrollXAnimated }) => {
  const inputRange = [-1, 0, 1]
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  })
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item) => (
          <View key={item.menuId} style={styles.itemContainer}>
            <Text style={{ ...FONTS.h2 }}>{item.name}</Text>
            <View>
              <Text>{item.description}</Text>
            </View>
          </View>
        ))}
      </Animated.View>
    </View>
  )
}

const AnimateStack = () => {
  const [data, setData] = React.useState(menu)
  const scrollXIndex = React.useRef(new Animated.Value(0)).current // 用来-滑动图片
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current // 用来-设置image
  const [index, setIndex] = React.useState(0) // image-index


  const setActiveIndex = React.useCallback((activeIndex) => {
    // 滑动图片
    scrollXIndex.setValue(activeIndex)
    setIndex(activeIndex)
  })

  React.useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS) {
      // get new data
      // fetch more data
      const newData = [...data, ...data];
      setData(newData)
    }
  })

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start()
    // 随机自动播放
    // setInterval(() => {
    //   scrollXIndex.setValue(Math.floor(Math.random() * data.length))
    // }, 3000)
  })
  return (
    <FlingGestureHandler
      key='left'
      direction={Directions.LEFT} // 移动方向
      onHandlerStateChange={ev => {
        if (ev.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            return;
          }
          setActiveIndex(index + 1)
        }
      }}
    >
      <FlingGestureHandler
        key='right'
        direction={Directions.RIGHT} // 移动方向
        onHandlerStateChange={ev => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1)
          }
        }}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />
          <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
          <Animated.FlatList
            data={data}
            keyExtractor={(_, index) => String(index)}
            horizontal
            inverted // 反转滑动方向
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              padding: 20,
            }}
            scrollEnabled={false}
            removeClippedSubviews={false} // 大列表启用本属性可能可以提高性能
            CellRendererComponent={({ item, index, children, style, ...props }) => { // 每个子项渲染使用的元素
              const newStyle = [
                style,
                { zIndex: data.length - index }
              ]
              return (
                <View style={newStyle} index={index} {...props}>
                  {children}
                </View>
              )
            }}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1]
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100]
              })
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3]
              })
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - (1 / VISIBLE_ITEMS), 1, 0]
              })
              return (
                <Animated.View
                  style={{
                    position: 'absolute',
                    left: -ITEM_WIDTH / 2,
                    opacity,
                    transform: [
                      { translateX },
                      { scale },
                    ],
                  }}
                >
                  <Image
                    source={item.photo}
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                      borderRadius: 4,
                    }} />
                </Animated.View>
              )
            }}
          />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  )
}

export default AnimateStack

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: 10,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden',
  }
})