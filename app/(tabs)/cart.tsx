import { useFonts } from "expo-font";
import { LinearGradient } from 'expo-linear-gradient';
import { SplashScreen, Stack, router, useFocusEffect } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";

import { useCallback, useEffect, useRef, useState } from 'react';

import RequestRow from "../components/RequestRow";
import { useAppContext } from "../contexts/AppContext";
import { GroceryRequest } from "../models/GroceryRequest";
import { GroupRequest } from "../models/GroupRequest";
import { Requester } from "../models/Requester";
import { ApiClient } from "../services/ApiClient";

/**
 * Group shopping cart with needed/purchased item tracking.
 * @depends AppContext - Group data and grocery list
 * @sideeffect Fetches group grocery list, loads user data for display names
 * @throws Network errors from user/list fetching logged to console
 */
export default function GroupCart() {
    const { group, groupGroceryCollection, loadGroupGroceryList } = useAppContext();
    let [fontsLoaded] = useFonts({
        'Shanti': require('../../assets/images/Shanti-Regular.ttf'),
        'Montserrat': require('../../assets/images/Montserrat-Regular.ttf')
    });
    const [groupRequests, setGroupRequests] = useState<GroupRequest[]>([]);
    const hasRunRef = useRef(false);

    const getUserColor = (username: string) => {
        if (!group || !group.userColors) return "gray";
        const anyColors: any = group.userColors as any;
        if (anyColors instanceof Map) return anyColors.get(username) ?? "gray";
        return (anyColors as Record<string, string>)[username] ?? "gray";
    };

    /**
     * Maps groupGroceryCollection to displayable GroupRequest objects.
     * @sideeffect Fetches user data for all requesters to get display names
     */
    useEffect(() => {
        const mapRequests = async () => {
            if (groupGroceryCollection) {
                // Step 1: Extract all unique usernames
                const usernames = new Set<string>();
                groupGroceryCollection.forEach(item => {
                    (item.neededBy || []).forEach(username => usernames.add(username));
                });
                
                // Step 2: Fetch all users and create a username -> firstName map
                const firstNameMap = new Map<string, string>();
                for (const username of usernames) {
                    try {
                        const user = await ApiClient.getUser(username);
                        firstNameMap.set(username, user.firstName || username);
                    } catch (error) {
                        console.error(`Failed to fetch user ${username}:`, error);
                        firstNameMap.set(username, username);
                    }
                }
                
                // Step 3: Map requests using the firstNameMap
                const mappedRequests = groupGroceryCollection.map((item, index) => {
                    const requests = (item.neededBy || []).map((username, i) => new GroceryRequest({
                        id: String(item.itemIds?.[i] ?? `${item.item}-${i}`),
                        requester: new Requester({ 
                            id: username, 
                            displayName: firstNameMap.get(username) || username, 
                            color: getUserColor(username) 
                        }),
                        item: item.item,
                    }));

                    return new GroupRequest({
                        id: `${item.item}-${index}`,
                        itemName: item.item,
                        completed: false, 
                        requests,
                    });
                });
                setGroupRequests(mappedRequests);
            }
        };
        
        mapRequests();
    }, [groupGroceryCollection, group]);

    /**
     * Loads group grocery list from API.
     * @sideeffect Updates context with latest group grocery data
     */
    const populateCart = async () => {
        await loadGroupGroceryList();
    };

    useFocusEffect(
        useCallback(() => {
            if (!hasRunRef.current) {
                populateCart();
                hasRunRef.current = true;
            }
            
            return () => {
                hasRunRef.current = false;
            };
        }, [])
    );

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

      <Stack.Screen
        options={{
          title: "Group Cart",
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Text
                style={styles.headerHelp}
                onPress={() => populateCart()}
              >
                Refresh
              </Text>
              <Text
                style={styles.headerHelp}
                onPress={() => router.push("/pages/help/GroupCartHelpPage")}
              >
                Help
              </Text>
            </View>
          ),
        }}
      />
            <View style={styles.overlay}>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
                    <View>

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

                    </View>
                </ScrollView>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    headerHelp: {
        marginRight: 24,
        fontSize: 16,
    },
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