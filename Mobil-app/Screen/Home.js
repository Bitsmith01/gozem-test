import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator, BackHandler, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { apiUrl } from '../Constantes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
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
            
            // Request permission to access the device's location
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            // Get the current device's location
            let location = await Location.getCurrentPositionAsync({});
            setPosition({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
            getUserinfo();
        })();



        // Handle the back button press to confirm application exit
        const handleBackPress = () => {
            Alert.alert(
                'Quit Application',
                'Do you really want to quit the application?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => { },
                        style: 'cancel',
                    },
                    {
                        text: 'Yes',
                        onPress: () => {
                            BackHandler.exitApp();
                        },
                    },
                ],
                { cancelable: false }
            );
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => backHandler.remove();
    }, []);

    // Custom Activity Indicator component
    const CustomActivityIndicator = () => {
        return (
            <View style={styles.ActivityIndicatorview}>
                <ActivityIndicator size="large" color="#179138" />
            </View>
        );
    };

    // Fetch user information function
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

    //Logout function
    const Logout = async () => {
        Alert.alert(
            'Confirm Logout',
            'Are you sure you want to log out ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('userToken');
                            navigation.navigate('Login');
                        } catch (error) {
                            console.error('Error logging out:', error);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            {Isloading ? (
                <CustomActivityIndicator />
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
                                title="You are here"
                                description="This is your current location"
                            // image={Userinfo[1].content.pin}
                            // style={{
                            //     width: 50,
                            //     height: 50,
                            // }}
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
                        <View style={styles.logoutButtonContainer}>
                            <TouchableOpacity onPress={Logout}>
                                <Feather name="log-out" size={22} color="white" />
                            </TouchableOpacity>
                        </View>
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
    ActivityIndicatorview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutButtonContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#179138',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
