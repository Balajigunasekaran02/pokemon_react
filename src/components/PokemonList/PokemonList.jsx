import axios from "axios";
import { useState, useEffect } from "react";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
function PokemonList() {
  const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon";
  const [pokemonList, setPokemonList] = useState([]);
  const [pokedexUrl, setPokedexUrl] = useState(DEFAULT_URL);
  const [previousUrl, setPrevUrl] = useState(DEFAULT_URL);
  const [nextUrl, setNextUrl] = useState(DEFAULT_URL);
  async function downloadPokemons() {
    const response = await axios.get(pokedexUrl ? pokedexUrl : DEFAULT_URL);
    // console.log(response.data);
    const pokemonResults = response.data.results;
    setPrevUrl(response.data.previous);
    setNextUrl(response.data.next);
    const pokemonUrl = pokemonResults.map((pokemon) => axios.get(pokemon.url));
    const pokemonListData = await axios.all(pokemonUrl);
    console.log(pokemonListData);
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
    //console.log(PokemonList);
    setPokemonList(pokemonFinalList);
  }
  useEffect(() => {
    downloadPokemons();
  }, [pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <div className="page-controls">
        <button onClick={() => setPokedexUrl(previousUrl)}>Prev</button>
        <button onClick={() => setPokedexUrl(nextUrl)}>Next</button>
      </div>
      <div className="pokemon-list">
        {pokemonList.map((pokemon) => (
          <Pokemon
            name={pokemon.name}
            key={pokemon.id}
            imageUrl={pokemon.image}
            types={pokemon.types}
            ability={pokemon.abilities}
          />
        ))}
      </div>
    </div>
  );
}
export default PokemonList;
