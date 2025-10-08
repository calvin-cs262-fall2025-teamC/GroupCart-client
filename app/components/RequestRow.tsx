import {
  Button,
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";
import { GroupRequest } from "../models/GroupRequest";
// import { horizontalScale, moderateScale, verticalScale } from "../utils/scaling";

const userIcon = require("@/assets/images/user-icon.png");

export default function RequestRow({ groupRequest, setGroupRequests }: { groupRequest: GroupRequest, setGroupRequests: React.Dispatch<React.SetStateAction<GroupRequest[]>> }) {
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
    flexShrink: 1,
    padding: 20,
  },
  requestRow: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    marginBottom: 1,
    borderRadius: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: (20),
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    gap: (20),
  },
  checkmarkSection: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
  },
  itemDescriptionSection: {
    backgroundColor: "#f0f0f0",
    borderRadius: (20),
    padding: (20),
  },
  itemDescriptionText: {
    fontSize: (20),
    color: "#333",
  },
  groupRequestsContainer: {
    flexDirection: "row",
    gap: (20),
    backgroundColor: "#f0f0f0",
    borderRadius: (20),
  },
  requestItem: {
    alignItems: "center",
  },
  requesterName: {
    textAlign: "center",
    fontSize: (20),
    borderStyle: "solid",
  },
  iconBox: {
    justifyContent: "center",
    marginBottom: (20),
  },
  image: {
    width: (20),
    height: (20),
  },
});
