import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { apiUrl } from '../Constantes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const [Userinfo, setUserinfo] = useState(null);
    const [Isloading, setIsloading] = useState(true);

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
            getUserinfo();
        })();
    }, []);

    const getUserinfo = async () => {
        try {
            const url = `${apiUrl}/Home`;

            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                const headers = {
                    'Authorization': `Bearer ${token}`
                };

                const response = await fetch(url, {
                    headers: headers
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setUserinfo(data);
                } else {
                    console.error('Failed to fetch user info');
                }
            } else {
                console.error('Token not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        } finally {
            setIsloading(false); 
        }
    };

    return (
        <View style={styles.container}>
            {Isloading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
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
                        {Userinfo && (
                            <Marker
                                coordinate={{
                                    latitude: position.latitude,
                                    longitude: position.longitude,
                                }}
                                title="Vous êtes ici"
                                description="C'est votre position actuelle"
                                // image={Userinfo[1].content.pin}
                            />
                        )}
                    </MapView>
                    <View style={styles.overlay1}>
                        {Userinfo && (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={{ uri: Userinfo[0].content.image }} style={{ height: 50, width: 50, borderRadius: 25 }} />
                                <View style={{ marginLeft: 5 }}>
                                    <Text>{Userinfo[0].content.name}</Text>
                                    <Text>{Userinfo[0].content.email}</Text>
                                </View>
                            </View>
                        )}
                        <TouchableOpacity>
                            <Feather name="log-out" size={24} color="#179138" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.overlay2}>
                        {Userinfo && (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ marginLeft: 5 }}>
                                    <Text style={{ marginVertical: 5 }}>Title: {Userinfo[2].content.title}</Text>
                                    <Text style={{ marginVertical: 5 }}>Source: {Userinfo[2].content.source}</Text>
                                    <Text style={{ marginVertical: 5 }}>Value: {Userinfo[2].content.value}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                </>
            )}
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
        width: '100%',
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
