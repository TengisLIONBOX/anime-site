import React from "react";
import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 72,
          backgroundColor: "#1F222A",
          borderTopColor: "#1F222A",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          marginBottom: 20,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: () => <AntDesign name="home" size={24} color="#D6D6D6" />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="mylist"
        options={{
          tabBarIcon: () => (
            <AntDesign name="profile" size={24} color="#D6D6D6" />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: () => <AntDesign name="user" size={24} color="#D6D6D6" />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
