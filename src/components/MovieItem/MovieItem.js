import React, { Component } from 'react';
import './MovieItem.css';
import {addMovieToCart} from '../redux/actions';
import {connect} from 'react-redux';
import store from '../redux/store';

class MovieItem extends Component {
    addToMovieHandler(imdbID){
        store.dispatch(addMovieToCart(imdbID));
    }
    render() {
        const { Title, Year, Poster, imdbID , disabled} = this.props;
        // console.log('disabled:', disabled)
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button" className="movie-item__add-button" onClick={() => this.addToMovieHandler(imdbID)}disabled={disabled}>Добавить в список</button>
                </div>
            </article>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    addMovieToCart: (imdbID) => dispatch(addMovieToCart(imdbID))
})

export default connect(null,mapDispatchToProps)(MovieItem);