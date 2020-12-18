const initialState = {
  movies: [],
  cart: []
}

function reducer(state = initialState, action){
  if(action.type === 'ADD_MOVIE_TO_CART'){
    const movie = state.movies.find(item => item.imdbID === action.payload.imdbID);
    const cart = [...state.cart, {...movie}];

    return{
      ...state,
      cart,
    }
  }else if(action.type === 'ADD_MOVIES_TO_LIST'){
    const searchedMovies = action.payload.search
    return{
      ...state,
      movies: searchedMovies
    }
  }else if(action.type === 'REMOVE_MOVIE_FROM_CART'){
    const removedImdbID = action.payload.imdbID
    const cart = state.cart.filter((item) => item.imdbID !== removedImdbID)
    return{
      ...state,
      cart
    }
  }
  return state
}

export default reducer;