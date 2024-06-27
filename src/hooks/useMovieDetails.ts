import { movieCastDetails, movieDetails } from '../api/apicall'

/**
 * Custom hook to fetch details of a movie and its cast details.
 * @returns {{
 *   getMovieDetails: (movieId: number) => Promise<any>,
 *   getMovieCastDetails: (movieId: number) => Promise<any>
 * }} Object containing functions to fetch movie details and cast details.
 */

const useMovieDetails = () => {
  /**
   * Fetches details of a movie by its ID.
   * @param {number} movieId - The ID of the movie to fetch details for.
   * @returns {Promise<any>} A promise that resolves to the details of the movie.
   */
  const getMovieDetails = async (movieId: number) => {
    try {
      let response = await fetch(movieDetails(movieId))
      let json = await response.json()
      return json
    } catch (error) {
      console.error('Something Went wrong in getMoviesDetails Function', error)
    }
  }

  /**
   * Fetches cast details of a movie by its ID.
   * @param {number} movieId - The ID of the movie to fetch cast details for.
   * @returns {Promise<any>} A promise that resolves to the cast details of the movie.
   */

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
