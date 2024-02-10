import { upcomingMovies, nowPlayingMovies, popularMovies } from '../../api/apicall'

const useMoviesList = () => {
  const getNowPlayingMoviesList = async () => {
    try {
      let response = await fetch(nowPlayingMovies)
      let json = await response.json()
      return json
    } catch (error) {
      console.error(' Something went wrong in getNowPlayingMoviesList Function', error)
    }
  }

  const getUpcomingMoviesList = async () => {
    try {
      let response = await fetch(upcomingMovies)
      let json = await response.json()
      return json
    } catch (error) {
      console.error(' Something went wrong in getUpcomingMoviesList Function', error)
    }
  }

  const getPopularMoviesList = async () => {
    try {
      let response = await fetch(popularMovies)
      let json = await response.json()
      return json
    } catch (error) {
      console.error(' Something went wrong in getPopularMoviesList Function', error)
    }
  }

  return {
    getNowPlayingMoviesList,
    getUpcomingMoviesList,
    getPopularMoviesList,
  }
}

export default useMoviesList
