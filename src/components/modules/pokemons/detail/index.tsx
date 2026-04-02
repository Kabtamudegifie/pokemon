import { SafeAreaView } from "@/components/system-design/presentations";
import { AppPrimitive } from "@/components/system-design/presentations/primitives";
import LoadingError from "@/components/ui/error-boundary/LoadingError";
import DetailScreenDataLoading from "@/components/ui/loading/DetailScreenDataLoading";
import { Colors } from "@/constants/Colors";
import { Config } from "@/constants/Configs";
import { Pokemon } from "@/data/models";
import { useFetch } from "@/libs";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import { PokemonHeader } from "./components/PokemonHeader";
import { PokemonMovesModal } from "./components/PokemonMovesModal";
import { PokemonMovesPreview } from "./components/PokemonMovesPreview";
import { PokemonPhysicalInfo } from "./components/PokemonPhysicalInfo";
import { PokemonStats } from "./components/pokemon-stats";

export function PokemonDetail() {
  const { width } = useWindowDimensions();
  const isLandscape = width > 600;

  const { name: pokemonId } = useLocalSearchParams<{ name: string }>();
  const [visible, setVisible] = useState(false);

  const { data, isLoading, error } = useFetch<Pokemon>(
    ["pokemon", pokemonId],
    `${Config.api.endpoints.pokemon}/${pokemonId}`,
  );

  if (isLoading) {
    return <DetailScreenDataLoading />;
  }

  if (error || !data) {
    return <LoadingError error="Failed to load Pokemon." />;
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
          marginTop: isLandscape ? 65 : 68,
          paddingBottom: isLandscape ? 70 : 10,
        }}
      >
        <AppPrimitive
          className={
            isLandscape ? "flex-row flex-wrap gap-x-4" : "w-full flex-col gap-4"
          }
          style={{ backgroundColor: Colors.light.background }}
        >
          <AppPrimitive
            className={
              isLandscape ? "flex-1 min-w-[45%] gap-4" : "w-full gap-4"
            }
          >
            <PokemonHeader data={data} />
            <PokemonStats data={data} />
          </AppPrimitive>

          <AppPrimitive
            className={
              isLandscape ? "flex-1 min-w-[45%] gap-4" : "w-full gap-4"
            }
          >
            <PokemonPhysicalInfo data={data} />
            <PokemonMovesPreview
              data={data}
              onSeeAll={() => setVisible(true)}
            />
          </AppPrimitive>

          <PokemonMovesModal
            visible={visible}
            onDismiss={() => setVisible(false)}
            data={data}
          />
        </AppPrimitive>
      </ScrollView>
    </SafeAreaView>
  );
}
