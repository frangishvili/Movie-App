import React from 'react'
import { Text, View, ScrollView, StatusBar, ImageBackground, TouchableOpacity, FlatList } from 'react-native'
import { COLORS, SPACING } from '../../theme/theme'
import LinearGradient from 'react-native-linear-gradient'
import AppHeader from '../../components/AppHeader'
import CustomIcon from '../../components/CustomIcon'
import useBookingServices from '../../hooks/useBookingServices'

import styles from './styles'

const SeatBookingScreen = ({ navigation, route }: any) => {
  // Destructuring the values returned from the useBookingServices hook
  const {
    dateArray,
    timeArray,
    twoDSeatArray,
    selectedDateIndex,
    setSelectedDateIndex,
    selectedTimeIndex,
    setSelectedTimeIndex,
    price,
    selectSeat,
    BookSeats,
  } = useBookingServices(route, navigation)

  return (
    <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <View>
        <ImageBackground source={{ uri: route.params?.BgImage }} style={styles.ImageBG}>
          <LinearGradient colors={[COLORS.BlackRGB10, COLORS.Black]} style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader name="close" header={''} action={() => navigation.goBack()} />
            </View>
          </LinearGradient>
        </ImageBackground>
        <Text style={styles.screenText}>Screen this side</Text>
      </View>

      <View style={styles.seatContainer}>
        <View style={styles.containerGap20}>
          {twoDSeatArray?.map((item, index) => {
            return (
              <View key={index} style={styles.seatRow}>
                {item?.map((subitem, subindex) => {
                  return (
                    <TouchableOpacity
                      key={subitem.number}
                      onPress={() => {
                        selectSeat(index, subindex, subitem.number)
                      }}
                    >
                      <CustomIcon
                        name="seat"
                        style={[
                          styles.seatIcon,
                          subitem.taken ? { color: COLORS.Grey } : {},
                          subitem.selected ? { color: COLORS.Orange } : {},
                        ]}
                      />
                    </TouchableOpacity>
                  )
                })}
              </View>
            )
          })}
        </View>
        <View style={styles.seatRadioContainer}>
          <View style={styles.radioContainer}>
            <CustomIcon name="radio" style={styles.radioIcon} />
            <Text style={styles.radioText}>Available</Text>
          </View>
          <View style={styles.radioContainer}>
            <CustomIcon name="radio" style={[styles.radioIcon, { color: COLORS.Grey }]} />
            <Text style={styles.radioText}>Taken</Text>
          </View>
          <View style={styles.radioContainer}>
            <CustomIcon name="radio" style={[styles.radioIcon, { color: COLORS.Orange }]} />
            <Text style={styles.radioText}>Selected</Text>
          </View>
        </View>
      </View>

      <View>
        <FlatList
          data={dateArray}
          keyExtractor={(item) => item.date}
          horizontal
          bounces={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => setSelectedDateIndex(index)}>
                <View
                  style={[
                    styles.dateContainer,
                    index == 0
                      ? { marginLeft: SPACING.space_24 }
                      : index == dateArray.length - 1
                      ? { marginRight: SPACING.space_24 }
                      : {},
                    index == selectedDateIndex ? { backgroundColor: COLORS.Orange } : {},
                  ]}
                >
                  <Text style={styles.dateText}>{item.date}</Text>
                  <Text style={styles.dayText}>{item.day}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>

      <View style={styles.OutterContainer}>
        <FlatList
          data={timeArray}
          keyExtractor={(item) => item}
          horizontal
          bounces={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => setSelectedTimeIndex(index)}>
                <View
                  style={[
                    styles.timeContainer,
                    index == 0
                      ? { marginLeft: SPACING.space_24 }
                      : index == dateArray.length - 1
                      ? { marginRight: SPACING.space_24 }
                      : {},
                    index == selectedTimeIndex ? { backgroundColor: COLORS.Orange } : {},
                  ]}
                >
                  <Text style={styles.timeText}>{item}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>

      <View style={styles.buttonPriceContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalPriceText}>Total Price</Text>
          <Text style={styles.price}>$ {price}.00</Text>
        </View>
        <TouchableOpacity style={styles.buttonBG} onPress={BookSeats}>
          <Text style={styles.buttonText}>Buy Tickets</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default SeatBookingScreen
