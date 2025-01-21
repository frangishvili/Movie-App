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
   * Renders a SubMovieCard component for each movie in the upcoming movies list.
   * @param {Object} param - The parameter object containing item and index.
   * @param {Movie} param.item - The movie object to be displayed.
   * @returns {JSX.Element} A SubMovieCard component with the movie's details.
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
