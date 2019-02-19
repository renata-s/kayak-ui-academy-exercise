import React from 'react';
import styles from './Autocomplete.css';
import MovieRow from './Movie';
import logo from './logo.png';
import video from './video-player.png';

export default class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      movies: []
    }
  }

  handleChange = e => {
    const query = e.target.value
    this.setState({ query, })
    if (query && query.length > 3) {
      this.performSearch(query).then(data => {
        let results = data.results;

        var movieRows = []
        const maxResult = 8;
        var i = 0;
        results.forEach((movie) => {
          i++;
          if (i <= maxResult) {
            movie.poster_src = "" + movie.poster_path
            const movieRow = <MovieRow key={movie.id} movie={movie} />
            movieRows.push(movieRow)
          }
        })

        this.setState({ query, movies: movieRows })
      });
    }
  }

  performSearch = (searchTerm) => {
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=cab2afe8b43cf5386e374c47aeef4fca&language=en-US&page=1&include_adult=false&query=" + searchTerm

    return fetch(urlString)
      .then(res => res.json())
  }

  render() {
    return (
      <div className={styles.container}>

        <div className={styles.header}>
        
            <img className={styles.player} src={video} />
        
          <input placeholder="Enter a movie name"
            onChange={this.handleChange} value={this.state.query} />
          <img className={styles.glass} src={logo} />
        </div>
        <ul>
          {this.state.movies}
        </ul>
      </div>
    );
  }
}