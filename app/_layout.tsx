import { Stack } from "expo-router";
import "./globals.css";
import StoreProvider from "@/providers/store-provider";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <StoreProvider>
      <StatusBar hidden />

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
      </Stack>
    </StoreProvider>
  );
}
