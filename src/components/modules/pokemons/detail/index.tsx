import { SafeAreaView } from "@/components/system-design/presentations";
import { Colors } from "@/constants/Colors";
import { Config } from "@/constants/Configs";
import {
  formatHeight,
  formatStatName,
  getStatColor,
  getTypeColor,
} from "@/constants/Pokemon";

import { Pokemon } from "@/data/models";
import { useFetch } from "@/libs/api/useFetch";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, PaperProvider } from "react-native-paper";

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

  const formattedId = `#${data.id.toString().padStart(3, "0")}`;
  const height = formatHeight(data.height);
  const weightKg = (data.weight / 10).toFixed(1);
  const weightLbs = (parseFloat(weightKg) * 2.20462).toFixed(1);

  const displayStats = data.stats.filter((s) =>
    ["hp", "attack", "defense", "speed"].includes(s.stat.name),
  );

  const previewMoves = data.moves.slice(0, 6);
  const totalMoves = data.moves.length;

  return (
    <PaperProvider>
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
            style={{
              backgroundColor: Colors.light.surface,
              borderColor: Colors.light.border,
            }}
            className="rounded-3xl p-6 mb-6 shadow-xl border"
          >
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className="text-gray-400 font-bold text-lg tracking-widest">
                  {formattedId}
                </Text>
                <Text
                  style={{ color: Colors.light.text }}
                  className="text-3xl font-black capitalize mt-1"
                >
                  {data.name}
                </Text>
              </View>

              <Image
                source={{
                  uri:
                    data.sprites.other?.["official-artwork"]?.front_default ||
                    data.sprites.front_default ||
                    "",
                }}
                className="w-40 h-40 -mt-4"
                resizeMode="contain"
              />
            </View>

            <View className="flex-row gap-3 mt-6">
              {data.types.map((t, index) => {
                const color = getTypeColor(t.type.name);
                return (
                  <View
                    key={index}
                    className="px-6 py-2 rounded-2xl flex-row items-center gap-2"
                    style={{ backgroundColor: color }}
                  >
                    <View className="w-3 h-3 bg-white/70 rounded-full" />
                    <Text className="text-white font-bold text-sm uppercase tracking-wider">
                      {t.type.name}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View className="mt-10">
              <Text className="text-gray-500 font-semibold text-sm mb-5 tracking-widest">
                BASE STATS
              </Text>
              {displayStats.map((stat) => (
                <View key={stat.stat.name} className="mb-6">
                  <View className="flex-row justify-between mb-2">
                    <Text className="font-semibold text-gray-700">
                      {formatStatName(stat.stat.name)}
                    </Text>
                    <Text
                      style={{ color: Colors.light.text }}
                      className="font-bold text-lg"
                    >
                      {stat.base_stat}
                    </Text>
                  </View>
                  <View className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <View
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(stat.base_stat, 100)}%`,
                        backgroundColor: getStatColor(stat.stat.name),
                      }}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View
            style={{
              backgroundColor: Colors.light.surface,
              borderColor: Colors.light.border,
            }}
            className="rounded-3xl p-6 mb-6 shadow-xl border"
          >
            <Text
              style={{ color: Colors.light.text }}
              className="text-2xl font-bold mb-6"
            >
              Physical Info
            </Text>

            <View className="flex-row gap-4">
              <View className="flex-1 bg-gray-50 rounded-2xl p-5">
                <Text className="text-xs font-bold text-gray-400 mb-3 tracking-widest">
                  HEIGHT
                </Text>
                <Text
                  style={{ color: Colors.light.text }}
                  className="text-3xl font-bold"
                >
                  {height.ftIn}
                </Text>
                <Text className="text-gray-500 text-sm mt-1">
                  {height.meters}
                </Text>
              </View>

              <View className="flex-1 bg-gray-50 rounded-2xl p-5">
                <Text className="text-xs font-bold text-gray-400 mb-3 tracking-widest">
                  WEIGHT
                </Text>
                <Text
                  style={{ color: Colors.light.text }}
                  className="text-3xl font-bold"
                >
                  {weightLbs} lbs
                </Text>
                <Text className="text-gray-500 text-sm mt-1">
                  {weightKg} kg
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: Colors.light.surface,
              borderColor: Colors.light.border,
            }}
            className="rounded-3xl p-6 mb-10 shadow-xl border"
          >
            <View className="flex-row justify-between items-center mb-5">
              <Text
                style={{ color: Colors.light.text }}
                className="text-2xl font-bold"
              >
                Moves
              </Text>
              <Text className="text-gray-500 text-sm">{totalMoves} total</Text>
            </View>

            <View className="flex-row flex-wrap gap-3 mb-6">
              {previewMoves.map((move, index) => (
                <View
                  key={index}
                  className="bg-gray-100 px-5 py-3 rounded-2xl border border-gray-200"
                >
                  <Text className="text-gray-700 capitalize font-medium">
                    {move.move.name.replace(/-/g, " ")}
                  </Text>
                </View>
              ))}
            </View>

            {totalMoves > 6 && (
              <TouchableOpacity
                onPress={() => setVisible(true)}
                style={{ backgroundColor: Colors.light.primary }}
                className="py-4 rounded-2xl active:opacity-90"
              >
                <Text className="text-white font-bold text-center text-base">
                  See All {totalMoves} Moves
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>

        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={{
            backgroundColor: Colors.light.surface,
            margin: 16,
            borderRadius: 28,
            padding: 24,
            maxHeight: "85%",
          }}
        >
          <Text
            style={{ color: Colors.light.text }}
            className="text-3xl font-bold mb-6"
          >
            {data.name}&apos;s Moves
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex-row flex-wrap gap-3 pb-6">
              {data.moves.map((move, index) => (
                <View
                  key={index}
                  className="bg-gray-100 px-5 py-3 rounded-2xl border border-gray-200"
                >
                  <Text className="text-gray-700 capitalize font-medium">
                    {move.move.name.replace(/-/g, " ")}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{ backgroundColor: Colors.light.primary }}
            className="mt-6 py-4 rounded-2xl"
          >
            <Text className="text-white font-bold text-center text-lg">
              Close
            </Text>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    </PaperProvider>
  );
}
