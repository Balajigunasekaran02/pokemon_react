import "./PokemonDetails.css";
import { Link, useParams } from "react-router-dom";
//Custom hook
import usePokemon from "../../hooks/usePokemon";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon] = usePokemon(id);
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
