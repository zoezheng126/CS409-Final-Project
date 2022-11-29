import './RandomPokemon.css';
import {Link} from "react-router-dom";
import {useState, React} from 'react';
import PropTypes from 'prop-types';

function RandomPokemon({allPokemons}) {
    const [pokemonFiltered, setpokemonFiltered] = useState([]);

    const handleFilterChange = (event) => {
        setpokemonFiltered({pokemonFiltered : allPokemons.sort((a, b) => a.id - b.id)});

        if (event.target.value === "random") {
            const randint = Math.floor((Math.random() * 1154) + 1);
            setpokemonFiltered({pokemonFiltered :
                allPokemons.slice(randint,randint + 1)});
        } 
        // @TODO: Add To My Pokemon function
    }

    return (
        <div>
            <div className="header">
                <img src={require('../pokeapi.png')} alt="loading"/>

                <div className="login">
                    <Link to="/login">
                        <div className="navbar_text">
                            Login
                        </div>
                    </Link>
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
                <button type="button" value="" onClick={handleFilterChange}> Add To My Pokemon </button>
            </div>

            <div className="randomContent">
                {pokemonFiltered.length !== 0 ? (
                    (pokemonFiltered["pokemonFiltered"]).map((pokemon) => (
                        <Link to = {`/details/${pokemon.id}`}>
                            <div key={pokemon.id} className="randomElement">
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt="loading"/>
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