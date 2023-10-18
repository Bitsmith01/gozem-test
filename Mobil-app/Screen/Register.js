import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

const Register = () => {
  return (
    <View style={styles.safeview}>
      <Image source={require('../assets/Gozem.png')} style={styles.logo} />
      <View style={styles.formSection}>
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: 'left', marginTop: 10 }}>
            Nom
          </Text>
          <TextInput style={styles.input} />
          <Text style={{ textAlign: 'left', marginTop: 5 }}>
            Prénom
          </Text>
          <TextInput style={styles.input} />
          <Text style={{ textAlign: 'left', marginTop: 5 }}>
            Email
          </Text>
          <TextInput style={styles.input} />
          <Text style={{ textAlign: 'left', marginTop: 5 }}>
            Mot de passe
          </Text>
          <TextInput style={styles.input} />
          <Text style={{ textAlign: 'left', marginTop: 5 }}>
            Confirmer le mot de passe
          </Text>
          <TextInput style={styles.input} />
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={styles.signupButton}>
              <Text style={{ textAlign: 'center', color: 'white' }}>
                Je m'inscris !
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "#179138"
  },
  logo: {
    height: 294,
    width: 294,
  },
  formSection: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    marginTop: -40,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
  },
  textH: {
    fontSize: 25,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    height: 50,
    backgroundColor: "#f8fafc",
    borderRadius: 20,
    padding: 4,
    marginVertical: 10
  },
  signupButton: {
    display: 'flex',
    marginTop: 20,
    backgroundColor: "#179138",
    height: 45,
    width: 124,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  }
})