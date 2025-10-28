// app/_layout.tsx
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

const listIcon = require("@/assets/images/shopping-list.png");
const favorIcon = require("@/assets/images/transfer.png");
const cartIcon = require("@/assets/images/cart.png");

function AnimatedTabIcon({ source, color, focused }: { source: any; color: string; focused: boolean }) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.15 : 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  });

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Image source={source} tintColor={color} style={styles.image} />
    </Animated.View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#222",
        tabBarInactiveTintColor: "#555",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shopping List",
          headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon source={listIcon} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="favors"
        options={{
          title: "Favors",
           headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon source={favorIcon} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Group Cart",
           headerTitleStyle: { fontWeight: "bold",  fontSize: 24 },
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon source={cartIcon} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 22,
    height: 22,
    marginBottom: 'auto',
  },
});