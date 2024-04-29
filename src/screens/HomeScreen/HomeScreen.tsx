import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator, StatusBar, ScrollView, SafeAreaView } from 'react-native'

import InputHeader from '../../components/InputHeader'
import NowPlayingMovies from './components/NowPlayingMovies'
import PopularMovies from './components/PopularMovies'
import UpcomingMovies from './components/UpcomingMovies'
import useMoviesList from '../../hooks/useMovieList'

import { COLORS } from '../../theme/theme'

import styles from './styles'

const HomeScreen = ({ navigation }: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<any>(undefined)
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined)
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined)

  // Destructuring the methods from the useMoviesList hook.
  const { getNowPlayingMoviesList, getUpcomingMoviesList, getPopularMoviesList } = useMoviesList()

  // This useEffect hook is used to fetch the movie lists when the component mounts.
  // It uses an immediately invoked async function to handle the asynchronous operations.
  // The getNowPlayingMoviesList, getPopularMoviesList, and getUpcomingMoviesList methods are called to fetch the respective movie lists.
  // The results are then set to the corresponding state variables.
  // Note: For the nowPlayingMoviesList, two dummy items are added at the beginning and end of the list.
  useEffect(() => {
    ;(async () => {
      let tempNowPlaying = await getNowPlayingMoviesList()
      setNowPlayingMoviesList([{ id: 'dummy1' }, ...tempNowPlaying.results, { id: 'dummy2' }])

      let tempPopular = await getPopularMoviesList()
      setPopularMoviesList(tempPopular.results)

      let tempUpcoming = await getUpcomingMoviesList()
      setUpcomingMoviesList(tempUpcoming.results)
    })()
  }, [])

  // This function is used to navigate to the 'Search' screen when called.
  const searchMoviesFunction = () => {
    navigation.navigate('Search')
  }

  if (!nowPlayingMoviesList || !popularMoviesList || !upcomingMoviesList) {
    return (
      <SafeAreaView style={styles.mainContent}>
        <ScrollView style={styles.container} bounces={false} contentContainerStyle={styles.scrollViewContainer}>
          <StatusBar hidden />
          <View style={styles.InputHeaderContainer}>
            <InputHeader />
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} color={COLORS.Orange} />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.mainContent}>
      <ScrollView style={styles.container} bounces={false}>
        <StatusBar hidden />
        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction} />
        </View>
        <NowPlayingMovies nowPlayingMoviesList={nowPlayingMoviesList} upcomingMoviesList={upcomingMoviesList} />
        <PopularMovies popularMoviesList={popularMoviesList} upcomingMoviesList={upcomingMoviesList} />
        <UpcomingMovies upcomingMoviesList={upcomingMoviesList} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
