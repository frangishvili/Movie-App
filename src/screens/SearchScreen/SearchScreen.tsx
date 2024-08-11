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
   * Performs a movie search based on the provided name.
   * Initiates an asynchronous API call using the `fetch` function.
   * Constructs the API endpoint using the `searchMovies` function.
   * Converts the API response into JSON format.
   * Stores the results from the JSON response in the `searchList` state variable.
   * Logs any errors that occur during the process to the console.
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
