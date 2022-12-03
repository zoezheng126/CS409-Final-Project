import './Search.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";
import { useState, React } from 'react';
import PropTypes from 'prop-types';
import { getLoginUser, logout } from './Login'

function PokemonSearch({ allPokemons }) {
  const [pokemonFiltered, setpokemonFiltered] = useState([]);
  const [sortOrder, setSortOrder] = useState("ascending");
  const [sortBy, setsortBy] = useState("id");
  const [isLogin, setLogin] = useState(getLoginUser() !== undefined)
  const userLogout = () => { logout(); setLogin(false); }

  const handleInputChange = (event) => {
    const value = event.target.value;
    setpokemonFiltered({
      pokemonFiltered:
        allPokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(value.toLowerCase()))
    });
  };

  const handleSortChange = (event) => {
    setSortOrder({ sortOrder: event.target.value });
    if (sortBy["sortBy"] === "id") {
      if (event.target.value === "ascending") {
        setpokemonFiltered({
          pokemonFiltered:
            pokemonFiltered["pokemonFiltered"].sort((a, b) => a.id - b.id)
        });
      } else {
        setpokemonFiltered({
          pokemonFiltered:
            pokemonFiltered["pokemonFiltered"].sort((a, b) => b.id - a.id)
        });
      }
    } else {
      if (event.target.value === "ascending") {
        setpokemonFiltered({
          pokemonFiltered:
            pokemonFiltered["pokemonFiltered"].sort((a, b) => (a.name < b.name ? -1 : 1))
        });
      } else {
        setpokemonFiltered({
          pokemonFiltered:
            pokemonFiltered["pokemonFiltered"].sort((a, b) => (a.name < b.name ? 1 : -1))
        });
      }
    }
  }

  const handleSortByChange = (event) => {
    setsortBy({ sortBy: event.target.value });
    if (sortOrder["sortOrder"] === "ascending") {
      if (event.target.value === "id") {
        setpokemonFiltered({
          pokemonFiltered:
            pokemonFiltered["pokemonFiltered"].sort((a, b) => a.id - b.id)
        });
      } else {
        setpokemonFiltered({
          pokemonFiltered:
            pokemonFiltered["pokemonFiltered"].sort((a, b) => (a.name < b.name ? -1 : 1))
        });
      }
    } else {
      if (event.target.value === "id") {
        setpokemonFiltered({
          pokemonFiltered:
            pokemonFiltered["pokemonFiltered"].sort((a, b) => b.id - a.id)
        });
      } else {
        setpokemonFiltered({
          pokemonFiltered:
            pokemonFiltered["pokemonFiltered"].sort((a, b) => (a.name < b.name ? 1 : -1))
        });
      }
    }
  }

  return (
    <div>
      <div className="header">
        <img src={require('../pokeapi.png')} alt="loading" />
        <div className="login">
          {isLogin ?
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {getLoginUser()['uname']}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={userLogout}>Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> : <Link to="/login" >
              <div className="navbar_text">
                <Button variant="success">Login</Button>
              </div>
            </Link>}
        </div>
      </div>

      <div className="navbar">
        <div className="navbar_item1">
          <Link to="/">
            <div className="navbar_text">
              Search
            </div>
          </Link>
        </div>

        <div className="navbar_item2">
          <Link to="/gallery">
            <div className="navbar_text">
              Gallery
            </div>
          </Link>
        </div>

        <div className="navbar_item3">
          <Link to="/my_pokemon">
            <div className="navbar_text">
              My Pokemon
            </div>
          </Link>
        </div>

        <div className="navbar_item4">
          <Link to="/random">
            <div className="navbar_text">
              Random Pokemon
            </div>
          </Link>
        </div>
      </div>

      <input type="text" className="searchForm" onChange={handleInputChange} placeholder="Enter Pokemon Name..." />

      <div className="sortForm">
        <input type="radio" id="ascending" name="sortOrder" value="ascending" onChange={handleSortChange} />
        <label htmlFor="ascending"> ascending </label>
        <input type="radio" id="descending" name="sortOrder" value="descending" onChange={handleSortChange} />
        <label htmlFor="descending"> descending </label>

        <br />

        sort by

        <select onChange={handleSortByChange}>
          <option value="name">name</option>
          <option value="id">id</option>
        </select>
      </div>

      <div className="searchContent">
        {pokemonFiltered.length !== 0 ? (
          (pokemonFiltered["pokemonFiltered"]).map((pokemon) => (
            <Link to={`/details/${pokemon.id}`}>
              <div key={pokemon.id} className="searchElement">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt="loading" />
                <div className="searchFont"> {pokemon.name} </div>
              </div>
            </Link>
          ))
        ) : (
          <div> </div>
        )}
      </div>

    </div>
  );
}

PokemonSearch.propTypes = {
  allPokemons: PropTypes.array
}

export default PokemonSearch;