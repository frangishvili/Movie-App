import React from 'react'
import { View, Text } from 'react-native'

import CustomIcon from '../../../components/CustomIcon'

import styles from '../styles'

interface MovieDetailsInfoProps {
  movieData: any
}

const MovieDetailsInfo = ({ movieData }: MovieDetailsInfoProps) => {
  return (
    <>
      <View style={styles.timeContainer}>
        <CustomIcon name="clock" style={styles.clockIcon} />
        <Text style={styles.runtimeText}>
          {Math.floor(movieData?.runtime / 60)}h {Math.floor(movieData?.runtime % 60)}m
        </Text>
      </View>

      <View>
        <Text style={styles.title}>{movieData?.original_title}</Text>
        <View style={styles.genreContainer}>
          {movieData?.genres.map((item: any) => {
            return (
              <View style={styles.genreBox} key={item.id}>
                <Text style={styles.genreText}>{item.name}</Text>
              </View>
            )
          })}
        </View>
        <Text style={styles.tagline}>{movieData?.tagline}</Text>
      </View>
    </>
  )
}

export default MovieDetailsInfo
