import { upcomingMovies, nowPlayingMovies, popularMovies } from '../api/apicall'

/**
 * Custom hook to fetch lists of movies.
 * @returns {{
 *   getNowPlayingMoviesList: Function,
 *   getUpcomingMoviesList: Function,
 *   getPopularMoviesList: Function
 * }} Object containing functions to fetch lists of movies.
 */

const useMoviesList = () => {
  /**
   * Fetches the list of now playing movies.
   * @returns {Promise<Object>} Promise that resolves to an object containing the list of now playing movies.
   */

  const getNowPlayingMoviesList = async () => {
    try {
      let response = await fetch(nowPlayingMovies)
      let json = await response.json()
      return json
    } catch (error) {
      console.error('Something went wrong in getNowPlayingMoviesList Function', error)
    }
  }

  /**
   * Fetches the list of upcoming movies.
   * @returns {Promise<any>} Promise that resolves to the list of upcoming movies.
   * @throws {Error} Will log an error message if the fetch operation fails.
   */

  const getUpcomingMoviesList = async () => {
    try {
      let response = await fetch(upcomingMovies)
      let json = await response.json()
      return json
    } catch (error) {
      console.error('Something went wrong in getUpcomingMoviesList Function', error)
    }
  }

  /**
   * Fetches the list of popular movies.
   * @returns {Promise<any>} Promise that resolves to the list of popular movies.
   * @throws {Error} Will log an error message if the fetch operation fails.
   */
  const getPopularMoviesList = async () => {
    try {
      let response = await fetch(popularMovies)
      let json = await response.json()
      return json
    } catch (error) {
      console.error('Something went wrong in getPopularMoviesList Function', error)
    }
  }

  return {
    getNowPlayingMoviesList,
    getUpcomingMoviesList,
    getPopularMoviesList,
  }
}

export default useMoviesList
