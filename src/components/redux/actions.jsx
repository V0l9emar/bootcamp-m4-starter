export function addMovieToCart(imdbID){
  return{
    type: 'ADD_MOVIE_TO_CART',
    payload: {
      imdbID: imdbID
    }
  }
}

export function addMoviesToList(search){
  return{
    type: 'ADD_MOVIES_TO_LIST',
    payload: {
      search: search
    }
  }
}
// export function addMoviesToPagination(count){
//   return{
//     type: 'ADD_MOVIES_TO_LIST',
//     payload: {
//       count: count
//     }
//   }
// }

export function removeMovieFromCart(imdbID){
  return{
    type: 'REMOVE_MOVIE_FROM_CART',
    payload: {
      imdbID: imdbID
    }
  }
}


export function fetchMovies(search){
  const url = 'http://www.omdbapi.com/';
  const apiKey = '46b8214f';

  return function(dispatch){
    fetch(`${url}?s=${search}&page=1&apikey=${apiKey}`).then(response => response.json()).then(data => {
      dispatch(addMoviesToList(data.Search))
      console.log(data.totalResults)
      // dispatch(addMoviesToPagination(data.totalResults))
    })
  }
}