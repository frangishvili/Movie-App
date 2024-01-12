import React from 'react'
import { Text, View } from 'react-native'

import CustomIcon from './CustomIcon'

import styles from './styles'

const SettingComponent = (props: any) => {
  return (
    <View style={styles.settingWrpper}>
      <View>
        <CustomIcon name={props.icon} style={styles.settingIconStyle} />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.settingTitle}>{props.heading}</Text>
        <Text style={styles.settingSubtitle}>{props.subheading}</Text>
        <Text style={styles.settingSubtitle}>{props.subtitle}</Text>
      </View>
      <View style={styles.settingIconBG}>
        <CustomIcon name={'arrow-right'} style={styles.settingIconStyle} />
      </View>
    </View>
  )
}

export default SettingComponent
