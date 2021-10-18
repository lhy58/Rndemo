import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native'
import { COLORS, FONTS, SIZES, images } from '../../base'

const tabs = ['tab1', 'tab2111111', 'tab3']

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
    name: "Lemak",
    photo: images.nasi_lemak,
    description: "A traditional Malay rice dish",
    calories: 300,
    price: 8
  },
].map(item => ({
  ...item,
  ref: React.createRef()
}))

const TabInicator = ({ measureLayout, scrollX }) => {

  const inputRange = menu.map((_, i) => i * SIZES.width)

  const tabInicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(item => item.width)
  })

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(item => item.x)
  })

  return (
    <Animated.View
      style={{
        position: 'absolute',
        height: '100%',
        width: tabInicatorWidth,
        left: 0,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary,
        transform: [{
          translateX: translateX,
        }]
      }}
    />
  )
}


const AnimateTabs = () => {

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const menuScrollRef = React.useRef();

  // 计算 
  const [measureLayout, setMeasureLayout] = React.useState([])
  const containerRef = React.useRef()
  const tabPosition = Animated.divide(scrollX, SIZES.width)
  React.useEffect(() => {
    let ml = []
    menu.forEach(item => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {

          console.log(x, y, width, height)

          ml.push({ x, y, width, height })

          if (ml.length === menu.length) {
            setMeasureLayout(ml)
          }
        }
      )
    })

  }, [containerRef.current])

  // 点击tab
  const onMenuTabPress = React.useCallback(menuTabIndex => {
    console.log('menuTabIndex', menuTabIndex)
    menuScrollRef?.current?.scrollToOffset({
      offset: menuTabIndex * SIZES.width
    })
  })

  function renderTabs() {
    return (
      <View
        ref={containerRef}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: SIZES.padding,
          backgroundColor: COLORS.secondary,
          borderRadius: SIZES.radius,
        }}>
        {/* tab Indicator */}
        {measureLayout.length > 0 && <TabInicator measureLayout={measureLayout} scrollX={scrollX} />}


        {/* tabs */}
        {menu.map((item, index) => {

          const textColor = tabPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.lightGray2, COLORS.white, COLORS.lightGray2],
            extrapolate: 'clamp'
          })

          return (
            <TouchableOpacity
              key={`tab-${index}`}
              onPress={() => onMenuTabPress(index)}
            >
              <View
                ref={item.ref}
                style={{
                  paddingHorizontal: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                }}
              >
                <Animated.Text style={{ color: textColor, ...FONTS.h4 }}>{item.name}</Animated.Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  function rederFlatlist() {
    return (
      <Animated.FlatList
        ref={menuScrollRef}
        data={menu}
        horizontal
        pagingEnabledm
        scrollEventThrottle={16}
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `${item.menuId}`}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: scrollX } } }
        ], { useNativeDriver: false })}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                width: SIZES.width,
                paddingVertical: SIZES.padding
              }}
            >
              <Image
                source={item.photo}
                resizeMode="cover"
                style={{
                  width: SIZES.width,
                  height: "100%",
                  height: SIZES.height * 0.35
                }}
              />
              <Text style={{ color: COLORS.primary, ...FONTS.h1, fontSize: 27 }}>{item.name}</Text>
            </View>
          )
        }}
      />
    )
  }

  function renderScrollView() {
    return (
      <Animated.ScrollView
        ref={menuScrollRef}
        horizontal
        pagingEnabledm
        scrollEventThrottle={16}
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: scrollX } } }
        ], { useNativeDriver: false })}
      >
        {
          menu.map((item, index) => (
            <View
              key={item.menuId}
              style={{
                flex: 1,
                alignItems: 'center',
                width: SIZES.width,
                paddingVertical: SIZES.padding
              }}
            >
              <Image
                source={item.photo}
                resizeMode="cover"
                style={{
                  width: SIZES.width,
                  height: "100%",
                  height: SIZES.height * 0.35
                }}
              />
              <Text style={{ color: COLORS.primary, ...FONTS.h1, fontSize: 27 }}>{item.name}</Text>
            </View>
          ))
        }
      </Animated.ScrollView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        {renderTabs()}
        {rederFlatlist()}
        {/* {renderScrollView()} */}
      </View>

    </SafeAreaView>
  )
}

export default AnimateTabs


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2
  },
})