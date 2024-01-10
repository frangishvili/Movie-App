import React from 'react'
import { Text, View, Image } from 'react-native'
import { SPACING } from '../theme/theme'

import styles from './styles'

const CastCard = (props: any) => {
  return (
    <View
      style={[
        styles.castCardContainer,
        props.shouldMarginatedAtEnd
          ? props.isFirst
            ? { marginLeft: SPACING.space_24 }
            : props.isLast
            ? { marginRight: SPACING.space_24 }
            : {}
          : {},
        { maxWidth: props.cardWidth },
      ]}
    >
      <Image source={{ uri: props.imagePath }} style={[styles.castCardImage, { width: props.cardWidth }]} />
      <Text style={styles.title} numberOfLines={1}>
        {props.title}
      </Text>
      <Text style={styles.subtitle} numberOfLines={1}>
        {props.subtitle}
      </Text>
    </View>
  )
}

export default CastCard
