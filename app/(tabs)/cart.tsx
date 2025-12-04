import { useFonts } from "expo-font";
import { LinearGradient } from 'expo-linear-gradient';
import { SplashScreen } from 'expo-router';

import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import RequestRow from "../components/RequestRow";
import { useAppContext } from "../contexts/AppContext";
import { GroceryRequest } from "../models/GroceryRequest";
import { GroupRequest } from "../models/GroupRequest";
import { Requester } from "../models/Requester";

export default function GroupCart() {
    const { user } = useAppContext();
    let [fontsLoaded] = useFonts({
        'Shanti': require('../../assets/images/Shanti-Regular.ttf'),
        'Montserrat': require('../../assets/images/Montserrat-Regular.ttf')
    });
    
    const exampleRequester = new Requester({
        id: "keith-id",
        displayName: "Keith",
        color: "darkgreen",
    });
    
    const exampleRequest = new GroceryRequest({
        id: "request-id",
        requester: exampleRequester,
        item: "Eggs",
        priority: 1
    });
    w
    const exampleGroupRequest = new GroupRequest({
        id: "test",
        requests: [exampleRequest],
        completed: false,
        itemName: "Bananas"
    });
    
    const [groupRequests, setGroupRequests] = useState<GroupRequest[]>([exampleGroupRequest]);
    if (!fontsLoaded) {
        SplashScreen.preventAutoHideAsync();
        return null;
    }
    
    return (
        <LinearGradient
            colors={["#f2b2ffff", "#eed3ffff", "#bdc5f1ff", "#ffffffff"]}
            // Gradient direction: starts from top-right, flows to bottom-left
            // [x1, y1] = start point, [x2, y2] = end point
            start={{ x: 1, y: 0 }} // Top right
            end={{ x: 0, y: 1 }} // Bottom left

            locations={[0.1, 0.3, 0.6, 1]}
            style={[styles.background]}
        >
            <View style={styles.overlay}>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
                    {groupRequests.some(c => c.completed === false) && (
                        <View>
                            <View>
                                <Text style={styles.subTitle}>NEEDED ITEMS</Text>
                            </View>

                            <View>
                                {groupRequests.map(gr => (
                                    !gr.completed
                                    &&
                                    <RequestRow
                                        key={gr.id}
                                        groupRequest={gr}
                                        setGroupRequests={setGroupRequests}
                                    />
                                ))}
                            </View>
                        </View>
                    )}

                    {groupRequests.some(c => c.completed === true) && (
                        <View>
                            <View>
                                <Text style={styles.subTitle}>COLLECTED ITEMS</Text>
                            </View>

                            <View>
                                {groupRequests.map(gr => (
                                    gr.completed
                                    &&
                                    <RequestRow
                                        key={gr.id}
                                        groupRequest={gr}
                                        setGroupRequests={setGroupRequests}
                                    />
                                ))}
                            </View>
                        </View>
                    )}


                    <View style={styles.demoSetup}>
                    </View>
                </ScrollView>
            </View>
        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },

    subTitle: {
        color: "black",
        textAlign: "left",
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 12,
        fontFamily: "Montserrat",
    },
    demoSetup: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 15,
        marginVertical: 20,
        elevation: 3,
        fontFamily: "Montserrat",
    },
    label: {
        color: "black",
        backgroundColor: "white",
        fontFamily: "Montserrat",
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 30,
        padding: 12,
        fontSize: 16,
        marginBottom: 15,
        fontFamily: "Montserrat",
        color: "black",
    },
    picker: {
        color: "black",
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#360479ff",
        padding: 12,
        borderRadius: 15,
        alignItems: "center",
        marginVertical: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Montserrat",
    },
});