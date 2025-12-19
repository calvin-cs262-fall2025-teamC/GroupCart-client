import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

/**
 * Help page explaining the group cart screen and purchase tracking.
 */
export default function GroupCartHelp() {
  return (
    <>
      {/* Configure header for this screen */}
      <Stack.Screen
        options={{
          title: "Group Cart Help",
          headerShown: true,
        }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Using the Group Cart Screen</Text>

        <Text style={styles.paragraph}>
          {"\u2022"} If you are on a shopping trip and would like to know what groceries
          to buy for your group, look at the list of grocery items shown in the
          main body of the &quot;Group Cart&quot; screen. The &quot;Group Cart&quot;
          screen shows you a collection of grocery items that all of your group
          members currently need, and what items they are overlapping on as
          indicated by their colored dots. You can use this list to keep track of
          what grocery items you are purchasing while on your trip.
        </Text>

        <Text style={styles.paragraph}>
          {"\u2022"} If you are on a shopping trip and would like to mark that you are
          purchasing for your group, you can look in the &quot;NEEDED ITEMS&quot;
          section at the top of the screen (if there are no groceries to be
          purchased, this section will not be present). Find the item you are
          purchasing and click the &quot;Mark as Purchased&quot; button. This will
          move the item to the &quot;PURCHASED ITEMS&quot; section of the Group
          Cart screen and create a favor between you and the other group members
          who were requesting this grocery item.
        </Text>

        <Text style={styles.paragraph}>
          {"\u2022"} If you are on a shopping trip and marked an item as purchased, but
          for some reason no longer wish to report that item as purchased
          (potentially because you realized you could get a better deal on that
          item later, or you forgot to bring enough money to the grocery store, or
          other reasons), you can go to the &quot;PURCHASED ITEMS&quot; section.
          Find the item you previously marked as purchased and click the
          &quot;Mark as Not Purchased&quot; button. This will remove the favor you
          created for that item and return it to the &quot;NEEDED ITEMS&quot; list
          so that it can be purchased by someone else.
        </Text>
      </View>
    </>
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
