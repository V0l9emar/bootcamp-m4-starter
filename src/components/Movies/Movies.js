import React, { Component } from 'react';
import { Pagination } from 'antd';
import MovieItem from '../MovieItem/MovieItem';
import {connect} from 'react-redux';
import './Movies.css';

class Movies extends Component {
    defaultState = {
        currentPage: 1,
        perPage: 10,
        totalCount:''
    }
    state = {
        currentPage: ''
    }
    handlePaginationChange = (page) => {
        console.log(this.props)
        this.setState({
            current: page
        })
    }
    onShowSizeChange(current, pageSize) {
        console.log(current, pageSize);
    }
    render() {
        // console.log(this.props)
        return (
            <div>
                {/* <Pagination current={this.state.current} total={40} onChange={this.handlePaginationChange} /> */}
                <ul className="movies">
                    {this.props.movies.map((movie) => (
                        <li className="movies__item" key={movie.imdbID}>
                            <MovieItem {...movie} disabled={this.props.cart.find(el => el.imdbID === movie.imdbID)} />
                        </li>
                    ))}
                </ul>
                <Pagination
                    // showSizeChanger
                    onShowSizeChange={this.onShowSizeChange}
                    defaultCurrent={this.state.current}
                    total={500}
                    onChange={this.handlePaginationChange}
                    disabled
                    />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies,
        cart: state.cart
    }
}

export default connect(mapStateToProps)(Movies);