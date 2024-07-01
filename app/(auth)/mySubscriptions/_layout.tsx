import { Stack } from "expo-router";

export default function mySubscriptionsLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="index" options={{ title: "", headerShown: false }} />
      <Stack.Screen name="updateSubscription" options={{ title: "" }} />
    </Stack>
  );
}
