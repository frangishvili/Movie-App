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
   * Renders a single movie card for the popular movies list.
   * This function is passed to the FlatList's renderItem prop.
   * It constructs a SubMovieCard component with the movie's details
   * @param {{ item: Movie; index: number }} param - The movie item and its index in the list.
   * @returns {JSX.Element} The SubMovieCard component for the given movie.
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
