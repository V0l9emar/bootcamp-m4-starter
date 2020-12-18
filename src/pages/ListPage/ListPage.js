import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import './ListPage.css';


class ListPage extends Component {
    state = {
        title: 'Мой список',
        movies: [
            // { title: 'The Godfather', year: 1972, imdbID: 'tt0068646' }
        ],
    }
    componentDidMount() {
        const url = 'http://www.omdbapi.com/';
        const apiKey = '46b8214f';
        const id = this.props.match.params.id;
        console.log(id);
        // TODO: запрос к сервер на получение списка
        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                console.log(data.movies)
                this.setState({
                    title: data.title,
                })
                data.movies.forEach(elm => {
                    fetch(`${url}?i=${elm}&apikey=${apiKey}`)
                    .then(res => res.json())
                    .then(data => {
                        this.setState({
                            movies:[...this.state.movies, data]
                        })
                    })
                })
            })

        // TODO: запросы к серверу по всем imdbID
    }
    render() {
        // const { Title, Year, Poster, imdbID , disabled} = this.props;
        return (
            <div>
                <Header />
                <div className="list-page">
                    <h1 className="list-page__title">{this.state.title}</h1>
                    <ul>
                        {this.state.movies.map((item) => {
                            return (
                                <li key={item.imdbID} >
                                    <div>
                                        <img className="list__page-img" src={item.Poster} alt={item.Title} />
                                    </div>
                                    <div className="list__page-info">
                                        <a href={"https://www.imdb.com/title/" + item.imdbID} target="_blank" rel="noopener noreferrer"><h2>{item.Title} ({item.Year})</h2></a>
                                        <h6>{item.Type}</h6>
                                    </div>

                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

        );
    }
}

export default ListPage;