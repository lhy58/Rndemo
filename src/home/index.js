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
    id: '01',
    name: 'tabs',
    link: 'AnimateTabs',
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