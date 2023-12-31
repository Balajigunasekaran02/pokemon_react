import Pokedex from "./components/Pokedex/Pokedex.jsx";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Pokedex />} />
      <Route path="/pokemon/:id" element={<PokemonDetails />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
