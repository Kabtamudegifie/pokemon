import { Colors } from "@/constants/Colors";
import { Pokemon } from "@/data/models";
import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

type PokemonMovesModalProps = {
  visible: boolean;
  onDismiss: () => void;
  data: Pokemon;
};

export function PokemonMovesModal({
  visible,
  onDismiss,
  data,
}: PokemonMovesModalProps) {
  return (
    <Modal visible={visible} onDismiss={onDismiss}>
      <View
        style={{
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
          onPress={onDismiss}
          style={{ backgroundColor: Colors.light.primary }}
          className="mt-6 py-4 rounded-2xl"
        >
          <Text className="text-white font-bold text-center text-lg">
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
