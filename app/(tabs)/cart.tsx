import { Picker } from "@react-native-picker/picker";
import { useFonts } from "expo-font";
import { LinearGradient } from 'expo-linear-gradient';
import { SplashScreen } from 'expo-router';

import { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import RequestRow from "../components/RequestRow";
import { useUser } from "../contexts/UserContext";
import { GroceryRequest } from "../models/GroceryRequest";
import { GroupRequest } from "../models/GroupRequest";
import { Requester } from "../models/Requester";
import { horizontalScale, moderateScale, verticalScale } from '../utils/scaling';



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
    itemName: "Bananas"
});

export default function GroupCart() {
     let [fontsLoaded] = useFonts({
        'Shanti': require('../../assets/images/Shanti-Regular.ttf'),
        'Montserrat': require('../../assets/images/Montserrat-Regular.ttf')
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
              start={{ x: 1, y: 0}} // Top right
              end={{ x: 0, y: 1 }} // Bottom left

              locations={[0.1, 0.3, 0.6, 1]}
              style={[styles.background]}
            >
                <View style = {styles.overlay}>
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


                <View style={styles.demoSetup}>
                    <DemoSetup
                        groupRequests={groupRequests}
                        setGroupRequests={setGroupRequests}
                    />
                </View>
            </View>
        </ScrollView>
        </View>
    </LinearGradient>
    )
}

interface DemoSetupProps {
    groupRequests: GroupRequest[];
    setGroupRequests: React.Dispatch<React.SetStateAction<GroupRequest[]>>;
}

function DemoSetup({ groupRequests, setGroupRequests }: DemoSetupProps) {
    const { user } = useUser();

    // Form state (local)
    const [selectedRequester, setSelectedRequester] = useState<Requester | null>(null);
    const [showDemo, setShowDemo] = useState(false);
    const [itemName, setItemName] = useState("");
    const [priority, setPriority] = useState(1);

    // Requester options - include current user if available
    const requesterOptions = [
        new Requester({ id: "nick-id", displayName: "Nick", color: "royalblue" }),
        new Requester({ id: "adam-id", displayName: "Adam", color: "red" }),
        new Requester({ id: "keith-id", displayName: "Keith", color: "darkgreen" }),
        ...(user ? [user] : []),
    ];

    // Set default selected requester when user is loaded
    useEffect(() => {
        if (user && !selectedRequester) {
            setSelectedRequester(user);
        } else if (!user && !selectedRequester) {
            const defaultRequester = new Requester({ id: "nick-id", displayName: "Nick", color: "royalblue" });
            setSelectedRequester(defaultRequester);
        }
    }, [user]);

    const handleSubmit = () => {
        if (!itemName || !selectedRequester) return; // simple validation

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
        setSelectedRequester(user || new Requester({ id: "nick-id", displayName: "Nick", color: "royalblue" }));
    };

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={() => setShowDemo(prev => !prev)}>
            <Text style={styles.buttonText}>
                {showDemo ? "Hide Demo Input" : "Show Demo Input"}
            </Text>
            </TouchableOpacity>

            {showDemo && (
                <View style={styles.demoSetup}>
                    <Text style={styles.label}>Select Requester:</Text>
                    <Picker
                        selectedValue={selectedRequester?.id}
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
                        <Picker
                        selectedValue={priority}
                        onValueChange={(value) => setPriority(value)}
                        style={styles.picker}
                        >
                        <Picker.Item label="1 (Low)" value={1} />
                        <Picker.Item label="2 (Medium)" value={2} />
                        <Picker.Item label="3 (High)" value={3} />
                        </Picker>

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>

                    <Text style={[styles.label, { marginTop: 20  }]}>Current Group Requests:</Text>
                    {groupRequests.map(gr => (
                        <Text key={gr.id} style={{ color: "black" }}>
                            {gr.itemName} ({gr.requests.length} requests)
                        </Text>
                    ))}
                </View>
            )}
        </View>
    );
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
    fontSize: moderateScale(20),
    fontWeight: "700",
     marginBottom: verticalScale(12),
    fontFamily: "Montserrat",
  },
  demoSetup: {
    backgroundColor: "white",
    padding: horizontalScale(15),
    borderRadius: moderateScale(15),
    marginVertical: verticalScale(20),
    elevation: 3,
    fontFamily: "Montserrat",
  },
  label: {
    color: "black",
    backgroundColor: "white",
    fontFamily: "Montserrat",
    fontSize: moderateScale(16),
    marginBottom: verticalScale(8),
  },
  input: {
    borderWidth: moderateScale(1),
    borderColor: "#ddd",
    borderRadius: moderateScale(30),
    padding: verticalScale(12),
    fontSize: moderateScale(16),
    marginBottom: verticalScale(15),
    fontFamily: "Montserrat",
    color: "black",
  },
  picker: {
    color: "black",
    marginBottom: verticalScale(15),
  },
  button: {
    backgroundColor: "#360479ff",
    padding: verticalScale(12),
    borderRadius: moderateScale(15),
    alignItems: "center",
    marginVertical: verticalScale(10),
  },
  buttonText: {
    color: "#fff",
    fontSize: moderateScale(16),
    fontWeight: "bold",
    fontFamily: "Montserrat",
  },
});