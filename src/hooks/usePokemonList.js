import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList() {
  const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon";

  const [pokemonStateList, setPokemonStateList] = useState({
    pokemonList: [],
    pokedexUrl: DEFAULT_URL,
    previousUrl: DEFAULT_URL,
    nextUrl: DEFAULT_URL,
  });
  async function downloadPokemons() {
    const response = await axios.get(
      pokemonStateList.pokedexUrl ? pokemonStateList.pokedexUrl : DEFAULT_URL
    );

    const pokemonResults = response.data.results;

    const pokemonUrl = pokemonResults.map((pokemon) => axios.get(pokemon.url));
    const pokemonListData = await axios.all(pokemonUrl);

    const pokemonFinalList = pokemonListData.map((pokemonData) => {
      const pokemon = pokemonData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
        abilities: pokemon.abilities[0].ability.name,
      };
    });

    setPokemonStateList({
      ...pokemonStateList,
      pokemonList: pokemonFinalList,
      nextUrl: response.data.next,
      previousUrl: response.data.previous,
    });
  }
  useEffect(() => {
    downloadPokemons();
  }, [pokemonStateList.pokedexUrl]);

  return [pokemonStateList, setPokemonStateList];
}
export default usePokemonList;
