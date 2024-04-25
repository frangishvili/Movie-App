import React from 'react'
import { View, Text } from 'react-native'
import CustomIcon from '../../../components/CustomIcon'

import styles from '../styles'

interface MovieRateProps {
  movieData: any
}

const MovieRate = ({ movieData }: MovieRateProps) => {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.rateContainer}>
        <CustomIcon name="star" style={styles.starIcon} />
        <Text style={styles.runtimeText}>
          {movieData?.vote_average.toFixed(1)} ({movieData?.vote_count})
        </Text>
        <Text style={styles.runtimeText}>
          {movieData?.release_date.substring(8, 10)}{' '}
          {new Date(movieData?.release_date).toLocaleString('default', {
            month: 'long',
          })}{' '}
          {movieData?.release_date.substring(0, 4)}
        </Text>
      </View>
      <Text style={styles.descriptionText}>{movieData?.overview}</Text>
    </View>
  )
}

export default MovieRate
