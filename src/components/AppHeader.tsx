import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import CustomIcon from './CustomIcon'

import styles from './styles'

const AppHeader = (props: any) => {
  return (
    <View style={styles.appContainer}>
      <TouchableOpacity style={styles.iconBG} onPress={() => props.action()}>
        <CustomIcon name={props.name} style={styles.iconStyle} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{props.header}</Text>
      <View style={styles.emptyContainer}></View>
    </View>
  )
}

export default AppHeader
