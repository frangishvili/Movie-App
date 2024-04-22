import React from 'react'
import { ImageBackground, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'

import AppHeader from '../../../components/AppHeader'
import { COLORS } from '../../..//theme/theme'
import { baseImagePath } from '../../../api/apicall'

import styles from '../styles'

interface MovieDetailsHeaderProps {
  movieData: any
}

const MovieDetailsHeader = ({ movieData }: MovieDetailsHeaderProps) => {
  const { goBack } = useNavigation()

  return (
    <View>
      <ImageBackground
        source={{
          uri: baseImagePath('w780', movieData?.backdrop_path),
        }}
        style={styles.imageBG}
      >
        <LinearGradient colors={[COLORS.BlackRGB10, COLORS.Black]} style={styles.linearGradient}>
          <View style={styles.appHeaderContainer}>
            <AppHeader name="close" header={''} action={() => goBack()} />
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.imageBG}></View>
      <Image source={{ uri: baseImagePath('w342', movieData?.poster_path) }} style={styles.cardImage} />
    </View>
  )
}

export default MovieDetailsHeader
