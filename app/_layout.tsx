import { Stack, useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const { id } = useGlobalSearchParams();
  const [title, setTitle] = useState("");
  useEffect(() => {
    if (id === "TopHitsAnime") {
      setTitle("Top Hits Anime");
    } else if (id === "NewEpisodeReleases") {
      setTitle("New Episode Releases");
    }
  }, [id]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="info/[id]"
        options={{
          headerTitle: "",
          headerShown: true,
          headerTransparent: true,
          headerTintColor: "#fff",
        }}
      />

      <Stack.Screen
        name="all/[id]"
        options={{
          title: `${title}`,
          headerStyle: {
            backgroundColor: "#1F222A",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="search/index"
        options={{
          headerTitle: "",
          headerShown: true,
          headerTransparent: true,
          headerTintColor: "#fff",
        }}
      />
    </Stack>
  );
}
