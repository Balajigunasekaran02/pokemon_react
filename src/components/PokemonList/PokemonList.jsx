import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon.jsx";
// Custom Hook
import usePokemonList from "../../hooks/usePokemonList";
function PokemonList() {
  const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon";
  const [pokemonStateList, setPokemonStateList] = usePokemonList(DEFAULT_URL);

  return (
    <div className="pokemon-list-wrapper">
      <div className="page-controls">
        <button
          onClick={() =>
            setPokemonStateList({
              ...pokemonStateList,
              pokedexUrl: pokemonStateList.previousUrl,
            })
          }
        >
          Prev
        </button>
        <button
          onClick={() =>
            setPokemonStateList({
              ...pokemonStateList,
              pokedexUrl: pokemonStateList.nextUrl,
            })
          }
        >
          Next
        </button>
      </div>
      <div className="pokemon-list">
        {pokemonStateList.pokemonList.map((pokemon) => (
          <Pokemon
            name={pokemon.name}
            key={pokemon.id}
            id={pokemon.id}
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
