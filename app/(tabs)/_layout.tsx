import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        headerShown: false,
        tabBarStyle: { height: 60, paddingBottom: 10 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "My Tasks",
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
