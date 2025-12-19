import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

/**
 * Help page explaining the personal shopping list screen.
 */
export default function HelpScreen() {
  return (
    <View style={styles.container}>
      {/* Configure header */}
      <Stack.Screen
        options={{
          title: "Personal List Help",
          headerShown: true,
        }}
      />

      <Text style={styles.title}>
        Using the Personal List Screen
      </Text>

      <Text style={styles.paragraph}>
        {"\u2022"} If you are trying to add a grocery item to your grocery list, you can
        add an item by typing its name into the &quot;Add new item&quot; text
        area. Next, select a priority from the priorities list, with
        &quot;!!!&quot; being the most important. Then, click &quot;Add item&quot;
        to save your newly recorded grocery item to your personal list.
      </Text>

      <Text style={styles.paragraph}>
        {"\u2022"} If you have already added an item to your list and are trying to remove
        it, you can press the red &quot;x&quot; on the right side of the item
        you would like to delete from the list below.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 16,
  },
});
