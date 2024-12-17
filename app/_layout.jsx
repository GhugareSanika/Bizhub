import { View, Text } from "react-native";
import React from "react";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import LoginScreen from "./../components/LoginScreen";
import { useFonts } from "expo-font";
import * as SecureStore from "expo-secure-store";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },
  saveToken: (key, token) => {
    try {
      return SecureStore.setItemAsync(key, token);
    } catch (err) {
      return;
    }
  },
};
export default function RootLayout() {
  useFonts({
    "lato-regular": require("./../assets/fonts/Lato-Regular.ttf"),
    "lato-bold": require("./../assets/fonts/Lato-Bold.ttf"),
    "lato-light": require("./../assets/fonts/Lato-Light.ttf"),
  });

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <SignedIn>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SignedIn>
      <SignedOut>
        <LoginScreen />
      </SignedOut>
    </ClerkProvider>
  );
}
