import { AppPrimitive } from "@/components/system-design/presentations/primitives";
import { Colors } from "@/constants/Colors";
import { Pokemon } from "@/data/models";
import React from "react";
import ProgressBar from "./ProgressBar";

export function PokemonStats({ data }: { data: Pokemon }) {
  const displayStats = data.stats.filter((s) =>
    ["hp", "attack", "defense", "speed"].includes(s.stat.name),
  );

  return (
    <AppPrimitive
      style={{
        backgroundColor: Colors.light.surface,
        borderColor: Colors.light.border,
      }}
      className="rounded-3xl p-6 shadow-xl border"
    >
      <AppPrimitive
        as="text"
        className="text-gray-500 font-semibold text-xs tracking-widest"
      >
        BASE STATS
      </AppPrimitive>
      {displayStats.map((stat) => (
        <ProgressBar
          key={stat.stat.url}
          base_stat={stat.base_stat}
          name={stat.stat.name}
        />
      ))}
    </AppPrimitive>
  );
}
