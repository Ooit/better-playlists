import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
    color: '#fff'
};

let fakeServerData = {
    user: {
        name: 'Rob',
        playlists: [
            {
                name: 'My Favourites',
                songs: [
                    {name: 'Funky Duck', duration: 4521},
                    {name: 'Dean Town', duration: 7652},
                    {name: 'Animal Spirits', duration: 5432}
                ]
            },
            {
                name: 'Vulfpeck',
                songs: [
                    {name: 'Welcome To Vulf Records', duration: 6282},
                    {name: 'Concious Club', duration: 5231},
                    {name: '1612', duration: 7163}
                ]
            },
            {
                name: 'More Vulf',
                songs: [
                    {name: 'Vulf Pack', duration: 7627},
                    {name: 'Tea Time', duration: 7181},
                    {name: 'Captain Hook', duration: 1437}
                ]
            },
            {
                name: 'Also Vulf',
                songs: [
                    {name: 'Di Maggio', duration: 5241},
                    {name: 'Sky Mall', duration: 3151},
                    {name: 'The Bird Watcher', duration: 6412}
                ]
            }
        ]
    }
};

class PlaylistCounter extends Component {
    render() {
        return (
            <div style={{ ...defaultStyle, width: '40%', display: 'inline-block' }}>
                <h2>{this.props.playlists.length} Playlists</h2>
            </div>
        );
    }
}

class HoursCounter extends Component {
    render() {
        let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
            return songs.concat(eachPlaylist.songs);
        }, []);
        let totalDuration = allSongs.reduce((sum, eachSong) => {
            return sum + eachSong.duration;
        }, 0);
        return (
            <div style={{ ...defaultStyle, width: '40%', display: 'inline-block' }}>
                <h2>{Math.floor(totalDuration / 60)} Hours</h2>
            </div>
        );
    }
}

class Filter extends Component {
    render() {
        return (
            <div style={{ defaultStyle }}>
                <img />
                <input type='text' onKeyUp={event => {
                    this.props.onTextChange(event.target.value)
                }}/>
            </div>
        );
    }
}

class Playlist extends Component {
    render() {
        let playlist = this.props.playlist;
        return (
            <div style={{ ...defaultStyle, width: '25%', display: 'inline-block' }}>
                <img />
                <h3>{playlist.name}</h3>
                <ul>
                    {playlist.songs.map(song =>
                        <li>{song.name}</li>
                    )}
                </ul>
            </div>
        );
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            serverData: {},
            filterString: ''
     }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ serverData: fakeServerData });
        }, 1000);
        setTimeout(() => {
            this.setState({filterString: ''})
        }, 2000)
    }
    render() {
        let playlistToRender = this.state.serverData.user ? this.state.serverData.user.playlists.filter(playlist =>
            playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
        ) : []
        return (
            <div className="App">
                {this.state.serverData.user ?
                    <div>
                        <h1 style={{ ...defaultStyle, 'font-size': '54px' }}>
                            {this.state.serverData.user.name}'s Playlists
                        </h1>
                        <PlaylistCounter playlists={playlistToRender} />
                        <HoursCounter playlists={playlistToRender} />
                        <Filter onTextChange={text => this.setState({filterString: text})}/>
                        {playlistToRender.map(playlist =>
                            <Playlist playlist={playlist}/>
                        )}
                    </div> : <h1 style={defaultStyle}>Loading...</h1>
                }
            </div>
        );
    }
}

export default App;
