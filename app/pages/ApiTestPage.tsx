import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppContext } from "../contexts/AppContext";

export default function TestPage() {
  const {user, group, userGroceryList, groupGroceryCollection} = useAppContext();

  const seeList = () => {
    console.log("Showing list")
    console.log(userGroceryList);
  }

  return (
    
    <View style={styles.container}>
      <Text>Our user</Text>
        {user && <Text>{user.firstName} { user.lastName }</Text>}
      <Text>Our group</Text>
        {group && <Text>{group.id} { group.name }</Text>}
        <Text>My list</Text>
        {userGroceryList && userGroceryList[0] && <Text>{userGroceryList[0].item}</Text> }
        {/* <Button onPress={seeList} title="see list"></Button> */}
        <Text>Shared Grocery Collection</Text>
        {groupGroceryCollection && groupGroceryCollection[0] && <Text>{groupGroceryCollection[0].item}</Text> }

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
