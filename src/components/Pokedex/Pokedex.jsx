import "./Pokedex.css";
import Search from "../Search/Search.jsx";
import PokemonList from "../PokemonList/PokemonList.jsx";
import { useState } from "react";
import PokemonDetails from "../PokemonDetails/PokemonDetails";
function Pokedex() {
  const [searchterm, setSearchTerm] = useState("");
  return (
    <div className="pokedex-wrapper">
      <h1>Pokedex</h1>
      <Search updateSearchTerm={setSearchTerm} />
      {searchterm ? (
        <PokemonDetails pokemonName={searchterm} />
      ) : (
        <PokemonList />
      )}
      <PokemonList />
    </div>
  );
}

export default Pokedex;
