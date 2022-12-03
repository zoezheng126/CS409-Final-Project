import './MyPokemon.css';
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button'
import { getLoginUser, logout } from './Login'
import { useState, React } from 'react';
import PropTypes from 'prop-types';

function MyPokemon({ allPokemons }) {
    const [pokemonFiltered, setpokemonFiltered] = useState([]);
    const [isLogin, setLogin] = useState(getLoginUser() !== undefined)
    const userLogout = () => { logout(); setLogin(false); }

    const handleFilterChange = (event) => {
        setpokemonFiltered({ pokemonFiltered: allPokemons.sort((a, b) => a.id - b.id) });
        if (event.target.value === "showAll") {
            setpokemonFiltered({
                pokemonFiltered:
                    allPokemons
            });
        } else if (event.target.value === "1-200") {
            setpokemonFiltered({
                pokemonFiltered:
                    allPokemons.slice(0, 200)
            });
        } else if (event.target.value === "201-400") {
            setpokemonFiltered({
                pokemonFiltered:
                    allPokemons.slice(200, 400)
            });
        } else if (event.target.value === "401-600") {
            setpokemonFiltered({
                pokemonFiltered:
                    allPokemons.slice(400, 600)
            });
        } else if (event.target.value === "601-800") {
            setpokemonFiltered({
                pokemonFiltered:
                    allPokemons.slice(600, 800)
            });
        } else if (event.target.value === "801-1000") {
            setpokemonFiltered({
                pokemonFiltered:
                    allPokemons.slice(800, 1000)
            });
        } else {
            setpokemonFiltered({
                pokemonFiltered:
                    allPokemons.slice(1000, 1154)
            });
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

            <div className="galleryNavBar">
                <button type="button" value="showAll" onClick={handleFilterChange}> show all </button>
                <button type="button" value="1-200" onClick={handleFilterChange}> 1-200 </button>
                <button type="button" value="201-400" onClick={handleFilterChange}> 201-400 </button>
                <button type="button" value="401-600" onClick={handleFilterChange}> 401-600 </button>
                <button type="button" value="601-800" onClick={handleFilterChange}> 601-800 </button>
                <button type="button" value="801-1000" onClick={handleFilterChange}> 801-1000 </button>
                <button type="button" value="1001-1154" onClick={handleFilterChange}> 1001-1154 </button>
            </div>

            <div className="searchContent">
                {pokemonFiltered.length !== 0 ? (
                    (pokemonFiltered["pokemonFiltered"]).map((pokemon) => (
                        <Link to={`/details/${pokemon.id}`}>
                            <div key={pokemon.id} className="searchElement">
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt="loading" />
                                <div className="galleryFont"> {pokemon.name} </div>
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

MyPokemon.propTypes = {
    allPokemons: PropTypes.array
}

export default MyPokemon;