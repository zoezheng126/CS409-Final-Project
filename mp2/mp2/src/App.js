import './App.css';
import PokemonSearch from './components/Search.js'
import Gallery from './components/Gallery.js'
import { getLoginUser as getLoginUser, Login, Signup } from './components/Login';
import Detail from './components/Detail';
import MyPokemon from './components/MyPokemon.js';
import RandomPokemon from './components/RandomPokemon.js';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Axios from 'axios';
import {useState, React, useEffect} from 'react';
import { Navigate, Outlet } from 'react-router-dom';


export const BACK_END = 'http://localhost:4000'

function PrivateRoute() {
  return getLoginUser() ? <Outlet /> : <Navigate to='/login' />;
}

function LoginRoute() {
  return !getLoginUser() ? <Outlet /> : <Navigate to='/' />;
}

function App() {
  const [loginInfo, setLogin] = useState(getLoginUser());
  const [allPokemons, setAllPokemons] = useState([]);

  const switchLoginState = () => { setLogin(getLoginUser()) }

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
          <Route path='/login' element={<LoginRoute />}>
            <Route path='/login' element={<Login onChangeLogin={switchLoginState} />} />
          </Route>
          <Route path='/signup' element={<Signup />} />
          <Route path="/" element={<PokemonSearch allPokemons={allPokemons}/>} />
          <Route path="/gallery" element={<Gallery allPokemons={allPokemons}/>} />
          <Route path="/my_pokemon" element={<MyPokemon allPokemons={allPokemons}/>} />
          <Route path="/random" element={<RandomPokemon allPokemons={allPokemons}/>} />
          {allPokemons.map((pokemon) => (
            <Route path={`/details/${pokemon.id}`} element={<Detail name={`${pokemon.name}`} id={`${pokemon.id}`}
            height={`${pokemon.height}`} weight={`${pokemon.weight}`} ability={pokemon.abilities} type={pokemon.types}/>}> 
            </Route>
          ))}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
