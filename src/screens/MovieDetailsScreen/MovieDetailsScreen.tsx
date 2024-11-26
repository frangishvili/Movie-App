import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, StatusBar, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'

import { baseImagePath } from '../../api/apicall'
import useMovieDetails from '../../hooks/useMovieDetails'
import CategoryHeader from '../../components/CategoryHeader'
import CastCard from '../../components/CastCard'
import MovieDetailsHeader from './components/MovieDetailsHeader'
import MovieDetailsInfo from './components/MovieDetailsInfo'
import MovieRate from './components/MovieRate'
import Loader from '../../components/Loader'

import styles from './styles'

const MovieDetailsScreen = ({ navigation, route }: any) => {
  const [movieData, setMovieData] = useState<any>(undefined)
  const [movieCastData, setMovieCastData] = useState<any>(undefined)

  const { getMovieDetails, getMovieCastDetails } = useMovieDetails()

  // The useEffect hook below is executed after the component mounts. It retrieves
  // the movie's details and cast information using the movie ID from the route params.

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
    return <Loader />
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
