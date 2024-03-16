import { useState } from 'react'
import { Alert } from 'react-native'
import EncryptedStorage from 'react-native-encrypted-storage'

const useBookingServices = (route: any, navigation: any) => {
  const timeArray: string[] = ['10:30', '12:30', '14:30', '15:00', '19:30', '21:00']

  /**
   * Generates an array of the next seven days, starting from the current date.
   * Each day is represented as an object with two properties: 'date' and 'day'.
   * 'date' is the day of the month (1-31) and 'day' is the day of the week ('Sun'-'Sat').
   * @returns {Array} An array of objects representing the next seven days.
   */

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

  /**
   * Generates a two-dimensional array representing the seating arrangement.
   * Each seat is represented as an object with properties: 'number', 'taken', and 'selected'.
   * 'number' is the seat number, 'taken' indicates if the seat is already taken, and 'selected' indicates if the seat is selected by the user.
   * The seating arrangement starts with 3 seats per row, increases to 5 seats per row after the 4th row, and then decreases back to 3 seats per row after reaching 9 seats per row.
   * @returns {Array} A two-dimensional array representing the seating arrangement.
   */

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

  /**
   * Selects or deselects a seat in the seating arrangement.
   * If the seat is not taken, it toggles the 'selected' status of the seat.
   * If the seat number is not in the selectedSeatArray, it adds the seat number to the array.
   * If the seat number is already in the selectedSeatArray, it removes the seat number from the array.
   * It also updates the price based on the number of selected seats (each seat costs 5.0).
   * Finally, it updates the twoDSeatArray to reflect the new seating arrangement.
   * @param {number} index - The index of the row in the seating arrangement.
   * @param {number} subindex - The index of the seat in the row.
   * @param {number} num - The number of the seat.
   */

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

  /**
   * Books the selected seats for a show at a specific date and time.
   * If the selected seats, date, and time are valid, it stores the booking information in encrypted storage and navigates to the 'Ticket' screen with the booking details.
   * If the selected seats, date, or time are not valid, it shows an alert message asking the user to select seats, date, and time of the show.
   * @throws Will throw an error if the booking information cannot be stored in encrypted storage.
   */

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
      Alert.alert('Message', 'Please Select Seats, Date and Time of the Show')
    }
  }

  return {
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
  }
}

export default useBookingServices
