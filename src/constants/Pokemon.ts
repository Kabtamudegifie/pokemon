export const POKEMON_TYPE_COLORS: Record<string, string> = {
  grass: "#78c850",
  poison: "#a040a0",
  fire: "#f08030",
  water: "#6890f0",
  bug: "#a8b820",
  normal: "#a8a878",
  electric: "#f8d030",
  ground: "#e0c068",
  fairy: "#ee99ac",
  fighting: "#c03028",
  psychic: "#f85888",
  rock: "#b8a038",
  ghost: "#705898",
  ice: "#98d8d8",
  dragon: "#7038f8",
  dark: "#705848",
  steel: "#b8b8d0",
  flying: "#a890f0",
};

export const STAT_COLORS: Record<string, string> = {
  hp: "#4fc1a6",
  attack: "#f7776a",
  defense: "#f8d030",
  speed: "#f7776a",
};

export const STAT_NAME_MAP: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  speed: "Speed",
};

export const getTypeColor = (type: string): string => {
  return POKEMON_TYPE_COLORS[type.toLowerCase()] || "#8a8a8a";
};

export const getStatColor = (name: string): string => {
  return STAT_COLORS[name.toLowerCase()] || "#94a3b8";
};

export const formatStatName = (name: string): string => {
  return (
    STAT_NAME_MAP[name.toLowerCase()] ||
    name.charAt(0).toUpperCase() + name.slice(1)
  );
};

export const formatHeight = (heightDm: number) => {
  const meters = (heightDm / 10).toFixed(1);
  const totalInches = Math.round((heightDm / 10) * 39.3701);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return {
    ftIn: `${feet}'${inches.toString().padStart(2, "0")}"`,
    meters: `${meters} m`,
  };
};

export const formatWeight = (weightHg: number) => {
  const kg = (weightHg / 10).toFixed(1);
  const lbs = (parseFloat(kg) * 2.20462).toFixed(1);
  return {
    kg,
    lbs,
  };
};
