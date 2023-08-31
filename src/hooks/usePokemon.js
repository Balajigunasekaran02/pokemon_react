import axios from "axios";
import { useEffect, useState } from "react";
import downloadPokemons from "../utils/downloadPokemons";
import { useParams } from "react-router-dom";

function usePokemon(pokemonName) {
  const { id } = useParams();
  const POKEMON_DETAIL_URL = "https://pokeapi.co/api/v2/pokemon/";

  const [pokemon, setPokemon] = useState(null);

  const [pokemonStateList, setPokemonStateList] = useState({
    pokemonList: [],
    pokedexUrl: "",
    previousUrl: "",
    nextUrl: "",
  });

  async function downloadPokemonDetails(id) {
    const response = await axios.get(
      POKEMON_DETAIL_URL + (pokemonName ? pokemonName : id)
    );
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
    try {
      const type = await downloadPokemonDetails(id);
      await downloadPokemons(
        pokemonStateList,
        setPokemonStateList,
        ` https://pokeapi.co/api/v2/type/${type}`
      );
    } catch (e) {
      console.log("No Pokemon found");
    }
  }

  useEffect(() => {
    downloadPokemonAndRelated(id);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id, pokemonName]);
  return [pokemon, pokemonStateList];
}
export default usePokemon;
