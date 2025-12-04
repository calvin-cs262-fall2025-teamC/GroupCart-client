// app/_layout.tsx
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { SplashScreen, Tabs } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { moderateScale } from '../utils/scaling';


const listIcon = require("@/assets/images/shopping-list.png");
const favorIcon = require("@/assets/images/transfer.png");
const cartIcon = require("@/assets/images/cart.png");
const profileIcon = require("@/assets/images/user.png");

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
  }, [focused,scale]);

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




    <Tabs
      screenOptions={({ route }: { route: any }) => ({
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#555",
        headerShown: false,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: moderateScale(24),
          fontFamily: "Montserrat",
        },
        headerStyle: {
          backgroundColor: "white",
        },
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: "white",
        },
      })}
    >
      <Tabs.Screen
  name="pages/UserLoginPage"
  options={{ title: "Login" }}
/>
<Tabs.Screen
  name="pages/JoinGrouPage"
  options={{ title: "Join Group" }}
/>
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
            headerTitle: "Favors",
            title: "Favors",
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon source={favorIcon} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
             headerTitle: "Group Cart",
            title: " Group Cart",
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon source={cartIcon} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
             headerTitle: "Profile",
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon source={profileIcon} color={color} focused={focused} />

            ),
          }}
        />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  image: {
    width: moderateScale(22),
    height: moderateScale(22),
    marginBottom: "auto",
  },
});