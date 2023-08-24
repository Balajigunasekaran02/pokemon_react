import { Link } from "react-router-dom";
import "./Pokemon.css";
function Pokemon({ name, imageUrl, ability, id }) {
  return (
    <Link to={`/pokemon/${id}`} className="pokemon-wrapper">
      <div className="pokemon">
        <h1 className="pokemon-name">{name}</h1>
        <p className="poke-ability">Ability : {ability}</p>

        <img className="pokemon-img" src={imageUrl} alt={name} />
      </div>
    </Link>
  );
}
export default Pokemon;
