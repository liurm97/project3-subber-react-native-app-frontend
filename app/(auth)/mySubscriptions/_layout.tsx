import { Stack } from "expo-router";

export default function mySubscriptionsLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="index" options={{ title: "" }} />
      <Stack.Screen name="updateSubscription" options={{ title: "" }} />
    </Stack>
  );
}
