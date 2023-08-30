import { useEffect, useState } from "react";
import downloadPokemons from "../utils/downloadPokemons";

function usePokemonList(DEFAULT_URL) {
  const [pokemonStateList, setPokemonStateList] = useState({
    pokemonList: [],
    pokedexUrl: DEFAULT_URL,
    previousUrl: DEFAULT_URL,
    nextUrl: DEFAULT_URL,
  });

  useEffect(() => {
    downloadPokemons(pokemonStateList, setPokemonStateList, DEFAULT_URL);
  }, [pokemonStateList.pokedexUrl]);

  return [pokemonStateList, setPokemonStateList];
}
export default usePokemonList;
