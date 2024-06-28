import { Text, View, Pressable } from "react-native";
import React, { Component, useEffect } from "react";
import { Link, Stack } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/clerk-expo";
// import SignOutButton from "../../../components/signOutButton";
// import { Button, ButtonText } from "@gluestack-ui/themed";
export default function index() {
  const { signOut } = useAuth();
  const doLogout = () => {
    signOut();
  };
  const signedInUser = useUser();
  console.log("signedInUser", signedInUser);
  return (
    <View>
      <Text>analytics page</Text>
      <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
        <Text>Ad</Text>
      </Pressable>
    </View>
  );
}
