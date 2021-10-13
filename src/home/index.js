import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { COLORS, SIZES } from "../../base"

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>wo shi Home</Text>
      <TouchableOpacity
          style={{ marginBottom: SIZES.padding * 2 }}
          onPress={() => navigation.navigate("My")}
            >
        <Text>点击</Text>
      </TouchableOpacity>        
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