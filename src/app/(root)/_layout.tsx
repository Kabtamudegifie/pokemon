import PokemonHeader from "@/components/modules/pokemons/detail/PokemonHeader";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="PokemonDetail"
        options={{
          headerShown: true,
          headerTransparent: true,
          header: () => <PokemonHeader />,
        }}
      />
    </Stack>
  );
}
