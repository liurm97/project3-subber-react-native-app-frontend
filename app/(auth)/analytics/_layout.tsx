import { Stack } from "expo-router";

export default function AnalyticsLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "", title: "", headerShown: false }}
      />
    </Stack>
  );
}
