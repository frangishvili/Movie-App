import { movieCastDetails, movieDetails } from '../../api/apicall'

const useMovieDetails = () => {
  const getMovieDetails = async (movieId: number) => {
    try {
      let response = await fetch(movieDetails(movieId))
      let json = await response.json()
      return json
    } catch (error) {
      console.error('Something Went wrong in getMoviesDetails Function', error)
    }
  }

  const getMovieCastDetails = async (movieId: number) => {
    try {
      let response = await fetch(movieCastDetails(movieId))
      let json = await response.json()
      return json
    } catch (error) {
      console.error('Something Went wrong in getMovieCastDetails Function', error)
    }
  }

  return { getMovieDetails, getMovieCastDetails }
}

export default useMovieDetails
