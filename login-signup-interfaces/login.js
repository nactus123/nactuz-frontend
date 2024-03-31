import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';

export default function LoginPage() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('Student'); // Default user type

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
            <View style={styles.formContainer}>
                <Text style={[styles.heading, { color: theme.colors.tertiary }]}>Login As {userType} </Text>
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
                <Button title="Login"   onPress={handleLogin} color={theme.colors.tertiary} />
                <View style={[{marginTop:5},{borderWidth: 2, borderColor: theme.colors.tertiary, borderRadius: 5}]}>
                <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} color={theme.colors.primary} borderBottomColor={theme.colors.tertiary}/>
                </View>
                <TouchableOpacity onPress={toggleUserType} style={styles.userTypeToggle} >
                    <Text style={styles.userTypeText}>Switch to {userType === 'Student' ? 'Teacher' : 'Student'}</Text>
                </TouchableOpacity>
            </View>
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
