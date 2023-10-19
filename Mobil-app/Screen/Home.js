import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
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
            <View style={styles.overlay}>
                <Text style={styles.overlayText}>Superposition</Text>
                <TouchableOpacity>
                    <Feather name="log-out" size={24} color="#179138" />
                </TouchableOpacity>
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
    overlay: {
        flexDirection: 'row',
        position: 'absolute',
        top: 60,
        left: 10,
        right: 10,
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        padding: 20,
        borderRadius: 20,
    },
    overlayText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
