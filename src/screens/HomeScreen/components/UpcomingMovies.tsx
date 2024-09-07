import React from 'react'
import { FlatList, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import SubMovieCard from '../../../components/SubMoviesCard'
import CategoryHeader from '../../../components/CategoryHeader'
import { baseImagePath } from '../../../api/apicall'
import { Movie } from './NowPlayingMovies'

import styles from '../styles'

const { width } = Dimensions.get('window')

interface UpcomingMoviesProps {
  upcomingMoviesList: Movie[]
}

const UpcomingMovies = ({ upcomingMoviesList }: UpcomingMoviesProps) => {
  const { push } = useNavigation()

  /**
   * Renders an individual movie card within the list of upcoming movies.
   * @param {Object} param - The parameter object.
   * @param {Movie} param.item - The movie item to render.
   * @param {number} param.index - The index of the movie item in the list.
   * @returns {JSX.Element} A SubMovieCard component populated with the movie's data.
   * @param {boolean} param.isFirst - Indicates if the movie item is the first in the list.
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
      <CategoryHeader title={'Upcoming'} />
      <FlatList
        data={upcomingMoviesList}
        keyExtractor={(item: any) => item.id}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={renderItem}
      />
    </>
  )
}

export default UpcomingMovies
