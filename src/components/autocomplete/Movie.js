import React from 'react';

class MovieRow extends React.Component {
    render() {
        return <li key={this.props.movie.id}>
                    {this.props.movie.title}&nbsp;<br/>
                    {this.props.movie.vote_average} Raiting, &nbsp; 
                    {this.props.movie.release_date.substring(0,4)}
               </li>
               
    }
}

export default MovieRow