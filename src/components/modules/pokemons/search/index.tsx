import { SearchIcon } from "@/components/system-design/utils";
import { NamedAPIResource } from "@/data/models";
import { useFetch } from "@/libs/api/useFetch";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export function PokemonSearchBar() {
  const router = useRouter();
  const [searchName, setSearchName] = useState("");

  const { refetch: checkPokemon, isFetching } = useFetch<NamedAPIResource>(
    ["pokemon-check", searchName.toLowerCase().trim()],
    `https://pokeapi.co/api/v2/pokemon/${searchName.toLowerCase().trim()}`,
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

      <TextInput
        placeholder="Eg. Pikachu"
        value={searchName}
        onChangeText={setSearchName}
        onSubmitEditing={onSearchHandler}
        mode="outlined"
        dense
        selectionColor="#000"
        cursorColor="#000"
        activeOutlineColor="transparent"
        outlineStyle={{ borderRadius: 999, borderWidth: 0 }}
        style={styles.input}
        contentStyle={styles.inputContent}
        theme={{
          colors: {
            primary: "transparent",
            background: "white",
            text: "#000",
          },
        }}
      />

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={onSearchHandler}
          loading={isFetching}
          disabled={isFetching || !searchName.trim()}
          buttonColor="#000"
          textColor="#fff"
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          {!isFetching && "GO"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 999, // Full pill shape
    height: 44, // Increased back to 44 for better proportion
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
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 999,
    height: 32,
    minWidth: 0,
  },
  buttonContent: {
    height: 32,
    paddingHorizontal: 16,
  },
  buttonLabel: {
    fontSize: 11,
    fontWeight: "700",
    marginHorizontal: 0,
    lineHeight: 14,
    includeFontPadding: false,
  },
});
