import { Stack } from "expo-router";

export default function AnalyticsLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="index" options={{ title: "" }} />
      <Stack.Screen name="newSubscription" options={{ title: "" }} />
    </Stack>
  );
}
