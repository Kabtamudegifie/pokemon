import { NamedAPIResource } from "@/data/models";
import {
  PaginatedResponse,
  useInfiniteFetch,
} from "@/libs/api/useInfiniteFetch";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "expo-router";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PokemonSearchBar } from "./components/search";

const SCREEN_WIDTH = Dimensions.get("window").width;
const GAP = 16;
const ITEM_WIDTH = (SCREEN_WIDTH - GAP * 3) / 2;

export default function Pokemons() {
  const navigation = useNavigation<any>();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteFetch<PaginatedResponse<NamedAPIResource>>(
      ["pokemon-list"],
      "https://pokeapi.co/api/v2/pokemon",
      { limit: 20 },
    );

  const allPokemons = data?.pages.flatMap((page) => page.results) ?? [];

  const renderItem = useCallback(
    ({ item }: { item: NamedAPIResource }) => {
      const id = item.url.split("/").filter(Boolean).pop();
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PokemonDetail", { name: item.name })
          }
          activeOpacity={0.9}
          style={{ width: ITEM_WIDTH }}
          className="bg-white rounded-[24px] p-4 mb-4 shadow-sm shadow-black/5 items-center mx-2"
        >
          <View className="flex-row justify-between w-full mb-1">
            <Text className="text-[#1D35AD] font-bold text-[11px] capitalize">
              {item.name}
            </Text>
            <Text className="text-gray-300 font-bold text-[10px]">
              #{id?.padStart(3, "0")}
            </Text>
          </View>

          <Image
            source={{ uri: imageUrl }}
            className="w-20 h-20 my-2"
            resizeMode="contain"
          />

          <View className="flex-row mt-2 w-full justify-start">
            <View className="bg-[#78C850] px-2 py-0.5 rounded-md mr-1">
              <Text className="text-white text-[8px] font-bold">Grass</Text>
            </View>
            <View className="bg-[#A040A0] px-2 py-0.5 rounded-md">
              <Text className="text-white text-[8px] font-bold">Poison</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [navigation],
  );

  if (isLoading) {
    return (
      <ActivityIndicator size="large" className="flex-1" color="#1D35AD" />
    );
  }

  return (
    <View className="flex-1 bg-[#F5F7FA]">
      <View className="bg-[#1D35AD] pt-16 pb-10 px-8 rounded-b-[40px] z-10">
        <View className="flex-row justify-between items-start mb-6">
          <Text className="text-white text-3xl font-bold leading-tight">
            Who are you{"\n"}looking for?
          </Text>
          <View className="w-24 h-24 bg-white/10 rounded-full absolute -right-6 -top-4" />
        </View>

        <PokemonSearchBar />
      </View>

      <View className="flex-1 px-2 -mt-4">
        <FlashList<NamedAPIResource>
          data={allPokemons}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          numColumns={2}
          onEndReached={() =>
            hasNextPage && !isFetchingNextPage && fetchNextPage()
          }
          onEndReachedThreshold={0.5}
          contentContainerStyle={{ paddingTop: 24, paddingBottom: 40 }}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator className="my-4" /> : null
          }
        />
      </View>
    </View>
  );
}
