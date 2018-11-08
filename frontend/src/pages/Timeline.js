import React, { Component } from 'react';

import api from '../services/api';

import socket from 'socket.io-client';

import twitterLogo from '../twitter.svg';
import './Timeline.css';
import Tweet from '../components/Tweet';

class Timeline extends Component {
  state = {
    tweets: [],
    newTweet: ''
  };
  async componentDidMount() {
    this.subscribeEvents();
    const response = await api.get('tweets');

    this.setState({
      tweets: response.data
    });
  }

  subscribeEvents = async () => {
    const io = socket('http://localhost:3001');

    io.on('tweet', data => {
      this.setState({ tweets: [data, ...this.state.tweets] });
    });

    io.on('like', data => {
      this.setState({
        tweets: this.state.tweets.map(tweet => {
          return tweet._id === data._id ? data : tweet;
        })
      });
    });
  };
  textAreaHandle = event => {
    this.setState({
      newTweet: event.target.value
    });
  };

  newTweetHandle = async event => {
    if (event.keyCode !== 13) return;

    const content = this.state.newTweet;
    const author = localStorage.getItem('@Apptwitter:username');

    await api.post('tweets', { author, content });

    this.setState({ newTweet: '' });
  };

  render() {
    return (
      <div className="timeline-wrapper">
        <img height={24} src={twitterLogo} alt="Logo Aplicação" />
        <form>
          <textarea
            value={this.state.newTweet}
            onChange={this.textAreaHandle}
            onKeyDown={this.newTweetHandle}
          />
        </form>
        <ul className="tweet-list">
          {this.state.tweets.map(tweet => {
            return <Tweet contentTweet={tweet} key={tweet._id} />;
          })}
        </ul>
      </div>
    );
  }
}

export default Timeline;
