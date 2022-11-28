import './App.css';
import PokemonSearch from './components/Search.js'
import Gallery from './components/Gallery.js'
import Detail from './components/Detail';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Axios from 'axios';
import {useState, React, useEffect} from 'react';

function App() {
  const [allPokemons, setAllPokemons] = useState([]);

  const getAllPokemon = async () => {
    const res = await Axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");

    function getPokemonObjects (result) {
      result.forEach (async (pokemon) => {
        const res = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);

        setAllPokemons(currentList => [...currentList, res["data"]]);
      })
    }
    getPokemonObjects(res["data"]["results"]);
  }

  useEffect(() => {
    getAllPokemon()
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <main>
        <Routes>
          <Route path="/" element={<PokemonSearch allPokemons={allPokemons}/>} />
          <Route path="/gallery" element={<Gallery allPokemons={allPokemons}/>} />
          {allPokemons.map((pokemon) => (
            <Route path={`/details/${pokemon.id}`} element={<Detail name={`${pokemon.name}`} id={`${pokemon.id}`}
            height={`${pokemon.height}`} weight={`${pokemon.weight}`} ability={pokemon.abilities} type={pokemon.types}/>}> </Route>
          ))}
          {/* "Login" */}
          {/* "My Pokemon" */}
          {/* "Random Pokemon Generator" */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
