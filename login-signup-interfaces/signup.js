import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function LoginPage() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('Student'); // Default user type
    const [aadharFront, setAadharFront] = useState(null);
    const [aadharBack, setAadharBack] = useState(null);

    const handleShowImages = () => {
        navigation.navigate('UploadedImagesScreen', { aadharFront, aadharBack });
    }; 

    const handleAadharFrontUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
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

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
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
                    {aadharFront && <Image source={{ uri: aadharFront }} style={{ width: 200, height: 200 }} />}
                    {/* Aadhar back image picker */}
                    <View style={[{ marginTop: 5, marginBottom: 5 }]}>
                        <Button title="Upload Aadhaar Back Image" onPress={handleAadharBackUpload} color={theme.colors.primary} />
                    </View>
                    {aadharBack && <Image source={{ uri: aadharBack }} style={{ width: 200, height: 200 }} />}
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
});