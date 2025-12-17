import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../contexts/AppContext";

import { ApiClient } from "../services/ApiClient";


export default function TestPage() {
  const {user, group, userGroceryList, groupGroceryCollection} = useAppContext();
  const [newCreatedUser, setCreatedUser] = useState('');
  

  const seeList = () => {
    console.log("Showing list")
    console.log(userGroceryList);
  }

  const createUserClicked = () => {
    ApiClient.createUser(newCreatedUser);
  };

  return (
    
    <View style={styles.container}>
      <Text>Our user:</Text>
        {user && <Text>{user.firstName} { user.lastName }</Text>}
      <Text>Our group:</Text>
        {group && <Text>{group.id} { group.name }</Text>}
      <Text>Our Users:</Text>
        {group?.users.map((user) => (
          <Text key={user}>{user}</Text>
        ))}

        <Text>My list:</Text>
        {userGroceryList && userGroceryList[0] && <Text>{userGroceryList[0].item}</Text> }
        {/* <Button onPress={seeList} title="see list"></Button> */}
        <Text>Shared Grocery Collection:</Text>
        {groupGroceryCollection && groupGroceryCollection[0] && <Text>{groupGroceryCollection[0].item}</Text> }
        <Text>Make a new user:</Text>
        <TextInput
          placeholder="Add new user..."
          value={newCreatedUser}
          onChangeText={setCreatedUser}
          style={styles.textInput}
          placeholderTextColor="#e0e0e0"
        />
        <TouchableOpacity onPress={createUserClicked} style={styles.button}>
          <Text style={styles.buttonText}>Make a new user</Text>
        </TouchableOpacity>
        {newCreatedUser && <Text>New Created User should be... {newCreatedUser}</Text> }

        <Text>Make a new group:</Text>

        <Text>Make a new item:</Text>

        <Text>Make a new Favor:</Text>


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

  ,textInput: {
    width: '90%',
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: '#fff',
    marginTop: 12
  }
  ,button: {
    marginTop: 12,
    width: '90%',
    height: 44,
    borderRadius: 8,
    backgroundColor: '#0d47a1',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  }
  ,buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  }
});
