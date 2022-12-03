import './Login.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import cookie from 'react-cookies';
import { Link } from "react-router-dom";
import { BACK_END } from '../App'
import * as React from 'react';


export const getLoginUser = () => { return cookie.load('userInfo'); };

export const login = (uname) => { cookie.save('userInfo', { uname }, { path: '/', maxAge: 3600 }); };

export const logout = () => { console.log("Logout"); cookie.remove('userInfo'); };

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: false, uname: "", password: "" };
  }

  handleUserSubmit = (event) => {
    const uname = document.getElementById("uname").value;
    const pwd = document.getElementById("pwd").value;
    fetch(BACK_END + `/api/users?where={"name":"${uname}"}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json()).then(json => {
      let data = json['data'];
      if (data.length == 0) {
        console.warn("No such user! Please Sign up first");
        alert("No such user! Please Sign up first");
      } else {
        for (let i = 0; i < data.length; i++) {
          if (data[i]['password'] == pwd) {
            this.setState({ login: true, uname: uname });
            login(uname);
            this.props.onChangeLogin();
            console.log("Login Successfully");
            return;
          }
        }
        alert("Wrong Password! Please Enter again");
      }
    }).catch(err => {
      console.log(err);
    })
    event.preventDefault();
  };

  render() {
    return (
      <Container fluid>
        <Row><br /></Row>
        <Row><br /></Row>
        <Row><br /></Row>
        <Row><br /></Row>
        <Row><br /></Row>
        <Row>
          <Col></Col>
          <Col>
            <div className="bg-light border" style={{ textAlign: "center", minWidth: "280px" }}>
              <br />
              Username: &nbsp;
              <input type="text" name="uname" id="uname" />
              <br /><br />
            </div>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <div className="border" style={{ textAlign: "center", minWidth: "280px" }}>
              <br />
              Password: &nbsp;
              <input type="password" name="pwd" id="pwd" />
              <br /><br />
            </div>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <div className="bg-light border" style={{ textAlign: "center", minWidth: "280px" }}>
              <br />
              <Button type='submit' onClick={this.handleUserSubmit} variant="success">&nbsp;&nbsp;Login&nbsp;&nbsp;</Button>
              <br /><br />
            </div>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <div className="bg-light border" style={{ textAlign: "center", minWidth: "280px" }}>
              <br />
              <Link to='/signup'>
                <Button type='submit' variant="success">&nbsp;&nbsp;Sign Up&nbsp;&nbsp;</Button>
              </Link>
              <br /><br />
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    )
  }
}


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: false, uname: "", password: "" };
  }

  handleSignup = (event) => {
    const uname = document.getElementById("uname").value;
    const pwd = document.getElementById("pwd").value;
    fetch(BACK_END + `/api/users`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: uname,
        password: pwd,
        ownedPokemons: []
      })
    }).then(res => res.json()).then(json => {
      let message = json['message'];
      if (message != "created") {
        alert(message);
        return;
      } else {
        alert(`User ${uname} has been created! Please Login`)
      }
    }).catch(err => {
      console.log(err);
    })
  };

  render() {
    return (
      <Container fluid>
        <Row><br /></Row>
        <Row><br /></Row>
        <Row><br /></Row>
        <Row><br /></Row>
        <Row><br /></Row>
        <Row>
          <Col></Col>
          <Col>
            <div className="bg-light border col-md-offset-3" style={{ textAlign: "center", minWidth: "280px" }}>
              <br />
              Username: &nbsp;
              <input type="text" name="uname" id="uname" />
              <br /><br />
            </div>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <div className="border" style={{ textAlign: "center", minWidth: "280px" }}>
              <br />
              Password: &nbsp;
              <input type="password" name="pwd" id="pwd" />
              <br /><br />
            </div>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <div className="bg-light border" style={{ textAlign: "center", minWidth: "280px" }}>
              <br />
              <Button type='submit' variant="success" onClick={this.handleSignup}>&nbsp;&nbsp;Sign Up&nbsp;&nbsp;</Button>
              <br /><br />
            </div>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <div className="bg-light border" style={{ textAlign: "center", minWidth: "280px" }}>
              <br />
              <Link to='/login'>
                <Button type='submit' variant="success">&nbsp;&nbsp;Login&nbsp;&nbsp;</Button>
              </Link>
              <br /><br />
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    )
  }
}

export { Login, Signup };
