// app/_layout.tsx
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { SplashScreen, Tabs } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { UserProvider } from '../contexts/UserContext';



const listIcon = require("@/assets/images/shopping-list.png");
const favorIcon = require("@/assets/images/transfer.png");
const cartIcon = require("@/assets/images/cart.png");
const settingsIcon = require("@/assets/images/setting.png");

function AnimatedTabIcon({
  source,
  color,
  focused,
}: {
  source: any;
  color: string;
  focused: boolean;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.15 : 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Image source={source} tintColor={color} style={styles.image} />
    </Animated.View>
  );
}

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    Shanti: require("../../assets/images/Shanti-Regular.ttf"),
    Montserrat: require("../../assets/images/Montserrat-Regular.ttf"),
  });

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }

  return (
    <UserProvider>
      <Tabs
        // Allow per-route headerTitle to be provided via route params (e.g. { headerTitle: 'My Title' })
        screenOptions={({ route }: { route: any }) => ({
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "#555",
          // Use headerTitle from route params when available; otherwise fall back to default title behavior
          headerTitle: route?.params?.headerTitle ?? undefined,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 24,
            fontFamily: "Montserrat",
          },
          tabBarStyle: {
            borderTopWidth: 0,
            elevation: 0,
            backgroundColor: "white",
          },
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Shopping List",
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon source={listIcon} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="favors"
          options={{
            title: "Favors",
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon source={favorIcon} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "Group Cart",
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon source={cartIcon} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="dev"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon source={settingsIcon} color={color} focused={focused} />

            ),
          }}
        />
      </Tabs>
    </UserProvider>

  );
}

const styles = StyleSheet.create({
  image: {
    width: 22,
    height: 22,
    marginBottom: "auto",
  },
});