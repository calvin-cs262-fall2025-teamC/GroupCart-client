import { Picker } from "@react-native-picker/picker";
import { useState } from 'react';
import {
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import RequestRow from "../components/RequestRow";
import { GroceryRequest } from "../models/GroceryRequest";
import { GroupRequest } from "../models/GroupRequest";
import { Requester } from "../models/Requester";

const themeColor = "#0079ff";
const backgroundGray = "#f0f0f0";

const exampleRequester = new Requester({
    id: "requester-id",
    displayName: "Mr.ExampleRequester",
    color: "darkgreen",
})

const exampleRequest = new GroceryRequest({
    id: "request-id",
    requester: exampleRequester,
    item: "Eggs",
    priority: 1
});

const exampleRequests = [
    exampleRequest,
    new GroceryRequest({
        ...exampleRequest,
        id: "request-2",
        item: "Eggs",
        requester: new Requester({
            id: "nick-id",
            displayName: "Nick",
            color: "royalblue",
        }),
    }),
    new GroceryRequest({
        ...exampleRequest,
        id: "request-3",
        item: "Eggs",
        requester: new Requester({
            id: "adam-id",
            displayName: "Adam",
            color: "red",
        }),
    }),
];

const exampleGroupRequest = new GroupRequest({
    id: "test",
    requests: exampleRequests,
    completed: false,
    itemName: "Banannas"
});

export default function GroupCart() {
    const [groupRequests, setGroupRequests] = useState<GroupRequest[]>([exampleGroupRequest]);

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
            <View>
                <View style={styles.container}>
                    <Text style={styles.title}>Group Items</Text>
                </View>

                <View style={styles.container}>

                    {groupRequests.some(c => c.completed == false) && (
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

                    {groupRequests.some(c => c.completed == true) && (
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
                <View style={styles.demoSetup}>
                    <DemoSetup
                        groupRequests={groupRequests}
                        setGroupRequests={setGroupRequests}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

interface DemoSetupProps {
    groupRequests: GroupRequest[];
    setGroupRequests: React.Dispatch<React.SetStateAction<GroupRequest[]>>;
}

function DemoSetup({ groupRequests, setGroupRequests }: DemoSetupProps) {
    // Form state (local)
    const [selectedRequester, setSelectedRequester] = useState<Requester>(exampleRequester);
    const [showDemo, setShowDemo] = useState(false);
    const [itemName, setItemName] = useState("");
    const [priority, setPriority] = useState(1);

    // Requester options
    const requesterOptions = [
        new Requester({ id: "nick-id", displayName: "Nick", color: "royalblue" }),
        new Requester({ id: "adam-id", displayName: "Adam", color: "red" }),
        exampleRequester,
    ];

    const handleSubmit = () => {
        if (!itemName) return; // simple validation

        const newRequest = new GroceryRequest({
            id: `request-${Date.now()}`,
            requester: selectedRequester,
            item: itemName,
            priority,
        });

        // Check if a group request for this item already exists
        const existingGroup = groupRequests.find(gr => gr.itemName === itemName);

        if (existingGroup) {
            setGroupRequests(prev =>
                prev.map(gr =>
                    gr.id === existingGroup.id
                        ? new GroupRequest({ ...gr, requests: [...gr.requests, newRequest] })
                        : gr
                )
            );
        } else {
            const newGroup = new GroupRequest({
                id: `group-${Date.now()}`,
                itemName,
                requests: [newRequest],
            });
            setGroupRequests(prev => [...prev, newGroup]);
        }

        // Reset form
        setItemName("");
        setPriority(1);
        setSelectedRequester(exampleRequester);
    };

    return (
        <View>
            <Button
                title={showDemo ? "Hide Demo Input" : "Show Demo Input"}
                onPress={() => setShowDemo(prev => !prev)}
            />
            {showDemo && (
                <View style={styles.demoSetup}>
                    <Text style={styles.label}>Select Requester:</Text>
                    <Picker
                        selectedValue={selectedRequester.id}
                        onValueChange={id => setSelectedRequester(requesterOptions.find(r => r.id === id)!)}
                        style={styles.picker}
                    >
                        {requesterOptions.map(r => (
                            <Picker.Item key={r.id} label={r.displayName} value={r.id} />
                        ))}
                    </Picker>

                    <Text style={styles.label}>Food Item:</Text>
                    <TextInput
                        value={itemName}
                        onChangeText={setItemName}
                        placeholder="Enter food item"
                        style={styles.input}
                        placeholderTextColor="#aaa"
                    />

                    <Text style={styles.label}>Priority:</Text>
                    <TextInput
                        value={priority.toString()}
                        onChangeText={text => setPriority(Number(text))}
                        keyboardType="numeric"
                        style={styles.input}
                    />

                    <Button title="Submit" onPress={handleSubmit} color="#1e90ff" />

                    <Text style={[styles.label, { marginTop: 20 }]}>Current Group Requests:</Text>
                    {groupRequests.map(gr => (
                        <Text key={gr.id} style={{ color: "white" }}>
                            {gr.itemName} ({gr.requests.length} requests)
                        </Text>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: backgroundGray,
        flexShrink: 1,
        padding: 10,
    },
    title: {
        color: themeColor,
        textAlign: "center",
        fontSize: 48,
        fontWeight: "bold",
    },
    subTitle: {
        color: themeColor,
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold"
    },
    demoSetup: {
        flex: 1,
        backgroundColor: "#222", // dark style
    },
    label: {
        color: "white",
    },
    input: {
        borderWidth: 1,
        borderColor: "#555",
        color: "white",
    },
    picker: {
        color: "black",
    },
});