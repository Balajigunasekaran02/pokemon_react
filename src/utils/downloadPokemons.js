import axios from "axios";

async function downloadPokemons(
  pokemonStateList,
  setPokemonStateList,
  default_url,
  itemsPerPage = 20
) {
  const response = await axios.get(
    pokemonStateList.pokedexUrl ? pokemonStateList.pokedexUrl : default_url
  );

  let pokemonResults = response.data.results
    ? response.data.results
    : response.data.pokemon;
  pokemonResults = pokemonResults.slice(0, itemsPerPage);

  const pokemonUrl = pokemonResults.map((p) => {
    if (p.url) {
      return axios.get(p.url);
    } else if (p.pokemon.url) {
      return axios.get(p.pokemon.url);
    }
  });
  const pokemonListData = await axios.all(pokemonUrl);
  //console.log(pokemonListData);

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

export default downloadPokemons;
