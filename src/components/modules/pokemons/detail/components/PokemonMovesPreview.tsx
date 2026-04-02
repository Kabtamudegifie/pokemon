import { AppPrimitive } from "@/components/system-design/presentations/primitives";
import { Colors } from "@/constants/Colors";
import { Pokemon } from "@/data/models";
import React from "react";
import { TouchableOpacity } from "react-native";

export function PokemonMovesPreview({
  data,
  onSeeAll,
}: {
  data: Pokemon;
  onSeeAll: () => void;
}) {
  const previewMoves = data.moves.slice(0, 6);
  const totalMoves = data.moves.length;

  return (
    <AppPrimitive
      style={{
        backgroundColor: Colors.light.surface,
        borderColor: Colors.light.border,
      }}
      className="rounded-3xl p-6 mb-10 shadow-xl border"
    >
      <AppPrimitive className="flex-row justify-between items-center mb-5">
        <AppPrimitive
          as="text"
          style={{ color: Colors.light.text }}
          className="text-xl font-bold"
        >
          Moves
        </AppPrimitive>
        <AppPrimitive as="text" className="text-gray-500 text-xs">
          {totalMoves} total
        </AppPrimitive>
      </AppPrimitive>

      <AppPrimitive className="flex-row flex-wrap gap-3 mb-6">
        {previewMoves.map((move, index) => (
          <AppPrimitive
            key={index}
            className="bg-gray-100 px-5 py-3 rounded-2xl border border-gray-200"
          >
            <AppPrimitive
              as="text"
              className="text-gray-700 capitalize text-sm font-medium"
            >
              {move.move.name.replace(/-/g, " ")}
            </AppPrimitive>
          </AppPrimitive>
        ))}
      </AppPrimitive>

      {totalMoves > 6 && (
        <TouchableOpacity
          onPress={onSeeAll}
          style={{ backgroundColor: Colors.light.primary }}
          className="py-4 rounded-2xl active:opacity-90"
        >
          <AppPrimitive
            as="text"
            className="text-white font-bold text-center text-base"
          >
            See All {totalMoves} Moves
          </AppPrimitive>
        </TouchableOpacity>
      )}
    </AppPrimitive>
  );
}
