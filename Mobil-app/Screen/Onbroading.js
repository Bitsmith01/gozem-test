import React from 'react';
import { ImageBackground, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Onboarding = ({ navigation }) => {

  const handleInscriptionClick = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground source={require('../assets/who-we-are2x.png')} style={{ flex: 1, justifyContent: "flex-end" }}>
      <LinearGradient
        colors={['transparent', '#179138']}
        style={styles.Linear}
      >
        <Text style={styles.Welcome}>
          Welcome, champion !
        </Text>
        <Text style={styles.subtitle}>
          Join our community of drivers and boost your earnings exceptionally. Get ready for an exciting adventure! Join us now!
        </Text>
        <TouchableOpacity style={styles.inscription} onPress={handleInscriptionClick}>
          <Text>
            Sign Up
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: '',
    justifyContent: 'flex-end',
  },
  subtitle: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal:5
  },
  Linear: {
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 250
  },
  Welcome: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  },
  inscription: {
    backgroundColor: 'white',
    height: 39,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
});

export default Onboarding;
