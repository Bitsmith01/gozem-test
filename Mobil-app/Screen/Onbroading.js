import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Onbroading = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.Topimage} source={require('../assets/who-we-are2x.png')} />
    </View>
  )
}

export default Onbroading

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
  },
  Topimage: {
    objectFit: 'cover',
    right:20
  },
  BottomSection: {
    paddingTop: 40,
    marginTop: -20,
    backgroundColor: 'white',
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  }
})