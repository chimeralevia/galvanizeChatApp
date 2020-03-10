import React, { Component } from "react";
import LoginForm from "./LoginForm";
import ChatBox from "../chatBox/ChatBox";
import "./LoginHandler.css";

export default class LoginHandler extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      username: ""
    };
  }

  componentDidMount(){
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    let username = localStorage.getItem("username");
    if (username !== undefined && username !== "") {
      this.logIn(username);
    }
  };

  logIn = username => {
    this.setState({
      isLoggedIn: true,
      username: username
    });
    localStorage.setItem("username",username)
  };

  logout = () => {
    this.setState({
      isLoggedIn: false,
      username: ""
    });
    localStorage.clear();
  }

  render() {
    const { isLoggedIn,username } = this.state;

    if (isLoggedIn) {
      return (<>
              <button id="logout-button" onClick={this.logout}>Logout</button>
              <ChatBox user={username}/>
              </>);
    } else {
      return <LoginForm handler={this.logIn}/>;
    }
  }
}
