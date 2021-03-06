import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS, SIZES } from "../../base"

const groups = [
  {
    id: '01',
    name: '轮播',
    link: 'My',
  },
  {
    id: '02',
    name: 'tabs',
    link: 'AnimateTabs',
  },
  {
    id: '03',
    name: '侧滑',
    link: 'AnimateSide',
  },
  {
    id: '04',
    name: '卡片动画',
    link: 'AnimateCard',
  },
  {
    id: '05',
    name: '卡片动画1',
    link: 'AnimateCard1',
  },
  // {
  //   id: '06',
  //   name: '侧滑删除',
  //   link: 'AnimateSwipe',
  // },
  {
    id: '06',
    name: '侧滑删除1',
    link: 'AnimateSwipe1',
  },
  {
    id: '08',
    name: '吸顶动画',
    link: 'AnimateSticky',
  },
  {
    id: '09',
    name: '轮播+bottomSheet',
    link: 'AnimateSheet',
  },
  {
    id: '10',
    name: '堆 + 轮播',
    link: 'AnimateStack',
  },
  {
    id: '11',
    name: '堆轮播+放大查看',
    link: 'AnimateShared',
  },
]

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>wo shi Home</Text>
      {groups.map(item => (
        <TouchableOpacity
          key={item.id}
          style={{ marginBottom: SIZES.padding }}
          onPress={() => navigation.navigate(item.link)}
        >
          <Text style={{ textAlign: 'center', color: COLORS.primary }}>{item.name}</Text>
        </TouchableOpacity>
      ))}

    </View>
  )
}

Home.navigationOptions = {
  title: '首页',
  header: null,
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4
  },
})