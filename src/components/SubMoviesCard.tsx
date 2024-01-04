import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { SPACING } from '../theme/theme'

import styles from './styles'

const SubMovieCard = (props: any) => {
  return (
    <TouchableOpacity onPress={() => props.cardFunction()}>
      <View
        style={[
          styles.container,
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
        <Image style={[styles.cardImage, { width: props.cardWidth }]} source={{ uri: props.imagePath }} />
        <Text numberOfLines={1} style={styles.textTitle}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default SubMovieCard
