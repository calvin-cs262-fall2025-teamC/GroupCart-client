import { Picker } from "@react-native-picker/picker";
import { useState } from 'react';
import {
    Button,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

const userIcon = require("@/assets/images/user-icon.png");

class Requester {
    id: string;
    displayName: string;
    color: string;

    constructor({ id, displayName, color }: { id: string; displayName: string; color: string }) {
        this.id = id;
        this.displayName = displayName;
        this.color = color;
    }
}
class Request {
    id: string;
    requester: Requester;
    item: string;
    priority: number;

    constructor({ id, requester, item, priority = 1 }:
        { id: string; requester: Requester; item: string; priority?: number }) {
        this.id = id;
        this.requester = requester;
        this.item = item;
        this.priority = priority;
    }
}
class GroupRequest {
    id: string;
    completed: boolean;
    itemName: string;
    requests: Request[];

    constructor({ id, completed = false, itemName, requests = [] }:
        { id: string; completed?: boolean; itemName: string; requests?: Request[] }) {
        this.id = id;
        this.completed = completed;
        this.itemName = itemName;
        this.requests = requests;
    }
}

const exampleRequester = new Requester({
    id: "requester-id",
    displayName: "Mr.ExampleRequester",
    color: "gray",
})

const exampleRequest = new Request({
    id: "request-id",
    requester: exampleRequester,
    item: "Eggs",
    priority: 1
});

const exampleRequests = [
    exampleRequest,
    new Request({
        ...exampleRequest,
        id: "request-2",
        item: "Eggs",
        requester: new Requester({
            id: "nick-id",
            displayName: "Nick",
            color: "royalblue",
        }),
    }),
    new Request({
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
                    <View>
                        <Text>NEEDED ITEMS</Text>
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

                    <View>
                        <Text>COLLECTED ITEMS</Text>
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
                <View style={styles.demoSetup}>
                    <DemoSetup
                        groupRequests={groupRequests}
                        setGroupRequests={setGroupRequests}
                    />
                </View>
            </View>
        </ScrollView>
    )
    function RequestRow({ groupRequest, setGroupRequests }: { groupRequest: GroupRequest, setGroupRequests: React.Dispatch<React.SetStateAction<GroupRequest[]>> }) {
        return (
            <View style={[styles.container, styles.requestRow]}>
                <View style={styles.row}>

                    <View style={styles.checkmarkSection}>
                        <Button
                            title={groupRequest.completed ? "Complete" : "Incomplete"}
                            onPress={() => setGroupRequests(prev =>
                                prev.map(gr =>
                                    gr.id === groupRequest.id
                                        ? new GroupRequest({ ...gr, completed: !gr.completed })
                                        : gr
                                )
                            )}
                            color={groupRequest.completed ? "green" : "gray"} // optional coloring
                        />
                    </View>
                    <View style={styles.itemDescriptionSection}>
                        <Text style={styles.itemDescriptionText}>{groupRequest.itemName}</Text>
                    </View>
                </View>
                <View style={styles.groupRequestsContainer}>
                    {groupRequest.requests.map((req) => (
                        <View key={req.id} style={styles.requestItem}>
                            <View>
                                <Text style={[styles.requesterName, { color: req.requester.color }]}>
                                    {req.requester.displayName}
                                </Text>
                            </View>
                            <View style={styles.iconBox}>
                                <Image
                                    source={userIcon}
                                    tintColor={req.requester.color}
                                    style={styles.image}
                                />
                            </View>
                        </View>
                    ))}
                </View>

            </View>
        )
    }
}

interface DemoSetupProps {
    groupRequests: GroupRequest[];
    setGroupRequests: React.Dispatch<React.SetStateAction<GroupRequest[]>>;
}

function DemoSetup({ groupRequests, setGroupRequests }: DemoSetupProps) {
    // Form state (local)
    const [selectedRequester, setSelectedRequester] = useState<Requester>(exampleRequester);
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

        const newRequest = new Request({
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
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "lightgray",
        flexShrink: 1,
        padding: 10
    },
    title: {
        color: "royalblue",
        textAlign: "center",
        fontSize: 48,
        fontWeight: "bold"
    },
    requestRow: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginBottom: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    image: {
        width: 32,
        height: 32
    },
    iconBox: {
        justifyContent: "center",
        marginBottom: 20
    },
    checkmarkSection: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0
    },
    itemDescriptionSection: {
        backgroundColor: "#f0f0f0",  
        borderRadius: 10,
        padding: 12,
    },
    itemDescriptionText: {
        fontSize: 16,
        color: "#333",               
    },
    groupRequestsContainer: {
        flexDirection: "row",
        gap: 15,
        backgroundColor: "#f0f0f0",
        borderRadius: 10
    },
    requestItem: {
        alignItems: 'center'
    },
    requesterName: {
        textAlign: "center",
        fontSize: 16,
        borderStyle: "solid",
    },
    row: {
        flexDirection: "row",
        gap: 20
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
    }
});