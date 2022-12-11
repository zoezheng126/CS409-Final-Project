import './RandomPokemon.css';
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button'
import { getLoginUser, logout } from './Login'
import { useState, React } from 'react';
import PropTypes from 'prop-types';
import { BACK_END } from '../App'

var generated_pokemon = '';
var generated_name = '';
function RandomPokemon({ allPokemons }) {
    const [id, setId] = useState('');
    const [isLogin, setLogin] = useState(getLoginUser() !== undefined)
    const userLogout = () => { logout(); setLogin(false); }
    const handleFilterChange = async (event) => {
        const userinfo = getLoginUser();
        const uid = userinfo['uid'];
        if (!uid) {
            console.warn("navigate to login page");
            window.open("/login")
            return;
        }
        if (event.target.value === "random") {
            
            var res = await fetch(BACK_END+`/api/PokemonGenerator/${uid}`)
            var jsonres = await res.json();
            generated_pokemon = jsonres['data'];
            console.log(generated_pokemon);
            await fetch(BACK_END+`/api/pokemons/${generated_pokemon}`,{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }})
            .then(res=>res.json())
            .then(response => {
                setId(response['data']['pokemon_id']);
                generated_name = response['data']['identifier']
                console.log(id);
            })
        } else if (event.target.value === "add_pokemon") { 
            console.log(generated_pokemon)
            var pokemon_to_add = { "pokemonToAdd" : [generated_pokemon]}; 
            await fetch(BACK_END + `/api/addOwnedPokemons/${uid}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pokemon_to_add),
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
                <button value="random" onClick={handleFilterChange}> Generate Random Pokemon </button>
                <button value="add_pokemon" onClick={handleFilterChange}> Add To My Pokemon </button>
            </div>

            <div className="randomContent">
                {generated_pokemon !== ''?(
                    <Link to={`/details/${id}`}>
                    <div key={id} className="randomElement">
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt="loading" />
                        <div className="galleryFont"> {generated_name} </div>
                    </div>
                    </Link>
                ):(
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
