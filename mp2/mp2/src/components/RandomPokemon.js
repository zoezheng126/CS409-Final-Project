import './RandomPokemon.css';
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button'
import { getLoginUser, logout } from './Login'
import { useState, React } from 'react';
import PropTypes from 'prop-types';
import { BACK_END } from '../App'

var random_pokemon_id = 0;

function RandomPokemon({ allPokemons }) {
    const [pokemonFiltered, setpokemonFiltered] = useState([]);
    const [isLogin, setLogin] = useState(getLoginUser() !== undefined)
    const userLogout = () => { logout(); setLogin(false); }

    const handleFilterChange = (event) => {
        setpokemonFiltered({ pokemonFiltered: allPokemons.sort((a, b) => a.id - b.id) });

        const userinfo = getLoginUser();
        const uid = userinfo['uid'];
        // var user_db_id = '638d6c8c12e0010c61205c6a';
        if (!uid) {
            console.warn("navigate to login page");
            window.open("/login")
            return;
        }
        if (event.target.value === "random") {
            random_pokemon_id = Math.floor((Math.random() * 1154) + 1);
            setpokemonFiltered({
                pokemonFiltered:
                    allPokemons.slice(random_pokemon_id, random_pokemon_id + 1)
            });
        } else if (event.target.value === "add_pokemon") {   
            fetch(BACK_END + `/api/pokemons`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json()).then(json => {
                var data = json['data'];
                var pokemon_db_id = 0;

                for (let i = 0; i < data.length; i++) {
                    if (data[i]["pokemon_id"] == random_pokemon_id.toString()) {
                        pokemon_db_id = data[i]["_id"];
                        break;
                    }
                }

                pokemon_db_id = pokemon_db_id.toString();
                var pokemon_to_add = { "pokemonToAdd" : [pokemon_db_id]};
                
                fetch(BACK_END + `/api/addOwnedPokemons/${uid}`, {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(pokemon_to_add),
                }).catch(err => {
                    console.log(err);
                })
            }).catch(err => {
                console.log(err);
            })
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

            <div className="randomNavBar">
                <button type="button" value="random" onClick={handleFilterChange}> Generate Random Pokemon </button>
                <button value="add_pokemon" onClick={handleFilterChange}> Add To My Pokemon </button>
            </div>

            <div className="randomContent">
                {pokemonFiltered.length !== 0 ? (
                    (pokemonFiltered["pokemonFiltered"]).map((pokemon) => (
                        <Link to={`/details/${pokemon.id}`}>
                            <div key={pokemon.id} className="randomElement">
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

RandomPokemon.propTypes = {
    allPokemons: PropTypes.array
}

export default RandomPokemon;
