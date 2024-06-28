import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export const LogoutButton = () => {
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={"#fff"} />
    </Pressable>
  );
};

const TabsPage = () => {
  const { isSignedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#C8E9E7",
        },
        headerTintColor: "#fff",
      }}
    >
      <Tabs.Screen
        name="analytics"
        options={{
          tabBarLabel: "Analytics",
          title: "Analytics",
          tabBarIcon: ({ focused, color }) => {
            const iconName = focused ? "bar-chart" : "bar-chart-o";
            return <FontAwesome size={32} name={"bar-chart-o"} color={color} />;
          },
          tabBarActiveTintColor: "#ff7e7e",
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="addSubscriptions"
        options={{
          title: "Add Subscriptions",
          tabBarIcon: ({ focused, color }) => {
            // const iconName = focused ? "plus-square" : "plus-square-o";
            return <FontAwesome size={40} name={"plus-square"} color={"red"} />;
          },
          // tabBarActiveTintColor: "red",
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="mySubscriptions"
        options={{
          tabBarLabel: "My Subscriptions",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={32} name="star" color={color} />
          ),
          tabBarActiveTintColor: "#ff7e7e",
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
};

export default TabsPage;
