import React, { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { apiUrl } from '../Constantes';


const Profil = ({ navigation, route }) => {
    const { userData } = route.params;
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const handleImageUpload = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        };

        const result = await ImagePicker.launchImageLibraryAsync(options);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleFinishRegistration = async () => {
        if (image) {
            setIsLoading(true); // Activer l'indicateur de chargement

            const cloudName = 'diblduqup';

            const formData = new FormData();
            formData.append('file', { uri: image, name: 'image.jpg', type: 'image/jpg' });
            formData.append('upload_preset', 'qv0yugmk');

            try {
                const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data && data.secure_url) {
                        const imageUrl = data.secure_url;
                        const User = {
                            firstname: userData.firstname,
                            lastname: userData.lastname,
                            email: userData.email,
                            password: userData.password,
                            image: imageUrl
                        }
                        console.log(userData);
                        console.log(User);

                        try {
                            const url = `${apiUrl}/Register`;
                            const response = await fetch(url, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(User),
                            });

                            if (response.ok) {
                                console.log('User created successfully');
                                navigation.navigate('Login');
                            } else {
                                console.error('Failed to create the user');
                            }
                        } catch (error) {
                            console.error('Error creating the user:', error);
                        }
                    } else {
                        console.error('Failed to upload image to Cloudinary.');
                    }
                } else {
                    console.error('Failed to upload image to Cloudinary.');
                }
            } catch (error) {
                console.error('Error uploading image to Cloudinary:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };



    return (
        <View style={styles.container}>
            <Image source={image ? { uri: image } : require('../assets/profi.png')} style={styles.image} />
            <TextInput style={styles.input} editable={false} value={image ? image : "Upload your image"} />
            {!image && (
                <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
                    <Text style={{ textAlign: 'center', color: 'white' }}>
                        Upload Image
                    </Text>
                </TouchableOpacity>
            )}
            {image && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.changeImageButton} onPress={handleImageUpload}>
                        <Text style={{ textAlign: 'center', color: 'white' }}>
                            Change Image
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signupButton} onPress={handleFinishRegistration}>
                        {isLoading ? (
                            <ActivityIndicator size="large" color="white" />
                        ) : (
                            <Text style={{ textAlign: 'center', color: 'white' }}>
                                Finish Registration
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 350,
        height: 350,
        borderRadius: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 50,
        width: 300,
        backgroundColor: "#f8fafc",
        borderRadius: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
        marginTop: 40
    },
    uploadButton: {
        marginTop: 20,
        backgroundColor: "#179138",
        height: 45,
        width: 224,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    signupButton: {
        backgroundColor: "#179138",
        height: 45,
        width: 150,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    changeImageButton: {
        backgroundColor: "#1266A1",
        height: 45,
        width: 150,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
});

export default Profil;
