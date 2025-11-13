import { Stack } from "expo-router";
import "./globals.css";
import StoreProvider from "@/providers/store-provider";

export default function RootLayout() {
  return (
    <StoreProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
      </Stack>
    </StoreProvider>
  );
}
