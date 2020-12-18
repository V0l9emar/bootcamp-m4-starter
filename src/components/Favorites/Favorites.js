import React, { Component } from 'react';
import {removeMovieFromCart} from '../redux/actions';
// import {connect} from 'react-redux';
import './Favorites.css';
import store from '../redux/store'


class Favorites extends Component {
    state = {
        title: '',
        movies: [],
        isInput: true,
        isLink: false,
        newFavoriteLink: '',
        apiInfo: ''
    }
    componentDidMount(){
        store.subscribe(() => {
          const state = store.getState();
          this.setState({
            movies: [...state.cart]
          })
        })
    }

    removeMovieHandler(imdbID){
        store.dispatch(removeMovieFromCart(imdbID))
    };

    favoritListTitleHandler = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    postFavoriteMovie = () => {
        fetch('https://acb-api.algoritmika.org/api/movies/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'title': this.state.title ,
                'movies': this.state.movies.map(elm => elm.imdbID),
                // 'year': this.state.movies.map(elm => elm.Year)
            })

        }).then(res => res.json()).then(data => {
            console.log(data)
            console.log(data.id)
            this.setState({
                newFavoriteLink: data.id
            })
        })
    }

    favoriteSaveHandler = () => {
        // this.setState=({
        //     isInput: false,
        //     isLink: true
        // })
        this.postFavoriteMovie();
        // console.log(this.state.isLink)
    }
    render() {
        // const {imdbID} = this.props;
        // console.log(imdbID)
        // console.log(this.state.isInput)
        return (
            <div className="favorites">
                <input placeholder="Новый список" className="favorites__name"
                onChange={this.favoritListTitleHandler}
                // disabled={this.state.isInput ? null : 'disabled'}
                />
                { this.state.movies.length ?
                    <ul className="favorites__list">
                        {this.state.movies.map((item) => {
                            return <li key={item.id} className="favorites__list-movie"><span>{item.Title} ({item.Year})</span><button className="favorites__list-movieButton" onClick={() => this.removeMovieHandler(item.imdbID)}>x</button></li>;
                        })}
                    </ul>
                    :
                    <p className="cart__note">No movies in the cart</p>
                }
                <section className="favorites__buttons">
                    <button type="button"
                        // disabled={!'disabled' ? 'disabled' : null}
                        className={`favorites__save ${this.state.isLink ? 'favorites__save-none' : null}`}
                        onClick={() => {
                            this.postFavoriteMovie()
                        }}
                    >Сохранить список</button>
                    <a
                        href={`http://localhost:3000/list/${this.state.newFavoriteLink}`}
                        target='_blank'
                        rel="noopener noreferrer"
                        // disabled={'disabled'}
                        // className={`favorites__save-none ${this.state.isLink ? 'block-link' : null}`}
                    >Поделиться</a>
                </section>

            </div>
        );
    }
}

export default Favorites;