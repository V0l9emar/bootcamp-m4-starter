import React, { Component } from 'react';
import './SearchBox.css';
import {connect} from 'react-redux';
import {fetchMovies} from '../redux/actions'
// import store from '../redux/store';


// const url = 'http://www.omdbapi.com/';
// const apiKey = '46b8214f';
class SearchBox extends Component {
    state = {
        searchLine: ''
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        console.log(this.props);
        this.props.addMovies(this.state.searchLine)
    }


    render() {
        const { searchLine } = this.state;

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                        onClick={this.searchBoxSubmitHandler}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    addMovies: (searchLine) => dispatch(fetchMovies(searchLine))
})

export default connect(null, mapDispatchToProps)(SearchBox);


