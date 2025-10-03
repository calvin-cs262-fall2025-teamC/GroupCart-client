import {
    StyleSheet,
    Text,
    View
} from "react-native";

class Requester {
  id: string;
  displayName: string;
  color: string;

  constructor(id: string, displayName: string, color: string) {
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

  constructor(id: string, requester: Requester, item: string, priority: number) {
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

function RequestRow( {groupRequest} : Props) {
    return (
        <View style={[styles.container, styles.requestRow]}>

            <Text>{groupRequest.itemName}</Text>
        </View>
    )
}

const exampleGroupRequest = new GroupRequest({
  id: "test",
  completed: false,
  itemName: "Bannanas!",
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