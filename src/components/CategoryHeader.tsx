import React from 'react'
import { Text } from 'react-native'

import styles from './styles'

const CategoryHeader = (props: any) => {
  return <Text style={styles.text}>{props.title}</Text>
}

export default CategoryHeader
