import { Colors } from "@/constants/Colors";
import { Pokemon } from "@/data/models";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type PokemonMovesPreviewProps = {
  data: Pokemon;
  onSeeAll: () => void;
};

export function PokemonMovesPreview({
  data,
  onSeeAll,
}: PokemonMovesPreviewProps) {
  const previewMoves = data.moves.slice(0, 6);
  const totalMoves = data.moves.length;

  return (
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
          className="text-xl font-bold"
        >
          Moves
        </Text>
        <Text className="text-gray-500 text-xs">{totalMoves} total</Text>
      </View>

      <View className="flex-row flex-wrap gap-3 mb-6">
        {previewMoves.map((move, index) => (
          <View
            key={index}
            className="bg-gray-100 px-5 py-3 rounded-2xl border border-gray-200"
          >
            <Text className="text-gray-700 capitalize text-sm font-medium">
              {move.move.name.replace(/-/g, " ")}
            </Text>
          </View>
        ))}
      </View>

      {totalMoves > 6 && (
        <TouchableOpacity
          onPress={onSeeAll}
          style={{ backgroundColor: Colors.light.primary }}
          className="py-4 rounded-2xl active:opacity-90"
        >
          <Text className="text-white font-bold text-center text-base">
            See All {totalMoves} Moves
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
