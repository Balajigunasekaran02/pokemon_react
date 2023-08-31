import "./PokemonDetails.css";
import { Link } from "react-router-dom";
//Custom hook
import usePokemon from "../../hooks/usePokemon";
import Pokemon from "../Pokemon/Pokemon";

function PokemonDetails({ pokemonName }) {
  const [pokemon, pokemonStateList] = usePokemon(pokemonName);

  return (
    pokemon && (
      <>
        <Link className="back-link" to="/">
          &#8592; Pokedex
        </Link>
        <div className="pokemon-details-wrapper">
          <div className="pokemon-detail-name">{pokemon.name}</div>
          <div className="pokemon-image">
            <img src={pokemon.front_image} alt={pokemon.name} />
          </div>
          <div className="pokemon-attr">
            <div> Weight: {pokemon.weight}</div>
            <div> Height: {pokemon.height}</div>
          </div>
          <div className="pokemon-type">
            <h1 className="pokemon-type">Types:</h1>
            {pokemon.types.map((t) => (
              <span className="type" key={t.type.name}>
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
        <div className="similar-pokemons">
          <h2 className="similar-title">Similar Pokemons</h2>
          <div className="related-pokemons">
            {pokemonStateList.pokemonList.length > 0 &&
              pokemonStateList.pokemonList.map((pokemon) => (
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
      </>
    )
  );
}
export default PokemonDetails;
