import './Detail.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button'
import { getLoginUser, logout } from './Login'
import { Link } from "react-router-dom";
import { useState, React } from 'react';
import PropTypes from 'prop-types';


function Detail({ name, id, height, weight, ability, type }) {
    const [isLogin, setLogin] = useState(getLoginUser() !== undefined)
    const userLogout = () => { logout(); setLogin(false); }

    return (
        <div id="parent">
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

            <div className="detailContent">
                <div className="item1">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt="loading" />
                </div>

                <div className="item2">
                    <div> {"name: " + name} </div>
                    <div> {"id: " + id} </div>
                    <div> {"weight: " + weight} </div>
                    <div> {"height: " + height} </div>
                    <div> {"ability: "}
                        {ability.map((ab) => (
                            <div> {ab.ability.name} </div>
                        ))}
                    </div>
                    <div> {"type: "}
                        {type.map((tp) => (
                            <div> {tp.type.name} </div>
                        ))}
                    </div>
                </div>

                <div>
                    {
                        (() => {
                            if (id === "1")
                                return (
                                    <Link to="/details/10249">
                                        <img src={require('../left_arrow.png')} alt="loading" className="left_arrow" />
                                    </Link>)
                            if (id === "10001")
                                return (
                                    <Link to="/details/905">
                                        <img src={require('../left_arrow.png')} alt="loading" className="left_arrow" />
                                    </Link>)
                            else
                                return (
                                    <Link to={`/details/${parseInt(id) - 1}`}>
                                        <img src={require('../left_arrow.png')} alt="loading" className="left_arrow" />
                                    </Link>)
                        })()
                    }
                </div>

                <div>
                    {
                        (() => {
                            if (id === "905")
                                return (
                                    <Link to="/details/10001">
                                        <img src={require('../right_arrow.png')} alt="loading" className="right_arrow" />
                                    </Link>)
                            if (id === "10249")
                                return (
                                    <Link to="/details/1">
                                        <img src={require('../right_arrow.png')} alt="loading" className="right_arrow" />
                                    </Link>)
                            else
                                return (
                                    <Link to={`/details/${parseInt(id) + 1}`}>
                                        <img src={require('../right_arrow.png')} alt="loading" className="right_arrow" />
                                    </Link>)
                        })()
                    }
                </div>

            </div>
        </div>
    )
}

Detail.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    height: PropTypes.string,
    weight: PropTypes.string,
    ability: PropTypes.array,
    type: PropTypes.array
}

export default Detail;