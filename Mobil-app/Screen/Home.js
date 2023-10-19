import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
    const [position, setPosition] = useState({
        latitude: null,
        longitude: null,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setPosition({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
            console.log(location);
        })();
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    latitude: position.latitude,
                    longitude: position.longitude,
                    latitudeDelta: position.latitudeDelta,
                    longitudeDelta: position.longitudeDelta,
                }}
                provider={PROVIDER_GOOGLE}
            >
                {position.latitude && position.longitude && (
                    <Marker
                        coordinate={{
                            latitude: position.latitude,
                            longitude: position.longitude,
                        }}
                        title="Vous êtes ici"
                        description="C'est votre position actuelle"
                    />
                )}
            </MapView>
            <View style={styles.overlay1}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../assets/profi.png')} style={{ height: 50, width: 50, borderRadius: 25 }} />
                    <View style={{ marginLeft: 5 }}>
                        <Text>Jonh Doe</Text>
                        <Text>doejonh@gmail.com</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Feather name="log-out" size={24} color="#179138" />
                </TouchableOpacity>
            </View>
            <View style={styles.overlay2}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ marginLeft: 5 }}>
                        <Text>Information :</Text>
                        <Text>longitude: </Text>
                        <Text>latitude: </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    overlay2: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        height: 120,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        padding: 10,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        width: '100%'
    },
    overlay1: {
        flexDirection: 'row',
        position: 'absolute',
        top: 60,
        left: 10,
        right: 10,
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        padding: 10,
        borderRadius: 20,
    },
    overlayText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
