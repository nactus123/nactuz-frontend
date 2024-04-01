import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Modal } from 'react-native';
import { Pressable } from 'react-native';

export default function LoginPage() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('Student'); // Default user type
    const [aadharFront, setAadharFront] = useState(null);
    const [aadharBack, setAadharBack] = useState(null);
    const [frontModalVisible, setFrontModalVisible] = useState(false);
    const [backModalVisible, setBackModalVisible] = useState(false);    

    const MAX_IMAGE_SIZE_BYTES = 500 * 1024; // 500 KB in bytes

    const handleAadharFrontUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            const uri = result.assets[0].uri;
            const isSizeValid = await checkImageSize(uri); // Check image size
            if (isSizeValid) {
                setAadharFront(uri); // Set state only if size is valid
            } else {
                alert("Image size exceeds maximum limit of 500 KB"); // Display error message
            }
        }
    };

    const handleAadharBackUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            const uri = result.assets[0].uri;
            const isSizeValid = await checkImageSize(uri); // Check image size
            if (isSizeValid) {
                setAadharBack(uri); // Set state only if size is valid
            } else {
                alert("Image size exceeds maximum limit of 500 KB"); // Display error message
            }
        }
    };

    const checkImageSize = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const imageSizeBytes = blob.size;

        return imageSizeBytes <= MAX_IMAGE_SIZE_BYTES; // Return true if size is within limit, otherwise false
    };


    const handleLogin = () => {
        // Handle login logic here
        console.log("Username:", username);
        console.log("Password:", password);
        console.log("User Type:", userType);
        // Example: You can send a login request to your backend
    };

    const toggleUserType = () => {
        setUserType(userType === 'Student' ? 'Teacher' : 'Student');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.primary }]}>
            {userType === 'Student' ?
                //Student Signup View Starts Here
                <View style={styles.formContainer}>
                    <Text style={[styles.heading, { color: theme.colors.tertiary }]}>Sign Up As</Text>
                    <Text style={[styles.heading, { color: theme.colors.tertiary, marginTop: -20 }]}>{userType} </Text>
                    <TextInput
                        style={[styles.input, { borderBottomColor: theme.colors.secondary, color: theme.colors.accent1 }]}
                        placeholder="E-mail"
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                        placeholderTextColor={theme.colors.accent1}
                    />
                    <TextInput
                        style={[styles.input, { borderBottomColor: theme.colors.secondary, color: theme.colors.accent1 }]}
                        placeholder="Password"
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                        placeholderTextColor={theme.colors.accent1}
                    />
                    <TextInput
                        style={[styles.input, { borderBottomColor: theme.colors.secondary, color: theme.colors.accent1 }]}
                        placeholder="Confirm Password"
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                        placeholderTextColor={theme.colors.accent1}
                    />
                    <Button title="Sign Up" onPress={handleLogin} color={theme.colors.tertiary} />
                    <View style={[{ marginTop: 5 }, { borderWidth: 2, borderColor: theme.colors.tertiary, borderRadius: 5 }]}>
                        <Button title="Login" onPress={() => navigation.navigate('Login')} color={theme.colors.primary} borderBottomColor={theme.colors.tertiary} />
                    </View>
                    <TouchableOpacity onPress={toggleUserType} style={styles.userTypeToggle} >
                        <Text style={styles.userTypeText}>Switch to {userType === 'Student' ? 'Teacher' : 'Student'}</Text>
                    </TouchableOpacity>
                </View>
                //Student Signup View Ends Here
                :
                //Teacher Signup View Starts Here
                <View style={styles.formContainer}>
                    <Text style={[styles.heading, { color: theme.colors.tertiary }]}>Sign Up As</Text>
                    <Text style={[styles.heading, { color: theme.colors.tertiary, marginTop: -20 }]}>{userType} </Text>
                    <TextInput
                        style={[styles.input, { borderBottomColor: theme.colors.secondary, color: theme.colors.accent1 }]}
                        placeholder="E-mail"
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                        placeholderTextColor={theme.colors.accent1}
                    />
                    <TextInput
                        style={[styles.input, { borderBottomColor: theme.colors.secondary, color: theme.colors.accent1 }]}
                        placeholder="Password"
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                        placeholderTextColor={theme.colors.accent1}
                    />
                    <TextInput
                        style={[styles.input, { borderBottomColor: theme.colors.secondary, color: theme.colors.accent1 }]}
                        placeholder="Confirm Password"
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                        placeholderTextColor={theme.colors.accent1}
                    />
                    {/* Aadhar front image picker */}
                    <View style={[{ marginTop: 5 }]}>
                        <Button title="Upload Aadhaar Front Image" onPress={handleAadharFrontUpload} color={theme.colors.primary} />
                    </View>
                    {/* {aadharFront ? <Image source={{ uri: aadharFront }} style={{ width: 200, height: 200 }} /> : null} */}
                    {aadharFront ? (
                        <View style={[{ marginTop: 2, marginBottom: 2 }]}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={frontModalVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                    setFrontModalVisible(!frontModalVisible);
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={[{ borderRadius: 5, backgroundColor: '#fff', padding: 5 }]}>
                                        <Image source={{ uri: aadharFront }} style={{ width: 200, height: 200, borderRadius: 5 }} />
                                        <Pressable
                                            color={theme.colors.primary}
                                            style={[{ backgroundColor: theme.colors.primary }, { borderRadius: 5, borderColor: '#fff', padding: 5, marginTop: 5}]}
                                            onPress={() => setFrontModalVisible(!frontModalVisible)}>
                                            <Text style={[{backgroundColor: 'red', padding: 5, borderRadius: 5}, styles.textStyle]}>CLOSE</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Modal>
                            <Pressable
                                color={theme.colors.primary}
                                style={[{ backgroundColor: theme.colors.primary }, { borderWidth: 1, borderColor: '#fff', padding: 5 }]}
                                onPress={() => setFrontModalVisible(true)}>
                                <Text style={styles.textStyle}>View Uploaded Image - Adhaar Front</Text>
                            </Pressable>
                        </View>
                    ) : null}

                    {/* Aadhar back image picker */}
                    <View style={[{ marginTop: 5, marginBottom: 5 }]}>
                        <Button title="Upload Aadhaar Back Image" onPress={handleAadharBackUpload} color={theme.colors.primary} />
                    </View>
                    {/* {aadharBack && <Image source={{ uri: aadharBack }} style={{ width: 200, height: 200 }} />} */}
                    {aadharBack ? (
                        <View style={[{ marginTop: 2, marginBottom: 2 }]}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={backModalVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                    setBackModalVisible(!backModalVisible);
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={[{ borderRadius: 5, backgroundColor: '#fff', padding: 5 }]}>
                                        <Image source={{ uri: aadharBack }} style={{ width: 200, height: 200, borderRadius: 5 }} />
                                        <Pressable
                                            color={theme.colors.primary}
                                            style={[{ backgroundColor: theme.colors.primary }, { borderRadius: 5, borderColor: '#fff', padding: 5, marginTop: 5}]}
                                            onPress={() => setBackModalVisible(!backModalVisible)}>
                                            <Text style={[{backgroundColor: 'red', padding: 5, borderRadius: 5}, styles.textStyle]}>CLOSE</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Modal>
                            <Pressable
                                color={theme.colors.primary}
                                style={[{ backgroundColor: theme.colors.primary }, { borderWidth: 1, borderColor: '#fff', padding: 5 }]}
                                onPress={() => setBackModalVisible(true)}>
                                <Text style={styles.textStyle}>View Uploaded Image - Adhaar Back</Text>
                            </Pressable>
                        </View>
                    ) : null}
                    <Button title="Sign Up" onPress={handleLogin} color={theme.colors.tertiary} />
                    <View style={[{ marginTop: 5 }, { borderWidth: 2, borderColor: theme.colors.tertiary, borderRadius: 5 }]}>
                        <Button title="Login" onPress={() => navigation.navigate('Login')} color={theme.colors.primary} borderBottomColor={theme.colors.tertiary} />
                    </View>
                    <TouchableOpacity onPress={toggleUserType} style={styles.userTypeToggle} >
                        <Text style={styles.userTypeText}>Switch to {userType === 'Student' ? 'Teacher' : 'Student'}</Text>
                    </TouchableOpacity>
                </View>
                //Teacher Signup View Ends Here
            }
            <StatusBar style="light" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        width: '80%',
        backgroundColor: theme.colors.primary,
        padding: 20,
        borderRadius: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    userTypeToggle: {
        marginTop: 10,
        alignItems: 'center',
    },
    userTypeText: {
        color: theme.colors.accent1,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
}
);