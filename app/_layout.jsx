import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#005a87" },
        headerTintColor: "#ffffff",
        headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="events" options={{ headerTitle: "Events" }} />
    </Stack>
  );
}



