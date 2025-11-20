import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApiClient } from '../services/ApiClient';

export default function TestPage() {
    const [users, setUsers] = useState<string[]>([]);

      useEffect(() => {
    const fetchUsers = async () => {
      const result =
        (await ApiClient.getGroup("0")) || [
          "FAIL",
          "At ApiClient.getUsers()"
        ];
      setUsers(result.users);
    };

    fetchUsers();
  }, []);

    const shoppingLists = {  "1234": ["eggs", "pancakes", "milk", "ramen"] };
    const groups = { "999": ["1234", "2345", "3456", "4567"] }
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>Testing ApiClient Endpoints</Text>
                <View>
                    <View>
                        <Text style={styles.notice}>Getting Users (show 3)</Text>
                        {users.slice(0, 3).map(u => <Text key={u}>{u}</Text>)}
                        {users.length > 3 && <Text>... And {users.length - 3} more</Text>}
                    </View>
                    <View>
                        <Text style={styles.todo}>Getting Shopping List for User by ID(show 3)</Text>
                        {shoppingLists["1234"].slice(0, 3).map(u => <Text key={u}>{u}</Text>)}
                        {shoppingLists["1234"].length > 3 && <Text>... And {shoppingLists["1234"].length - 3} more</Text>}
                    </View>
                    <View>
                        <Text style={styles.todo}>Getting Users by a Group ID(show 3)</Text>
                        {groups["999"].slice(0, 3).map(u => <Text key={u}>{u}</Text>)}
                        {groups["999"].length > 3 && <Text>... And {groups["999"].length - 3} more</Text>}
                    </View>
                    <View>
                        <Text style={styles.todo}>Getting Group IDs(show 3)</Text>
                        {Object.keys(groups).slice(0, 3).map(u => <Text key={u}>{u}</Text>)}
                        {Object.keys(groups).length > 3 && <Text>... And {groups["999"].length - 3} more</Text>}
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2196f3',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
        color: '#fff',
    },
    subtitle: {
        fontSize: 14,
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
