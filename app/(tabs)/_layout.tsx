import { Tabs } from "expo-router";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";

const listIcon = require("@/assets/images/shopping-list.png");
const favorIcon = require("@/assets/images/transfer.png");
const cartIcon = require("@/assets/images/cart.png");

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "My List",
          tabBarIcon: ({ color }) => (
            <Image
              source={listIcon}
              tintColor={color}
              style={styles.image}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favors"
        options={{
          title: "Completed Favors",
          tabBarIcon: ({ color }) => (
            <Image
              source={favorIcon}
              tintColor={color}
              style={styles.image}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Group Cart",
          tabBarIcon: ({ color }) => (
            <Image
              source={cartIcon}
              tintColor={color}
              style={styles.image}
            />
          ),
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
  }
});
