import { useEffect, useState } from "react";
import "./PokemonDetails.css";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
function PokemonDetails() {
  const { id } = useParams();
  const POKEMON_DETAIL_URL = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemon, setPokemon] = useState(null);
  async function showDetails() {
    const response = await axios.get(POKEMON_DETAIL_URL + id);
    console.log(response);
    const pokemon = response.data;
    setPokemon({
      name: pokemon.name,
      weight: pokemon.weight,
      height: pokemon.height,
      types: pokemon.types,
      front_image: pokemon.sprites.other.dream_world.front_default,
    });
  }

  useEffect(() => {
    showDetails();
  }, []);
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
      </>
    )
  );
}
export default PokemonDetails;
