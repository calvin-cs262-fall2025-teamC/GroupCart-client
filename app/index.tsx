import { HeaderTitle } from "@react-navigation/elements";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HeaderTitle>Welcome to GroupCart!</HeaderTitle>
      <Text>Coordinate your grocery list with housemates!</Text>
    </View>
  );
}
