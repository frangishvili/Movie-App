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
   * The card includes movie details and navigation to the movie details screen.
   * @param {Object} param - The parameter object.
   * @param {Movie} param.item - The movie item to be rendered.
   * @param {number} param.index - The index of the movie item in the list.
   * @returns {JSX.Element} The rendered movie card component.
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
