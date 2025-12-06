import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function FavorsHelp() {
  return (
    <>
      {/* Configure header for this screen */}
      <Stack.Screen
        options={{
          title: "Favors Help",
          headerShown: true,
        }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Using the Favors Screen</Text>

        <Text style={styles.paragraph}>
          {"\u2022"} To see what you owe your other group members, you can look in the
          You Owe section at the top of the favors screen. If your group members
          have completed any favors for you (as in, bought some items from your
          grocery list on your behalf) the transaction they completed will appear
          there with a title similar to &quot;Sarah bought for you&quot; followed
          by a description of the groceries they bought, the date, and the price
          of the items.
        </Text>

        <Text style={styles.paragraph}>
          {"\u2022"} To see what favors you have completed for your other group members,
          check the You Completed section. Any favor you’ve fulfilled (for
          example, buying items from someone else’s grocery list) will appear
          there with a title like &quot;You bought for Alex,&quot; along with a
          description of the items, the date, and the total cost.
        </Text>

        <Text style={styles.paragraph}>
          {"\u2022"} To mark that you reimbursed another group member for buying one of
          your grocery items, you can locate the transaction in the You Owe
          section at the top of the page, and scroll down until you find your
          transaction. Immediately after the description of your transaction, you
          can click the &quot;Mark as reimbursed&quot; checkbox to signal to them
          that you have reimbursed them for that transaction. The box will gray
          out, but will not disappear until they have acknowledged that you have
          reimbursed them through marking the transaction as reimbursed from
          their side.
        </Text>

        <Text style={styles.paragraph}>
          {"\u2022"} To mark that you have been reimbursed by another group member for a
          favor you completed for them, go to the You Completed section. Find the
          transaction where you fulfilled a favor for them, and click the &quot;Mark
          as reimbursed&quot; checkbox next to the description. This signals to
          your group member that you have received your reimbursement. The box
          will gray out but will remain visible until they confirm the
          reimbursement on their side.
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
