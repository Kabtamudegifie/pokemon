import { SafeAreaView } from "@/components/system-design/presentations";
import { Colors } from "@/constants/Colors";
import { Config } from "@/constants/Configs";
import { Pokemon } from "@/data/models";
import { useFetch } from "@/libs/api/useFetch";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { PokemonHeader } from "./components/PokemonHeader";
import { PokemonMovesModal } from "./components/PokemonMovesModal";
import { PokemonMovesPreview } from "./components/PokemonMovesPreview";
import { PokemonPhysicalInfo } from "./components/PokemonPhysicalInfo";
import { PokemonStats } from "./components/PokemonStats";

export default function PokemonDetail() {
  const { name: pokemonId } = useLocalSearchParams<{ name: string }>();
  const [visible, setVisible] = useState(false);

  const { data, isLoading, error } = useFetch<Pokemon>(
    ["pokemon", pokemonId],
    `${Config.api.endpoints.pokemon}/${pokemonId}`,
  );

  if (isLoading) {
    return (
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: Colors.light.background }}
      >
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: Colors.light.background }}
      >
        <Text className="text-red-500 text-lg">Failed to load Pokémon</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: Colors.light.background }}
      edges={["top", "bottom"]}
    >
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 24,
          marginTop: 55,
          paddingBottom: 40,
        }}
      >
        <View
          className="w-full flex-col gap-4"
          style={{ backgroundColor: Colors.light.background }}
        >
          <PokemonHeader data={data} />
          <PokemonStats data={data} />
          <PokemonPhysicalInfo data={data} />
          <PokemonMovesPreview data={data} onSeeAll={() => setVisible(true)} />

          <PokemonMovesModal
            visible={visible}
            onDismiss={() => setVisible(false)}
            data={data}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
