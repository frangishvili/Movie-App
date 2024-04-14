import React, { useState } from 'react'
import { View, Dimensions, StatusBar, FlatList } from 'react-native'
import { SPACING } from '../../theme/theme'
import { baseImagePath, searchMovies } from '../../api/apicall'
import InputHeader from '../../components/InputHeader'
import SubMovieCard from '../../components/SubMoviesCard'

const { width, height } = Dimensions.get('screen')

import styles from './styles'

const SearchScreen = ({ navigation }: any) => {
  const [searchList, setSearchList] = useState([])

  /**
   * This function is used to search for movies based on the provided name.
   * It makes an asynchronous API call using the fetch function with the searchMovies function (which presumably constructs the correct API endpoint).
   * The response from the API call is then converted to JSON.
   * The results from the JSON response are then set to the searchList state variable.
   * If any error occurs during this process, it is caught and logged to the console.
   */
  const searchMoviesFunction = async (name: string) => {
    try {
      let response = await fetch(searchMovies(name))
      let json = await response.json()
      setSearchList(json.results)
    } catch (error) {
      console.error('Something went wrong in searchMoviesFunction ', error)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View>
        <FlatList
          data={searchList}
          keyExtractor={(item: any) => item.id}
          bounces={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.InputHeaderContainer}>
              <InputHeader searchFunction={searchMoviesFunction} />
            </View>
          }
          contentContainerStyle={styles.centerContainer}
          renderItem={({ item, index }) => (
            <SubMovieCard
              shoudlMarginatedAtEnd={false}
              shouldMarginatedAround={true}
              cardFunction={() => {
                navigation.push('MovieDetails', { movieid: item.id })
              }}
              cardWidth={width / 2 - SPACING.space_12 * 2}
              title={item.original_title}
              imagePath={baseImagePath('w342', item.poster_path)}
            />
          )}
        />
      </View>
    </View>
  )
}

export default SearchScreen
