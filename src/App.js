import _ from 'lodash';
import React, { Component } from 'react';
import './style/style.css';

import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

import API from './api.json';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('guitar');
  }

  videoSearch(term) {
    YTSearch({ key: API.API_KEY, term: term }, (videos) => {
      // if key is same as variable name this assignment works
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    // can only call this function every 300 ms
    const search = _.debounce((term) => { this.videoSearch(term), 2000 });

    return (
      <div>
        <SearchBar onSearchTermChange={search} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList onVideoSelect={selectedVideo => this.setState({ selectedVideo })} videos={this.state.videos} />
      </div>
    );
  }
}

export default App;
