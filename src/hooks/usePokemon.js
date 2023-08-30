import axios from "axios";
import { useEffect, useState } from "react";
import downloadPokemons from "../utils/downloadPokemons";

function usePokemon(id) {
  const POKEMON_DETAIL_URL = "https://pokeapi.co/api/v2/pokemon/";

  const [pokemon, setPokemon] = useState(null);

  const [pokemonStateList, setPokemonStateList] = useState({
    pokemonList: [],
    pokedexUrl: "",
    previousUrl: "",
    nextUrl: "",
  });

  async function downloadPokemonDetails(id) {
    const response = await axios.get(POKEMON_DETAIL_URL + id);
    //console.log(response);
    const pokemon = response.data;
    setPokemon({
      name: pokemon.name,
      weight: pokemon.weight,
      height: pokemon.height,
      types: pokemon.types,
      front_image: pokemon.sprites.other.dream_world.front_default,
    });

    const types = response.data.types.map((t) => t.type.name);
    return types[0];
  }

  async function downloadPokemonAndRelated(id) {
    const type = await downloadPokemonDetails(id);
    await downloadPokemons(
      pokemonStateList,
      setPokemonStateList,
      ` https://pokeapi.co/api/v2/type/${type}`
    );
  }

  useEffect(() => {
    downloadPokemonAndRelated(id);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);
  return [pokemon, pokemonStateList];
}
export default usePokemon;
