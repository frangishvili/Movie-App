import { useState } from 'react'
import EncryptedStorage from 'react-native-encrypted-storage'
import { ToastAndroid } from 'react-native'

const useBookingServices = (route: any, navigation: any) => {
  const timeArray: string[] = ['10:30', '12:30', '14:30', '15:00', '19:30', '21:00']

  const generateDate = () => {
    const date = new Date()
    let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let weekdays = []
    for (let i = 0; i < 7; i++) {
      let tempDate = {
        date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
        day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
      }
      weekdays.push(tempDate)
    }
    return weekdays
  }

  const generateSeats = () => {
    let numRow = 8
    let numColumn = 3
    let rowArray = []
    let start = 1
    let reachNine = false

    for (let i = 0; i < numRow; i++) {
      let columnArray = []
      for (let j = 0; j < numColumn; j++) {
        let seatObject = {
          number: start,
          taken: Boolean(Math.round(Math.random())),
          selected: false,
        }
        columnArray.push(seatObject)
        start++
      }
      if (i === 3) {
        numColumn += 2
      }
      if (numColumn < 9 && !reachNine) {
        numColumn += 2
      } else {
        reachNine = true
        numColumn -= 2
      }
      rowArray.push(columnArray)
    }
    return rowArray
  }

  const [dateArray, setDateArray] = useState<any[]>(generateDate())
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>()
  const [price, setPrice] = useState<number>(0)
  const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats())
  const [selectedSeatArray, setSelectedSeatArray] = useState([])
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>()

  const selectSeat = (index: number, subindex: number, num: number) => {
    if (!twoDSeatArray[index][subindex].taken) {
      let array: any = [...selectedSeatArray]
      let temp = [...twoDSeatArray]
      temp[index][subindex].selected = !temp[index][subindex].selected
      if (!array.includes(num)) {
        array.push(num)
        setSelectedSeatArray(array)
      } else {
        const tempindex = array.indexOf(num)
        if (tempindex > -1) {
          array.splice(tempindex, 1)
          setSelectedSeatArray(array)
        }
      }
      setPrice(array.length * 5.0)
      setTwoDSeatArray(temp)
    }
  }

  const BookSeats = async () => {
    if (
      selectedSeatArray.length !== 0 &&
      timeArray[selectedTimeIndex] !== undefined &&
      dateArray[selectedDateIndex] !== undefined
    ) {
      try {
        await EncryptedStorage.setItem(
          'ticket',
          JSON.stringify({
            seatArray: selectedSeatArray,
            time: timeArray[selectedTimeIndex],
            date: dateArray[selectedDateIndex],
            ticketImage: route.params.PosterImage,
          }),
        )
      } catch (error) {
        console.error('Something went Wrong while storing in BookSeats Functions', error)
      }
      navigation.navigate('Ticket', {
        seatArray: selectedSeatArray,
        time: timeArray[selectedTimeIndex],
        date: dateArray[selectedDateIndex],
        ticketImage: route.params.PosterImage,
      })
    } else {
      ToastAndroid.showWithGravity('Please Select Seats, Date and Time of the Show', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    }
  }

  return {
    dateArray,
    timeArray,
    twoDSeatArray,
    selectedSeatArray,
    selectedDateIndex,
    setSelectedDateIndex,
    selectedTimeIndex,
    setSelectedTimeIndex,
    price,
    selectSeat,
    BookSeats,
  }
}

export default useBookingServices
