import React, { Component } from 'react';
import like from '../like.svg';
import './Tweet.css';
import api from '../services/api';
class Tweet extends Component {
  likeHandle = async () => {
    const { _id } = this.props.contentTweet;

    await api.post(`likes/${_id}`);
  };

  render() {
    const { contentTweet } = this.props;

    return (
      <li className="tweet">
        <strong>{contentTweet.author}</strong>
        <p>{contentTweet.content}</p>
        <button type="button" onClick={this.likeHandle}>
          <img src={like} alt="Like Button" />
          {contentTweet.likes}
        </button>
      </li>
    );
  }
}

export default Tweet;
