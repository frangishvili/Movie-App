import React from 'react'
import { SafeAreaView, ScrollView, StatusBar, View, ActivityIndicator } from 'react-native'
import InputHeader from './InputHeader'
import { COLORS } from '../theme/theme'

import styles from './styles'

const Loader = () => {
  return (
    <SafeAreaView style={styles.mainContent}>
      <ScrollView style={styles.container} bounces={false} contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />
        <View style={styles.InputHeaderContainer}>
          <InputHeader />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.Orange} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Loader
