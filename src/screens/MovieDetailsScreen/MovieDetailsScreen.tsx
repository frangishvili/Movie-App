import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, ActivityIndicator, StatusBar, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'

import { baseImagePath } from '../../api/apicall'
import { COLORS } from '../../theme/theme'
import useMovieDetails from '../../hooks/useMovieDetails'
import AppHeader from '../../components/AppHeader'
import CategoryHeader from '../../components/CategoryHeader'
import CastCard from '../../components/CastCard'
import MovieDetailsHeader from './components/MovieDetailsHeader'
import MovieDetailsInfo from './components/MovieDetailsInfo'
import MovieRate from './components/MovieRate'

import styles from './styles'

const MovieDetailsScreen = ({ navigation, route }: any) => {
  const [movieData, setMovieData] = useState<any>(undefined)
  const [movieCastData, setMovieCastData] = useState<any>(undefined)

  const { getMovieDetails, getMovieCastDetails } = useMovieDetails()

  // This useEffect hook is used to fetch movie details and cast details when the component mounts.
  // It defines an async function fetchMovieData that fetches the movie details and cast details using the movie id from the route params.
  // The fetched movie data is then set to the movieData state and the cast data to the movieCastData state.
  // The fetchMovieData function is then called immediately after its definition.
  // The empty dependency array [] ensures that this useEffect hook only runs once, when the component mounts.
  useEffect(() => {
    const fetchMovieData = async () => {
      const movieData = await getMovieDetails(route.params.movieid)
      const movieCastData = await getMovieCastDetails(route.params.movieid)
      setMovieData(movieData)
      setMovieCastData(movieCastData.cast)
    }

    fetchMovieData()
  }, [])

  if (!movieData || !movieCastData) {
    return (
      <SafeAreaView style={styles.mainContent}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollViewContainer}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.appHeaderContainer}>
            <AppHeader name="close" header={''} action={() => navigation.goBack()} />
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
      <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
        <StatusBar hidden />
        <MovieDetailsHeader movieData={movieData} />
        <MovieDetailsInfo movieData={movieData} />
        <MovieRate movieData={movieData} />

        <View>
          <CategoryHeader title="Top Cast" />
          <FlatList
            data={movieCastData}
            keyExtractor={(item: any) => item.id}
            horizontal
            contentContainerStyle={styles.containerGap24}
            renderItem={({ item, index }) => (
              <CastCard
                shouldMarginatedAtEnd={true}
                cardWidth={80}
                isFirst={index == 0 ? true : false}
                isLast={index == movieCastData?.length - 1 ? true : false}
                imagePath={baseImagePath('w185', item.profile_path)}
                title={item.original_name}
                subtitle={item.character}
              />
            )}
          />

          <View>
            <TouchableOpacity
              style={styles.buttonBG}
              onPress={() => {
                navigation.push('SeatBooking', {
                  BgImage: baseImagePath('w780', movieData.backdrop_path),
                  PosterImage: baseImagePath('original', movieData.poster_path),
                })
              }}
            >
              <Text style={styles.buttonText}>Select Seats</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default MovieDetailsScreen
