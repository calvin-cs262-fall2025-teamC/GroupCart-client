import {
    Button,
    StyleSheet,
    Text,
    View
} from "react-native";

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

type Props = {
    groupRequest: Partial<GroupRequest>;
}

function RequestRow({ groupRequest }: Props) {
    return (
        <View style={[styles.container, styles.requestRow]}>
            <View>
                <Button
                    title={groupRequest.completed ? "complete" : "incomplete"} // shows checked/unchecked
                    onPress={() => (groupRequest.completed = !groupRequest.completed)}
                />
            </View>
            <View>
                <Text>{groupRequest.itemName}</Text>
            </View>
            <View>
                {groupRequest.requests.map((req) => (
                    <Text key={req.id} style={{ color: req.requester.color }}>{req.requester.displayName}</Text>
                ))}
            </View>
        </View>
    )
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
        id:"request-2",
        item: "Eggs",
        requester: new Requester({
            id: "nick-id",
            displayName: "Nick",
            color: "royalblue",
        }),
    }),
    new Request({
    ...exampleRequest,
    id:"request-3",
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
    itemName: "Bannanas!"
});


export default function GroupCart() {
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>Group Items</Text>
            </View>
            <View style={styles.container}>
                {/* Needed Title */}
                {/* List Of Needed */}

                <RequestRow groupRequest={exampleGroupRequest} />
                {/* Requests[Checkmark="checked", Item, Quantity?, Price?, [RequesterIcon1, RequesterIcon2, ...]] */}
                {/* Collected Title */}
                {/* List Of Collected */}
                {/* Requests[Checkmark="unchecked", Item, Quantity?, Price?, [RequesterIcon1, RequesterIcon2, ...]] */}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "lightgray",
        flexGrow: 1,
        padding: 10
    },
    title: {
        color: "royalblue",
        textAlign: "center"
    },
    requestRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        marginBottom: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
});