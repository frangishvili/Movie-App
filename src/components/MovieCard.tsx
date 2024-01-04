import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { SPACING } from '../theme/theme'
import CustomIcon from './CustomIcon'

import styles from './styles'

const genres: any = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentry',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystry',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
}

const MovieCard = (props: any) => {
  return (
    <TouchableOpacity onPress={() => props.cardFunction()}>
      <View
        style={[
          styles.movieCardContainer,
          props.shoudlMarginatedAtEnd
            ? props.isFirst
              ? { marginLeft: SPACING.space_36 }
              : props.isLast
              ? { marginRight: SPACING.space_36 }
              : {}
            : {},
          props.shouldMarginatedAround ? { margin: SPACING.space_12 } : {},
          { maxWidth: props.cardWidth },
        ]}
      >
        <Image style={[styles.MovieCardImage, { width: props.cardWidth }]} source={{ uri: props.imagePath }} />

        <View>
          <View style={styles.rateContainer}>
            <CustomIcon name="star" style={styles.starIcon} />
            <Text style={styles.voteText}>
              {props.vote_average} ({props.vote_count})
            </Text>
          </View>

          <Text numberOfLines={1} style={styles.movieTextTitle}>
            {props.title}
          </Text>

          <View style={styles.genreContainer}>
            {props.genre.map((item: any) => {
              return (
                <View key={item} style={styles.genreBox}>
                  <Text style={styles.genreText}>{genres[item]}</Text>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default MovieCard
