import { Text, View } from "react-native";
import React, { Component } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function index() {
  return (
    <View>
      <Link href="mySubscriptions/updateSubscription">Update subscription</Link>
    </View>
  );
}
