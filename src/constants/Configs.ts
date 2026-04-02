const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "https://pokeapi.co/api/v2";

export const Config = {
  api: {
    baseUrl: BASE_URL,
    endpoints: {
      pokemon: `${BASE_URL}/pokemon`,
      type: `${BASE_URL}/type`,
    },
    paginationLimit: 20,
  },
  links: {
    artworkBaseUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork",
  },
};
