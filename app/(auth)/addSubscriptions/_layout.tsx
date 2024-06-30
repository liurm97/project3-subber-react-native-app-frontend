import { Stack } from "expo-router";

export default function AddSubscriptionLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6c47ff",
        },
        headerTintColor: "#fff",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Available Subscriptions",
          title: "Available Subscriptions",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="newSubscription"
        options={{
          title: "New Subscription",
          headerTitle: "New Subscription",
        }}
      />
    </Stack>
  );
}
