import * as React from 'react'
import { Text, View, StatusBar, Image } from 'react-native'
import AppHeader from '../../components/AppHeader'
import SettingComponent from '../../components/SettingComponent'

import styles from './styles'

const UserAccountScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.appHeaderContainer}>
        <AppHeader name="close" header={'My Profile'} action={() => navigation.goBack()} />
      </View>

      <View style={styles.profileContainer}>
        <Image source={require('../../../assets/images/avatar.png')} style={styles.avatarImage} />
        <Text style={styles.avatarText}>Profile Photo</Text>
      </View>

      <View style={styles.profileContainer}>
        <SettingComponent icon="user" heading="Account" subheading="Edit Profile" subtitle="Change Password" />
        <SettingComponent icon="setting" heading="Settings" subheading="Theme" subtitle="Permissions" />
        <SettingComponent icon="dollar" heading="Offers & Refferrals" subheading="Offer" subtitle="Refferrals" />
        <SettingComponent icon="info" heading="About" subheading="About Movies" subtitle="more" />
      </View>
    </View>
  )
}

export default UserAccountScreen
