import React from 'react'
import { FlatList, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import SubMovieCard from '../../../components/SubMoviesCard'
import CategoryHeader from '../../../components/CategoryHeader'
import { baseImagePath } from '../../../api/apicall'
import { Movie } from './NowPlayingMovies'

import styles from '../styles'

const { width } = Dimensions.get('window')

interface PopularMoviesProps {
  popularMoviesList: Movie[]
  upcomingMoviesList: Movie[]
}

const PopularMovies = ({ popularMoviesList, upcomingMoviesList }: PopularMoviesProps) => {
  const { push } = useNavigation()
  /**
   * Renders a SubMovieCard component for each movie in the popular movies list.
   * This function is used by the FlatList's renderItem prop to display each movie.
   * @param {{ item: Movie; index: number }} param - Contains the movie item and its index in the list.
   * @returns {JSX.Element} A SubMovieCard component with appropriate styling and navigation functionality.
   */
  const renderItem = ({ item, index }: { item: Movie; index: number }) => (
    <SubMovieCard
      shoudlMarginatedAtEnd={true}
      cardFunction={() => {
        push('MovieDetails', { movieid: item.id })
      }}
      cardWidth={width / 3}
      isFirst={index == 0 ? true : false}
      isLast={index == upcomingMoviesList?.length - 1 ? true : false}
      title={item.original_title}
      imagePath={baseImagePath('w342', item.poster_path)}
    />
  )

  return (
    <>
      <CategoryHeader title={'Popular'} />
      <FlatList
        data={popularMoviesList}
        keyExtractor={(item: any) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={renderItem}
      />
    </>
  )
}

export default PopularMovies
