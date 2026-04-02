import { useFetch } from "@/libs/api/useFetch";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export function PokemonSearchBar() {
  const router = useRouter();
  const [searchName, setSearchName] = useState("");

  const { refetch: checkPokemon, isFetching } = useFetch<any>(
    ["pokemon-check", searchName.toLowerCase().trim()],
    `https://pokeapi.co/api/v2/pokemon/${searchName.toLowerCase().trim()}`,
    {},
    {
      enabled: false,
      retry: false,
    },
  );

  const onSearchHandler = async () => {
    const name = searchName.toLowerCase().trim();
    if (!name) return;

    try {
      const { data } = await checkPokemon();
      if (data) {
        router.push({ pathname: "/PokemonDetail", params: { name } });
      } else {
        router.push({ pathname: "/PokemonNotFound", params: { name } });
      }
    } catch {
      router.push({ pathname: "/PokemonNotFound", params: { name } });
    }
  };

  return (
    <View className="bg-white rounded-full flex-row items-center px-4 py-1 shadow-xl">
      <Text className="text-gray-400 mr-2 text-lg">🔍</Text>
      <TextInput
        placeholder="E.g. Pikachu"
        placeholderTextColor="#9ca3af"
        value={searchName}
        onChangeText={setSearchName}
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={onSearchHandler}
        className="flex-1 text-gray-800 h-10"
      />
      <TouchableOpacity
        onPress={onSearchHandler}
        disabled={isFetching}
        className="bg-[#333] px-6 py-2 rounded-full min-w-[70px] items-center justify-center"
      >
        {isFetching ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className="text-white font-bold text-[10px]">GO</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
