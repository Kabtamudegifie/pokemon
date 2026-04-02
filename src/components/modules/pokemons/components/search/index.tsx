import { AppButton } from "@/components/system-design/forms/Button";
import { AppTextInput } from "@/components/system-design/forms/TextInput";
import { SearchIcon } from "@/components/system-design/utils";
import { Config } from "@/constants/Configs";
import { NamedAPIResource } from "@/data/models";
import { useFetch } from "@/libs/api/useFetch";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

export function PokemonSearchBar() {
  const router = useRouter();
  const [searchName, setSearchName] = useState("");

  const { refetch: checkPokemon, isFetching } = useFetch<NamedAPIResource>(
    ["pokemon-check", searchName.toLowerCase().trim()],
    `${Config.api.endpoints.pokemon}/${searchName.toLowerCase().trim()}`,
    {},
    { enabled: false, retry: false },
  );

  const onSearchHandler = async () => {
    const name = searchName.toLowerCase().trim();
    if (!name) return;

    try {
      const { data } = await checkPokemon();
      if (data) {
        router.push({ pathname: "/PokemonDetail", params: { name } });
      } else {
        router.push({ pathname: "/PokemonNotFound", params: { name } });
      }
    } catch {
      router.push({ pathname: "/PokemonNotFound", params: { name } });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <SearchIcon size={20} className="text-gray-400" />
      </View>

      <AppTextInput
        placeholder="Eg. Pikachu"
        value={searchName}
        onChangeText={setSearchName}
        onSubmitEditing={onSearchHandler}
        size="sm"
      />

      <AppButton
        size="sm"
        onPress={onSearchHandler}
        loading={isFetching}
        disabled={isFetching || !searchName.trim()}
        loadingShrink
      >
        GO
      </AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 999,
    height: 44,
    paddingLeft: 12,
    paddingRight: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    height: 44,
  },
  inputContent: {
    fontSize: 14,
    paddingLeft: 4,
  },
  searchButton: {
    height: 32,
    borderRadius: 999,
  },
});
