import React from 'react'
import { View, FlatList, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { baseImagePath } from '../../../api/apicall'
import MovieCard from '../../../components/MovieCard'
import CategoryHeader from '../../../components/CategoryHeader'
import { SPACING } from '../../../theme/theme'

import styles from '../styles'

const { width } = Dimensions.get('window')

export interface Movie {
  id: string
  original_title: string
  poster_path: string
  genre_ids: number[]
  vote_average: number
  vote_count: number
}

interface NowPlayingMoviesProps {
  nowPlayingMoviesList: Movie[]
  upcomingMoviesList: Movie[]
}

const NowPlayingMovies = ({ nowPlayingMoviesList, upcomingMoviesList }: NowPlayingMoviesProps) => {
  const { push } = useNavigation()

  /**
   * Renders each movie item in the FlatList.
   * If the movie item lacks an original title, it returns an empty view with calculated width.
   * @param {Object} param - The parameter object containing the movie item and its index.
   * @param {Movie} param.item - The movie item to render.
   * @returns {JSX.Element} The rendered movie item or an empty view if the title is missing.
   */
  const renderItem = ({ item, index }: { item: Movie; index: number }) => {
    if (!item.original_title) {
      return (
        <View
          style={{
            width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
          }}
        ></View>
      )
    }

    return (
      <MovieCard
        shouldMarginAtEnd={true}
        cardFunction={() => {
          push('MovieDetails', { movieid: item.id })
        }}
        cardWidth={width * 0.7}
        isFirst={index == 0 ? true : false}
        isLast={index == upcomingMoviesList?.length - 1 ? true : false}
        title={item.original_title}
        imagePath={baseImagePath('w780', item.poster_path)}
        genre={item.genre_ids.slice(1, 4)}
        vote_average={item.vote_average}
        vote_count={item.vote_count}
      />
    )
  }

  return (
    <>
      <CategoryHeader title={'Now Playing'} />
      <FlatList
        data={nowPlayingMoviesList}
        keyExtractor={(item: any) => item.id}
        bounces={false}
        snapToInterval={width * 0.7 + SPACING.space_36}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        contentContainerStyle={styles.containerGap36}
        renderItem={renderItem}
      />
    </>
  )
}
export default NowPlayingMovies
