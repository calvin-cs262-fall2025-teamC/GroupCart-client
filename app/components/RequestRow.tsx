import { useFonts } from "expo-font";
import { SplashScreen } from 'expo-router';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";
import { GroupRequest } from "../models/GroupRequest";
const userIcon = require("@/assets/images/user-icon.png");

export default function RequestRow({ groupRequest, setGroupRequests }: { groupRequest: GroupRequest, setGroupRequests: React.Dispatch<React.SetStateAction<GroupRequest[]>> }) {
  let [fontsLoaded] = useFonts({
      'Shanti': require('../../assets/images/Shanti-Regular.ttf'),
      'Montserrat': require('../../assets/images/Montserrat-Regular.ttf')
    });
if (!fontsLoaded) {
  SplashScreen.preventAutoHideAsync();
  return null;
}
    return (
        <View style={[styles.container, styles.requestRow]}>
  <View style={styles.topRow}>
    <Text style={styles.itemDescriptionText}>{groupRequest.itemName}</Text>
    <View style={styles.groupRequestsContainer}>
      {groupRequest.requests.map((req) => (
        <View key={req.id} style={styles.requestItem}>
          <Text style={[styles.requesterName, { color: req.requester.color }]}>
            {req.requester.displayName}
          </Text>
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

  <View style={styles.checkmarkSection}>
    <View style={styles.buttonStyle}>
      <Button
        title={groupRequest.completed ? "Completed" : "Incomplete"}
        onPress={() => setGroupRequests(prev =>
          prev.map(gr =>
            gr.id === groupRequest.id
              ? new GroupRequest({ ...gr, completed: !gr.completed })
              : gr
          )
        )}
        color={groupRequest.completed ? "green" : "gray"}
      />
    </View>
  </View>
</View>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexShrink: 1,
    padding: 20,
  },
  requestRow: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "white",
    marginBottom: 8,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",

  },
  row: {
    flexDirection: "row",
    gap: 20,
  },
  checkmarkSection: {
    justifyContent: "center",
    alignItems: "flex-start",
    borderWidth: 0,
  },
  buttonStyle: {
    borderRadius: 10,
    overflow: "hidden",
  },
  itemDescriptionSection: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 5,
  },
  itemDescriptionText: {
    fontSize: 18,
    color: "black",
    fontFamily: "Shanti",


  },
  groupRequestsContainer: {
    flexDirection: "row",
    gap: 5,
    borderRadius: 5,
  },
  requestItem: {
    alignItems: "center",
  },
  requesterName: {
    textAlign: "center",
    fontSize: 15,
    borderStyle: "solid",
  },
  iconBox: {
    justifyContent: "center",
    marginBottom: 20,

  },
  image: {
    width: 20,
    height: 20,
  },
});