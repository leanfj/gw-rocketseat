import React, { Component } from 'react';

import twitterLogo from '../twitter.svg';

import './Login.css';

class Login extends Component {
  state = {
    userName: ''
  };

  inputNameHandle = event => {
    this.setState({
      userName: event.target.value
    });
  };
  submitHandle = event => {
    event.preventDefault();
    const { userName } = this.state;

    if (!userName.length) return;

    localStorage.setItem('@Apptwitter:username', userName);

    this.props.history.push('/timeline');
  };
  render() {
    return (
      <div className="login-wrapper">
        <img src={twitterLogo} alt="Logo aplicação go week" />
        <form onSubmit={this.submitHandle}>
          <input
            value={this.state.userName}
            onChange={this.inputNameHandle}
            type="text"
            placeholder="Nome de Usuário"
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
