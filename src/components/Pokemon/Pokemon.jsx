import "./Pokemon.css";
function Pokemon({ name, imageUrl, ability }) {
  return (
    <div className="pokemon">
      <h1 className="pokemon-name">{name}</h1>
      <p className="poke-ability">Ability : {ability}</p>

      <img className="pokemon-img" src={imageUrl} alt={name} />
    </div>
  );
}
export default Pokemon;
