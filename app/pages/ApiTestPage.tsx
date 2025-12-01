import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Group } from '../models/Group';
import { UserListItem } from "../models/UserListItem";
import { ApiClient } from "../services/ApiClient";
import { horizontalScale, moderateScale, verticalScale } from '../utils/scaling';

export default function TestPage() {
  const [groupUsers, setGroupUsers] = useState<string[]>([]);
  const [shoppingList, setShoppingList] = useState<UserListItem[]>([]);
  const [favors, setFavors] = useState<any[]>([]);

  // ------------------- Fetch group users -------------------
  useEffect(() => {
    const fetchGroupUsers = async () => {
      try {
        const group: Group = await ApiClient.getGroup("0"); // working example
        setGroupUsers(group.users);
      } catch (err) {
        console.error("Failed to fetch group:", err);
        setGroupUsers(["FAIL", "At ApiClient.getGroup()"]);
      }
    };

    fetchGroupUsers();
  }, []);

  // ------------------- Fetch shopping list -------------------
  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        const list = await ApiClient.getUserList("alice"); // example username
        setShoppingList(list);
      } catch (err) {
        console.error("Failed to fetch shopping list:", err);
        setShoppingList([]);
      }
    };

    fetchShoppingList();
  }, []);

  // ------------------- Fetch favors by user -------------------
  useEffect(() => {
    const fetchFavors = async () => {
      try {
        const result = await ApiClient.getFavorsByUser("bob"); // example username
        setFavors(result);
      } catch (err) {
        console.error("Failed to fetch favors:", err);
        setFavors([]);
      }
    };

    fetchFavors();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Testing ApiClient Endpoints</Text>

      {/* Group Users */}
      <View>
        <Text style={styles.notice}>Getting Users from Group (show 3)</Text>
        {groupUsers.slice(0, 3).map((u) => (
          <Text key={u}>{u}</Text>
        ))}
        {groupUsers.length > 3 && <Text>... And {groupUsers.length - 3} more</Text>}
      </View>

      {/* Shopping List */}
      <View>
        <Text style={styles.notice}>Getting Shopping List for User alice(show 3)</Text>
        {shoppingList.slice(0, 3).map((item) => (
          <Text key={item.id}>
            {item.item} (Priority {item.priority})
          </Text>
        ))}
        {shoppingList.length > 3 && <Text>... And {shoppingList.length - 3} more</Text>}
      </View>

      {/* Favors */}
      <View>
        <Text style={styles.notice}>Getting Favors Fulfilled by User Bob(show 3)</Text>
        {favors.slice(0, 3).map((f) => (
          <Text key={f.id}>
            {f.item} for {f.for} at {new Date(f.fulfilledAt).toLocaleString()}
          </Text>
        ))}
        {favors.length > 3 && <Text>... And {favors.length - 3} more</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: horizontalScale(20),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2196f3',
    },
    title: {
        fontSize: moderateScale(20),
        fontWeight: '600',
        marginBottom: verticalScale(8),
        color: '#fff',
    },
    subtitle: {
        fontSize: moderateScale(14),
        color: '#fff',
        textAlign: 'center',
    },
    notice: {
        color: 'yellow',
        fontWeight: 'bold'
    },
    todo: {
        color: 'red',
        fontWeight: 'bold'

    },
    verified: {
        color: 'green',
        fontWeight: 'bold'
    }

});
