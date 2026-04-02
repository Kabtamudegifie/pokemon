import { Colors } from "@/constants/Colors";
import { Config } from "@/constants/Configs";
import { Layout } from "@/constants/Layout";
import { NamedAPIResource } from "@/data/models";
import {
  PaginatedResponse,
  useInfiniteFetch,
} from "@/libs/api/useInfiniteFetch";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PokemonSearchBar } from "./components/search";

export default function Pokemons() {
  const router = useRouter();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteFetch<PaginatedResponse<NamedAPIResource>>(
      ["pokemon-list"],
      Config.api.endpoints.pokemon,
      { limit: Config.api.paginationLimit },
    );

  const allPokemons = data?.pages.flatMap((page) => page.results) ?? [];

  const renderItem = useCallback(
    ({ item }: { item: NamedAPIResource }) => {
      const id = item.url.split("/").filter(Boolean).pop();
      const imageUrl = `${Config.links.artworkBaseUrl}/${id}.png`;

      return (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/PokemonDetail",
              params: { name: item.name },
            })
          }
          activeOpacity={0.9}
          style={{
            width: Layout.grid.itemWidth,
            backgroundColor: Colors.light.surface,
          }}
          className="rounded-[24px] p-4 mb-4 shadow-sm shadow-black/5 items-center mx-2"
        >
          <View className="flex-row justify-between w-full mb-1">
            <Text
              style={{ color: Colors.light.primary }}
              className="font-bold text-[11px] capitalize"
            >
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
    [router],
  );

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        className="flex-1"
        color={Colors.light.primary}
      />
    );
  }

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: Colors.light.background }}
    >
      <View
        style={{ backgroundColor: Colors.light.primary }}
        className="pt-16 pb-10 px-8 rounded-b-[40px] z-10"
      >
        <View className="flex-row justify-between items-start mb-6">
          <Text className="text-white text-3xl font-bold leading-tight">
            Who are you{"\n"}looking for?
          </Text>

          <View className="w-24 h-24 bg-white/10 rounded-full absolute -right-6 -top-4">
            <Image
              source={require("../../../../assets/images/icon.png")}
              className="w-24 h-24 rounded-full"
              resizeMode="contain"
            />
          </View>
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
            isFetchingNextPage ? (
              <ActivityIndicator
                color={Colors.light.primary}
                className="my-4"
              />
            ) : null
          }
        />
      </View>
    </View>
  );
}
