import { AppPrimitive } from "@/components/system-design/presentations/primitives";
import { Colors } from "@/constants/Colors";
import { Pokemon } from "@/data/models";
import React from "react";
import { Modal, ScrollView, TouchableOpacity } from "react-native";

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
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      transparent
      animationType="fade"
    >
      <AppPrimitive className="flex-1 justify-center bg-black/50 px-4">
        <AppPrimitive
          style={{
            backgroundColor: Colors.light.surface,
            borderRadius: 28,
            padding: 24,
            maxHeight: "85%",
          }}
        >
          <AppPrimitive
            as="text"
            style={{ color: Colors.light.text }}
            className="text-3xl font-bold mb-6"
          >
            {data.name}&apos;s Moves
          </AppPrimitive>

          <ScrollView showsVerticalScrollIndicator={false}>
            <AppPrimitive className="flex-row flex-wrap gap-3 pb-6">
              {data.moves.map((move, index) => (
                <AppPrimitive
                  key={index}
                  className="bg-gray-100 px-5 py-3 rounded-2xl border border-gray-200"
                >
                  <AppPrimitive
                    as="text"
                    className="text-gray-700 capitalize font-medium"
                  >
                    {move.move.name.replace(/-/g, " ")}
                  </AppPrimitive>
                </AppPrimitive>
              ))}
            </AppPrimitive>
          </ScrollView>

          <TouchableOpacity
            onPress={onDismiss}
            style={{ backgroundColor: Colors.light.primary }}
            className="mt-6 py-4 rounded-2xl"
          >
            <AppPrimitive
              as="text"
              className="text-white font-bold text-center text-lg"
            >
              Close
            </AppPrimitive>
          </TouchableOpacity>
        </AppPrimitive>
      </AppPrimitive>
    </Modal>
  );
}
