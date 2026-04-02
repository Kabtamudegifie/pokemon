import { AppPrimitive } from "@/components/system-design/presentations/primitives";
import { Colors } from "@/constants/Colors";
import { Config } from "@/constants/Configs";
import { NamedAPIResource } from "@/data/models";
import { PaginatedResponse, useInfiniteFetch } from "@/libs";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useMemo } from "react";
import { ActivityIndicator, Image } from "react-native";
import { PokemonSearchBar } from "./components/search";
import { PokemonCard } from "./components/search/PokemonCard";

export function Pokemons() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteFetch<PaginatedResponse<NamedAPIResource>>(
      ["pokemon-list"],
      Config.api.endpoints.pokemon,
      { limit: Config.api.paginationLimit },
    );

  const allPokemons = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data],
  );

  const renderItem = useCallback(
    ({ item }: { item: NamedAPIResource }) => <PokemonCard item={item} />,
    [],
  );

  if (isLoading) {
    return (
      <AppPrimitive className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </AppPrimitive>
    );
  }

  return (
    <AppPrimitive
      className="flex-1"
      style={{ backgroundColor: Colors.light.background }}
    >
      <AppPrimitive
        style={{ backgroundColor: Colors.light.primary }}
        className="pt-16 pb-10 px-8 rounded-b-[40px] z-10 overflow-hidden"
      >
        <AppPrimitive className="flex-row justify-between items-start mb-6">
          <AppPrimitive
            as="text"
            className="text-white text-3xl font-bold leading-tight"
          >
            Who are you{"\n"}looking for?
          </AppPrimitive>

          <Image
            source={require("@/assets/images/icon.png")}
            className="w-36 h-36 opacity-30  absolute -right-20 -top-24"
            resizeMode="contain"
          />
        </AppPrimitive>

        <PokemonSearchBar />
      </AppPrimitive>

      <AppPrimitive className="flex-1 px-2 -mt-6">
        <FlashList<NamedAPIResource>
          data={allPokemons}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          numColumns={2}
          onEndReached={() =>
            hasNextPage && !isFetchingNextPage && fetchNextPage()
          }
          onEndReachedThreshold={0.5}
          contentContainerStyle={{
            paddingTop: 32,
            paddingBottom: 40,
            paddingHorizontal: 8,
          }}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator
                color={Colors.light.primary}
                className="my-8"
              />
            ) : null
          }
        />
      </AppPrimitive>
    </AppPrimitive>
  );
}
