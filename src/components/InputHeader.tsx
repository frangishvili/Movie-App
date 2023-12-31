import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { COLORS, FONTSIZE } from '../theme/theme'
import CustomIcon from './CustomIcon'

import styles from './styles'

const InputHeader = (props: any) => {
  const [searchText, setSearchText] = useState<string>('')
  return (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.textInput}
        onChangeText={(textInput) => setSearchText(textInput)}
        value={searchText}
        placeholder="Search your Movies..."
        placeholderTextColor={COLORS.WhiteRGBA32}
      />
      <TouchableOpacity style={styles.searchIcon} onPress={() => props.searchFunction(searchText)}>
        <CustomIcon name="search" color={COLORS.Orange} size={FONTSIZE.size_20} />
      </TouchableOpacity>
    </View>
  )
}

export default InputHeader
