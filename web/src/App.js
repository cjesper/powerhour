import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Spotify from 'spotify-web-api-js';
import axios from 'axios';
import querystring from 'querystring';

class App extends Component {
    
    constructor(props) {
        super(props)
        var spotify = new Spotify();
        this.state = {
            spotify : spotify,
            songlist : []
        }
        var query = querystring.stringify(
            "client_id" : "73ee957330b546918fbbd9939409d68a",
            "response_type" : "token",
            "redirect_uri" : "http://localhost:3000"
        );
            this.auth(); 
        }

        auth = () => {
       const hash = window.location.hash
        .substring(1)
        .split('&')
        .reduce(function (initial, item) {
          if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }
          return initial;
        }, {});
        window.location.hash = '';

        // Set token
        let _token = hash.access_token;

        const authEndpoint = 'https://accounts.spotify.com/authorize';

        // Replace with your app's client ID, redirect URI and desired scopes
        const clientId = "73ee957330b546918fbbd9939409d68a";
        const redirectUri = 'http://localhost:3000/';
        const scopes = [
            'user-read-birthdate',
            'user-read-email',
            'user-read-private',
            "user-read-playback-state",
            "user-modify-playback-state",
            "user-read-currently-playing",
            "streaming"
        ];

        // If there is no token, redirect to Spotify authorization
        if (!_token) {
          window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;
        } 
        console.log(_token);
        this.state.spotify.setAccessToken(_token);
    }

    componentDidMount() {
        var self = this;
        self.state.spotify.getUserPlaylists()
            .then(function (data) {
                console.log(data);
            })
        self.state.spotify.getMyCurrentPlayingTrack()
            .then(function (data) {
                console.log(data);
            })
        self.state.spotify.getMyDevices()
            .then(function (data) {
                console.log(data);
            })

    }
  render() {
    return (
      <div className="App">
        <h1>Hi</h1>
      </div>
    );
  }
}

export default App;
