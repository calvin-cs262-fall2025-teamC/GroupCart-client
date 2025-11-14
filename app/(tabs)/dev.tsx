import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';

const PAGES = [
    // Adjust these entries to match the route names you registered in your root/layout navigator.
    { label: 'Demo Page', route: 'pages/demo' },
    { label: 'Color Picker',  route: 'pages/colorpicker'},
    { label: 'Join Groups Page', route: 'pages/JoinGroupPage' },
    { label: 'User Login Page',  route: 'pages/UserLoginPage'}
    // Add more pages here as you create them, e.g.
    // { label: 'Some Page', route: 'SomePage' },
];

export default function DevTab() {
    const navigation = useNavigation();

    function goTo(route: string, headerTitle?: string) {
        try {
            // Try navigating; if the route isn't registered this will typically throw or do nothing.
            // Pass the desired headerTitle as a param so the layout can pick it up from route.params.
            (navigation as any).navigate(route);
        } catch (err) {
            Alert.alert('Navigation error', `Could not navigate to "${route}".\n\n${String(err)}`);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Dev: Pages</Text>
            <Text style={styles.note}>This is a DEV page, meant to help demo different pages that do not have natural navigation implemented within the app/pages folder</Text>

            {PAGES.map((p) => (
                <View key={p.route} style={styles.item}>
                    <Button title={p.label} onPress={() => goTo(p.route)} />
                </View>
            ))}

            <View style={styles.note}>
                <Text style={styles.noteText}>
                    Tip: Ensure the route names above match the names you registered in your root navigator
                    (app/_layout.tsx). If a route is not registered you will see an alert.
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    header: {
        fontSize: 18,
        marginBottom: 12,
        fontWeight: '600',
    },
    item: {
        marginBottom: 10,
    },
    note: {
        marginTop: 20,
        marginBottom: 10
    },
    noteText: {
        color: '#666',
    },
});