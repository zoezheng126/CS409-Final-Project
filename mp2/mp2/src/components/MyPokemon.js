import './MyPokemon.css';
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button'
import { getLoginUser, logout, login } from './Login'
import { useState, React } from 'react';
import PropTypes from 'prop-types';
import { BACK_END } from '../App'

function MyPokemon({ allPokemons }) {
    const [pokemonFiltered, setpokemonFiltered] = useState([]);
    const [isLogin, setLogin] = useState(getLoginUser() !== undefined)
    const userLogout = () => { logout(); setLogin(false); }

    const handleFilterChange = (event) => {
        // setpokemonFiltered({ pokemonFiltered: allPokemons.sort((a, b) => a.id - b.id) });
        if (event.target.value === "showAll") {
            // not sure how to get login so i will use user id for now
            // var user_db_id = '638d6c8c12e0010c61205c6a';
            const userinfo = getLoginUser()
            if (!userinfo) {
                console.warn("navigate to login page");
                window.open("/login")
                return;
            }
            const uid = userinfo['uid'];

            var pokemon_data;
            fetch(BACK_END + `/api/pokemons`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json()).then(json => {
                pokemon_data = json['data'];
                
                fetch(BACK_END + `/api/pokemons/getOwnedPokemons/${uid}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(res1 => res1.json()).then(json1 => {
                    let to_splice = []
                    let pokemon_to_show = json1['data'];

                    for (let i = 0; i < pokemon_to_show.length; i++) {
                        for (let j = 0; j < pokemon_data.length; j++) {
                            if (pokemon_data[j]["_id"] == pokemon_to_show[i]) {
                                to_splice.push(pokemon_data[j]["pokemon_id"]);
                            }
                        }
                    }

                    function filterPokemon(num) {
                        return to_splice.includes(num.id.toString());
                    }

                    setpokemonFiltered({
                        pokemonFiltered:
                        allPokemons.filter(filterPokemon)
                    });
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

            <div className="galleryNavBar">
                <button type="button" value="showAll" onClick={handleFilterChange}> show all </button>
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
